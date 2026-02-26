const Leave = require('./leave.model');
const User = require('../users/user.model');
const PendingUser = require('../users/pendingUser.model');
const mongoose = require('mongoose');
const populateFields = async (docs, fields) => {
    if (!docs) return docs;
    const isArray = Array.isArray(docs);
    const documents = isArray ? docs : [docs];
    const fieldList = Array.isArray(fields) ? fields : [fields];
    for (const doc of documents) {
        for (const field of fieldList) {
            if (!doc[field]) continue;
            const id = doc[field]._id || doc[field];
            if (typeof doc[field] === 'object' && doc[field].name) {
                continue;
            }
            let user = await User.findById(id).lean();
            if (!user) {
                user = await PendingUser.findById(id).lean();
            }
            doc[field] = user;
        }
    }
    return isArray ? documents : documents[0];
};
const applyLeave = async (employeeId, leaveData) => {
    let user = await User.findById(employeeId);
    if (!user) {
        user = await PendingUser.findById(employeeId);
    }
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    if (user.role === 'admin') {
        const error = new Error('Admins are not allowed to apply for leave');
        error.statusCode = 403;
        throw error;
    }
    const { startDate, endDate, leaveType, reason } = leaveData;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start < new Date().setHours(0, 0, 0, 0)) {
        const error = new Error('Cannot apply for leave in the past');
        error.statusCode = 400;
        throw error;
    }
    if (end < start) {
        const error = new Error('End date cannot be before start date');
        error.statusCode = 400;
        throw error;
    }
    const diffTime = Math.abs(end - start);
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    const overlappingLeave = await Leave.findOne({
        employee: employeeId,
        status: { $in: ['pending', 'approved'] },
        $or: [
            { startDate: { $lte: end }, endDate: { $gte: start } },
        ],
    });
    if (overlappingLeave) {
        const error = new Error('You already have a pending or approved leave for these dates');
        error.statusCode = 400;
        throw error;
    }
    if (user.leaveBalance < totalDays) {
        const error = new Error(`Insufficient leave balance. Remaining: ${user.leaveBalance}, Requested: ${totalDays}`);
        error.statusCode = 400;
        throw error;
    }
    const leave = await Leave.create({
        employee: employeeId,
        leaveType,
        startDate: start,
        endDate: end,
        totalDays,
        reason,
    });
    return leave;
};
const getMyLeaves = async (employeeId) => {
    return await Leave.find({ employee: employeeId }).sort({ startDate: -1 });
};
const getPendingLeavesForApproval = async (reviewerId) => {
    let reviewer = await User.findById(reviewerId);
    if (!reviewer) reviewer = await PendingUser.findById(reviewerId);
    if (!reviewer) return [];
    let leaves = await Leave.find({ status: 'pending' }).lean();
    leaves = await populateFields(leaves, ['employee']);
    if (reviewer.role === 'admin') {
        return leaves;
    }
    if (reviewer.role === 'manager') {
        const reviewerDept = reviewer.department?.trim().toLowerCase();
        const filteredLeaves = leaves.filter(l => {
            const empDept = l.employee?.department?.trim().toLowerCase();
            const matches = l.employee && empDept === reviewerDept;
            if (!l.employee) {
                console.log(`[LeaveDebug] Leave ${l._id} has no populated employee`);
            } else if (empDept !== reviewerDept) {
                console.log(`[LeaveDebug] Dept mismatch for ${l.employee.name}: EmpDept="${empDept}", RevDept="${reviewerDept}"`);
            }
            return matches;
        });
        return filteredLeaves;
    }
    return [];
};
const updateLeaveStatus = async (leaveId, status, reviewerId, note) => {
    let leave = await Leave.findById(leaveId);
    if (!leave) {
        const error = new Error('Leave not found');
        error.statusCode = 404;
        throw error;
    }
    leave = await populateFields(leave, ['employee']);
    if (leave.status !== 'pending') {
        const error = new Error('Leave has already been processed');
        error.statusCode = 400;
        throw error;
    }
    let reviewer = await User.findById(reviewerId);
    if (!reviewer) reviewer = await PendingUser.findById(reviewerId);
    if (!reviewer) {
        const error = new Error('Reviewer not found');
        error.statusCode = 404;
        throw error;
    }
    const leaveData = await populateFields(leave.toObject(), ['employee']);
    const employee = leaveData.employee;
    if (!employee) {
        const error = new Error('Employee not found');
        error.statusCode = 404;
        throw error;
    }
    if (employee._id.toString() === reviewerId.toString()) {
        const error = new Error('You cannot approve your own leave request');
        error.statusCode = 403;
        throw error;
    }
    if (reviewer.role === 'manager') {
        const empDept = employee.department?.trim().toLowerCase();
        const revDept = reviewer.department?.trim().toLowerCase();
        if (employee.role !== 'employee' || empDept !== revDept) {
            const error = new Error('Managers can only approve department employees');
            error.statusCode = 403;
            throw error;
        }
    } else if (reviewer.role === 'admin') {
    } else {
        const error = new Error('Unauthorized role for leave approval');
        error.statusCode = 403;
        throw error;
    }
    leave.status = status;
    leave.reviewedBy = reviewerId;
    leave.reviewNote = note;
    if (status === 'approved') {
        const empId = employee._id;
        let empDoc = await User.findById(empId);
        if (!empDoc) {
            empDoc = await PendingUser.findById(empId);
        }
        if (empDoc) {
            empDoc.leaveBalance -= leave.totalDays;
            await empDoc.save();
        }
    }
    await leave.save();
    return leave;
};
const cancelLeave = async (leaveId, userId) => {
    const leave = await Leave.findById(leaveId);
    if (!leave) {
        const error = new Error('Leave not found');
        error.statusCode = 404;
        throw error;
    }
    if (leave.employee.toString() !== userId.toString()) {
        const error = new Error('Unauthorized');
        error.statusCode = 403;
        throw error;
    }
    if (leave.status !== 'pending') {
        const error = new Error('Cannot cancel a leave that is already processed');
        error.statusCode = 400;
        throw error;
    }
    leave.status = 'cancelled';
    await leave.save();
    return leave;
};
const getDepartmentLeaves = async (managerId) => {
    let manager = await User.findById(managerId);
    if (!manager) manager = await PendingUser.findById(managerId);
    if (!manager || manager.role !== 'manager') {
        const error = new Error('Unauthorized');
        error.statusCode = 403;
        throw error;
    }
    let leaves = await Leave.find().lean();
    leaves = await populateFields(leaves, ['employee']);
    const managerDept = manager.department?.trim().toLowerCase();
    return leaves
        .filter(l => l.employee && l.employee.department?.trim().toLowerCase() === managerDept)
        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
};
const getAllLeaves = async (filters = {}) => {
    let leaves = await Leave.find(filters).lean();
    leaves = await populateFields(leaves, ['employee', 'reviewedBy']);
    return leaves.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
};
module.exports = {
    applyLeave,
    getMyLeaves,
    getPendingLeavesForApproval,
    getDepartmentLeaves,
    updateLeaveStatus,
    cancelLeave,
    getAllLeaves,
};
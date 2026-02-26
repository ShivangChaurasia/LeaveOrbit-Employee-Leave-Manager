const Leave = require('./leave.model');
const User = require('../users/user.model');
const mongoose = require('mongoose');

const applyLeave = async (employeeId, leaveData) => {
    const user = await User.findById(employeeId);
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

    // 1. Cannot apply for past dates
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

    // 2. Auto-calculate totalDays
    const diffTime = Math.abs(end - start);
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    // 3. Prevent overlapping leave
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

    // 4. Prevent negative leave balance
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
    const reviewer = await User.findById(reviewerId);

    if (reviewer.role === 'admin') {
        // Admin approves leaves for Managers across all departments
        return await Leave.find({ status: 'pending' })
            .populate({
                path: 'employee',
                match: { role: 'manager' }
            })
            .lean()
            .then(leaves => leaves.filter(l => l.employee !== null));
    }

    if (reviewer.role === 'manager') {
        // Manager approves leaves for Employees in their department
        return await Leave.find({ status: 'pending' })
            .populate({
                path: 'employee',
                match: { role: 'employee', department: reviewer.department }
            })
            .lean()
            .then(leaves => leaves.filter(l => l.employee !== null));
    }

    return [];
};

const updateLeaveStatus = async (leaveId, status, reviewerId, note) => {
    const leave = await Leave.findById(leaveId).populate('employee');
    if (!leave) {
        const error = new Error('Leave not found');
        error.statusCode = 404;
        throw error;
    }

    if (leave.status !== 'pending') {
        const error = new Error('Leave has already been processed');
        error.statusCode = 400;
        throw error;
    }

    const reviewer = await User.findById(reviewerId);

    // Prevent self-approval
    if (leave.employee._id.toString() === reviewerId.toString()) {
        const error = new Error('You cannot approve your own leave request');
        error.statusCode = 403;
        throw error;
    }

    // Enforce Hierarchy
    if (reviewer.role === 'manager') {
        if (leave.employee.role !== 'employee' || leave.employee.department !== reviewer.department) {
            const error = new Error('Managers can only approve department employees');
            error.statusCode = 403;
            throw error;
        }
    } else if (reviewer.role === 'admin') {
        if (leave.employee.role !== 'manager') {
            const error = new Error('Admins specifically approve manager leaves');
            error.statusCode = 403;
            throw error;
        }
    } else {
        const error = new Error('Unauthorized role for leave approval');
        error.statusCode = 403;
        throw error;
    }

    leave.status = status;
    leave.reviewedBy = reviewerId;
    leave.reviewNote = note;

    if (status === 'approved') {
        const employee = await User.findById(leave.employee._id);
        employee.leaveBalance -= leave.totalDays;
        await employee.save();
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
    const manager = await User.findById(managerId);
    if (!manager || manager.role !== 'manager') {
        const error = new Error('Unauthorized');
        error.statusCode = 403;
        throw error;
    }

    return await Leave.find()
        .populate({
            path: 'employee',
            match: { department: manager.department }
        })
        .lean()
        .then(leaves => leaves.filter(l => l.employee !== null))
        .then(leaves => leaves.sort((a, b) => new Date(b.startDate) - new Date(a.startDate)));
};

const getAllLeaves = async (filters = {}) => {
    return await Leave.find(filters).populate('employee', 'name email department role').sort({ startDate: -1 });
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

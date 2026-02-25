const Leave = require('./leave.model');
const User = require('../users/user.model');
const mongoose = require('mongoose');

const applyLeave = async (employeeId, leaveData) => {
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
    const user = await User.findById(employeeId);
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
        auditTrail: [{ status: 'pending', changedBy: employeeId, comment: 'Leave application submitted' }],
    });

    return leave;
};

const getMyLeaves = async (employeeId) => {
    return await Leave.find({ employee: employeeId }).sort({ startDate: -1 });
};

const getPendingLeavesForApproval = async (managerId) => {
    const manager = await User.findById(managerId);
    // Managers can only approve leaves within their department
    return await Leave.find({
        status: 'pending',
        employee: { $ne: managerId } // Cannot approve own leave
    })
        .populate({
            path: 'employee',
            match: { department: manager.department }
        })
        .lean()
        .then(leaves => leaves.filter(l => l.employee !== null));
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

    // Rule: Manager must be in same department
    if (reviewer.role === 'manager' && leave.employee.department !== reviewer.department) {
        const error = new Error('You can only approve leaves within your department');
        error.statusCode = 403;
        throw error;
    }

    // Double approval protection (already handled by status !== 'pending' but extra check)
    leave.status = status;
    leave.reviewedBy = reviewerId;
    leave.reviewNote = note;
    leave.auditTrail.push({
        status,
        changedBy: reviewerId,
        comment: note,
    });

    // If approved, deduct leave balance
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
    leave.auditTrail.push({
        status: 'cancelled',
        changedBy: userId,
        comment: 'User cancelled the leave request',
    });

    await leave.save();
    return leave;
};

const getAllLeaves = async (filters = {}) => {
    return await Leave.find(filters).populate('employee', 'name email department').sort({ startDate: -1 });
};

module.exports = {
    applyLeave,
    getMyLeaves,
    getPendingLeavesForApproval,
    updateLeaveStatus,
    cancelLeave,
    getAllLeaves,
};

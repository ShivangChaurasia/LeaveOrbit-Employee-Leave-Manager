const leaveService = require('./leave.service');
const applyLeave = async (req, res, next) => {
    try {
        const leave = await leaveService.applyLeave(req.user.id, req.body);
        res.status(201).json({ status: 'success', data: { leave } });
    } catch (error) {
        next(error);
    }
};
const getMyLeaves = async (req, res, next) => {
    try {
        const leaves = await leaveService.getMyLeaves(req.user.id);
        res.status(200).json({ status: 'success', data: { leaves } });
    } catch (error) {
        next(error);
    }
};
const getPendingLeaves = async (req, res, next) => {
    try {
        const leaves = await leaveService.getPendingLeavesForApproval(req.user.id);
        res.status(200).json({ status: 'success', data: { leaves } });
    } catch (error) {
        next(error);
    }
};
const updateStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status, note } = req.body;
        const leave = await leaveService.updateLeaveStatus(id, status, req.user.id, note);
        res.status(200).json({ status: 'success', data: { leave } });
    } catch (error) {
        next(error);
    }
};
const cancelLeave = async (req, res, next) => {
    try {
        const { id } = req.params;
        const leave = await leaveService.cancelLeave(id, req.user.id);
        res.status(200).json({ status: 'success', data: { leave } });
    } catch (error) {
        next(error);
    }
};
const getDepartmentLeaves = async (req, res, next) => {
    try {
        const leaves = await leaveService.getDepartmentLeaves(req.user.id);
        res.status(200).json({ status: 'success', data: { leaves } });
    } catch (error) {
        next(error);
    }
};
const getAllLeaves = async (req, res, next) => {
    try {
        const leaves = await leaveService.getAllLeaves(req.query);
        res.status(200).json({ status: 'success', data: { leaves } });
    } catch (error) {
        next(error);
    }
};
module.exports = {
    applyLeave,
    getMyLeaves,
    getPendingLeaves,
    getDepartmentLeaves,
    updateStatus,
    cancelLeave,
    getAllLeaves,
};
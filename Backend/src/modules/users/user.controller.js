const userService = require('./user.service');

const getProfile = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.user.id);
        res.status(200).json({ status: 'success', data: { user } });
    } catch (error) {
        next(error);
    }
};

const completeOnboarding = async (req, res, next) => {
    try {
        const user = await userService.completeOnboarding(req.user.id, req.body);
        res.status(200).json({ status: 'success', data: { user } });
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers(req.query);
        res.status(200).json({ status: 'success', data: { users } });
    } catch (error) {
        next(error);
    }
};

const approveManager = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const manager = await userService.approveManager(id, status, req.user.id);
        res.status(200).json({ status: 'success', data: { manager } });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProfile,
    completeOnboarding,
    getAllUsers,
    approveManager,
};

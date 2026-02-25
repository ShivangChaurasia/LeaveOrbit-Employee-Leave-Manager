const User = require('./user.model');
const userService = require('./user.service');
const bcrypt = require('bcrypt');

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
        const manager = await userService.approveManager(id, status);
        res.status(200).json({ status: 'success', data: { manager } });
    } catch (error) {
        next(error);
    }
};

const updateProfile = async (req, res, next) => {
    try {
        const { name, department } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        if (name) user.name = name;
        if (department !== undefined) user.department = department;
        await user.save();

        res.status(200).json({ success: true, data: { user } });
    } catch (error) {
        next(error);
    }
};

const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id).select('+password');
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        if (user.provider !== 'local') {
            return res.status(400).json({ success: false, message: 'Password change not available for Google accounts.' });
        }

        if (user.password) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) return res.status(401).json({ success: false, message: 'Current password is incorrect.' });
        }

        if (!newPassword || newPassword.length < 8) {
            return res.status(400).json({ success: false, message: 'New password must be at least 8 characters.' });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ success: true, message: 'Password updated successfully.' });
    } catch (error) {
        next(error);
    }
};

const approveAccount = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const user = await userService.approveAccount(id, status);
        res.status(200).json({ status: 'success', data: { user } });
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        await userService.deleteUser(id);
        res.status(200).json({ status: 'success', message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProfile,
    completeOnboarding,
    getAllUsers,
    approveManager,
    approveAccount,
    deleteUser,
    updateProfile,
    changePassword,
};


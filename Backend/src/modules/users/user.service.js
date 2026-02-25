const User = require('./user.model');

const getAllUsers = async (filters = {}) => {
    return await User.find(filters).lean();
};

const getUserById = async (id) => {
    return await User.findById(id).lean();
};

const completeOnboarding = async (userId, data) => {
    const { name, department, role } = data;
    const user = await User.findById(userId);

    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }

    user.name = name || user.name;
    user.department = department;
    user.role = role || 'employee';
    user.onboardingCompleted = true;

    // If role is manager, set approval status to pending
    if (user.role === 'manager') {
        user.managerApprovalStatus = 'pending';
    } else {
        user.managerApprovalStatus = 'approved';
    }

    await user.save();
    return user;
};

const approveManager = async (managerId, status) => {
    const manager = await User.findById(managerId);
    if (!manager || manager.role !== 'manager') {
        const error = new Error('Manager not found');
        error.statusCode = 404;
        throw error;
    }

    manager.managerApprovalStatus = status;
    if (status === 'approved') {
        manager.isActive = true;
    } else {
        manager.isActive = false;
    }

    await manager.save();
    return manager;
};

const approveAccount = async (userId, status) => {
    const user = await User.findById(userId);
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }

    user.accountStatus = status;
    await user.save();
    return user;
};

const deleteUser = async (userId) => {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    return user;
};

const updateProfile = async (userId, updateData) => {
    return await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
};

module.exports = {
    getAllUsers,
    getUserById,
    completeOnboarding,
    approveManager,
    approveAccount,
    deleteUser,
    updateProfile,
};

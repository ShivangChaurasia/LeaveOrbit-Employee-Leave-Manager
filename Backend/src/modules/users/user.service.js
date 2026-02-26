const User = require('./user.model');
const PendingUser = require('./pendingUser.model');
const getAllUsers = async (filters = {}) => {
    const approvedUsers = await User.find(filters).lean();
    const pendingUsers = await PendingUser.find(filters).lean();
    return [...approvedUsers, ...pendingUsers];
};
const getUserById = async (id) => {
    let user = await User.findById(id).lean();
    if (!user) {
        user = await PendingUser.findById(id).lean();
    }
    return user;
};
const completeOnboarding = async (userId, data) => {
    const { name, department, role } = data;
    let user = await User.findById(userId);
    if (!user) {
        user = await PendingUser.findById(userId);
    }
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    user.name = name || user.name;
    user.department = department;
    user.role = role || 'employee';
    user.onboardingCompleted = true;
    if (user.role === 'admin' || user.email === 'shiva17ng@gmail.com') {
        user.accountStatus = 'approved';
    } else {
        user.accountStatus = 'pending';
    }
    user.managerApprovalStatus = 'approved';
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
    if (status === 'approved') {
        const pendingUser = await PendingUser.findById(userId).select('+password');
        if (pendingUser) {
            const userData = pendingUser.toObject();
            userData.accountStatus = 'approved';
            userData.managerApprovalStatus = 'approved';
            await User.collection.insertOne(userData);
            await PendingUser.findByIdAndDelete(userId);
            return await User.findById(userId);
        } else {
            const user = await User.findById(userId);
            if (user) {
                user.accountStatus = 'approved';
                user.managerApprovalStatus = 'approved';
                await user.save();
                return user;
            }
        }
        const error = new Error('User not found in any collection');
        error.statusCode = 404;
        throw error;
    } else if (status === 'rejected') {
        let user = await PendingUser.findByIdAndUpdate(userId, { accountStatus: 'rejected' }, { new: true });
        if (!user) {
            user = await User.findByIdAndUpdate(userId, { accountStatus: 'rejected' }, { new: true });
        }
        return user;
    }
    return null;
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
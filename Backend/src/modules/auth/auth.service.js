const User = require('../users/user.model');
const PendingUser = require('../users/pendingUser.model');
const authUtils = require('./auth.utils');
const firebaseAdmin = require('../../config/firebase');

const register = async (userData) => {
    const { name, email, password, role } = userData;

    const normalizedEmail = email.toLowerCase();
    const isSuperAdmin = normalizedEmail === 'shiva17ng@gmail.com';

    // Check permanent collection
    let user = await User.findOne({ email: normalizedEmail });
    if (user) {
        if (isSuperAdmin) {
            user.role = 'admin';
            user.accountStatus = 'approved';
            user.onboardingCompleted = true;
            await user.save();
            return user;
        }
        const error = new Error('User already exists and is already approved.');
        error.statusCode = 400;
        throw error;
    }

    // Check pending collection
    const pendingExists = await PendingUser.findOne({ email: normalizedEmail });
    if (pendingExists) {
        const error = new Error('Registration request is already pending approval.');
        error.statusCode = 400;
        throw error;
    }

    if (isSuperAdmin) {
        return await User.create({
            name,
            email: normalizedEmail,
            password,
            role: 'admin',
            provider: 'local',
            onboardingCompleted: true,
            accountStatus: 'approved',
            managerApprovalStatus: 'approved',
        });
    }

    return await PendingUser.create({
        name,
        email: normalizedEmail,
        password,
        role: role || 'employee',
        provider: 'local',
        onboardingCompleted: false,
        accountStatus: 'pending',
        managerApprovalStatus: 'approved',
    });
};

const login = async (email, password) => {
    const normalizedEmail = email.toLowerCase();
    let user = await User.findOne({ email: normalizedEmail }).select('+password');
    let isPending = false;

    if (!user) {
        user = await PendingUser.findOne({ email: normalizedEmail }).select('+password');
        if (user) isPending = true;
    }

    if (!user) {
        const error = new Error('Invalid credentials');
        error.statusCode = 401;
        throw error;
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        const error = new Error('Invalid credentials');
        error.statusCode = 401;
        throw error;
    }

    const accessToken = authUtils.generateToken(user);

    return { user, accessToken };
};

const firebaseAuth = async (idToken) => {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
    const { email, name } = decodedToken;
    const normalizedEmail = email.toLowerCase();
    const isSuperAdmin = normalizedEmail === 'shiva17ng@gmail.com';

    let user = await User.findOne({ email: normalizedEmail });
    let isPending = false;

    if (!user) {
        user = await PendingUser.findOne({ email: normalizedEmail });
        if (user) isPending = true;
    }

    if (!user) {
        if (isSuperAdmin) {
            user = await User.create({
                name: name || email.split('@')[0],
                email: normalizedEmail,
                provider: 'google',
                role: 'admin',
                onboardingCompleted: true,
                accountStatus: 'approved',
                managerApprovalStatus: 'approved',
            });
        } else {
            user = await PendingUser.create({
                name: name || email.split('@')[0],
                email: normalizedEmail,
                provider: 'google',
                role: 'employee',
                onboardingCompleted: false,
                accountStatus: 'pending',
                managerApprovalStatus: 'approved',
            });
            isPending = true;
        }
    } else if (isSuperAdmin) {
        user.role = 'admin';
        user.accountStatus = 'approved';
        user.onboardingCompleted = true;
        await user.save();
    }

    const accessToken = authUtils.generateToken(user);

    return { user, accessToken };
};

module.exports = {
    register,
    login,
    firebaseAuth,
};

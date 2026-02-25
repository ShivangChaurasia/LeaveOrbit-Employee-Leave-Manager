const User = require('../users/user.model');
const authUtils = require('./auth.utils');
const firebaseAdmin = require('../../config/firebase');

const register = async (userData) => {
    const { name, email, password, role } = userData;

    const userExists = await User.findOne({ email });
    if (userExists) {
        const error = new Error('User already exists');
        error.statusCode = 400;
        throw error;
    }

    const user = await User.create({
        name,
        email,
        password,
        role: role || 'employee',
        provider: 'local',
        managerApprovalStatus: role === 'manager' ? 'pending' : 'approved',
    });

    return user;
};

const login = async (email, password) => {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        const error = new Error('Invalid credentials');
        error.statusCode = 401;
        throw error;
    }

    // Check if account is locked
    if (user.lockUntil && user.lockUntil > Date.now()) {
        const error = new Error('Account is temporarily locked. Please try again later.');
        error.statusCode = 403;
        throw error;
    }

    if (!user.isActive) {
        const error = new Error('Account is deactivated');
        error.statusCode = 403;
        throw error;
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        user.failedLoginAttempts += 1;
        if (user.failedLoginAttempts >= 5) {
            user.lockUntil = Date.now() + 30 * 60 * 1000; // Lock for 30 mins
            user.failedLoginAttempts = 0;
            await user.save();
            throw new Error('Account locked due to too many failed attempts. Try again in 30 minutes.');
        }
        await user.save();
        const error = new Error('Invalid credentials');
        error.statusCode = 401;
        throw error;
    }

    // Reset failed attempts on success
    user.failedLoginAttempts = 0;
    user.lockUntil = undefined;

    const accessToken = authUtils.generateAccessToken(user);
    const refreshToken = authUtils.generateRefreshToken(user);

    user.refreshToken = refreshToken;
    user.lastLogin = new Date();
    await user.save();

    return { user, accessToken, refreshToken };
};

const firebaseAuth = async (idToken) => {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
    const { email, name, picture } = decodedToken;

    let user = await User.findOne({ email });

    if (!user) {
        user = await User.create({
            name: name || email.split('@')[0],
            email,
            provider: 'google', // Or 'firebase'
            role: 'employee',
            onboardingCompleted: false,
        });
    }

    const accessToken = authUtils.generateAccessToken(user);
    const refreshToken = authUtils.generateRefreshToken(user);

    user.refreshToken = refreshToken;
    user.lastLogin = new Date();
    await user.save();

    return { user, accessToken, refreshToken };
};

const refreshTokens = async (refreshToken) => {
    try {
        const decoded = authUtils.verifyRefreshToken(refreshToken);
        const user = await User.findById(decoded.id).select('+refreshToken');

        if (!user || user.refreshToken !== refreshToken) {
            throw new Error('Invalid refresh token');
        }

        const newAccessToken = authUtils.generateAccessToken(user);
        const newRefreshToken = authUtils.generateRefreshToken(user);

        user.refreshToken = newRefreshToken;
        await user.save();

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
        const err = new Error('Session expired. Please login again.');
        err.statusCode = 401;
        throw err;
    }
};

const sendAdminMagicLink = async (email) => {
    const user = await User.findOne({ email });
    if (!user || user.role !== 'admin') {
        const error = new Error('Unauthorized');
        error.statusCode = 403;
        throw error;
    }

    const actionCodeSettings = {
        url: `${process.env.CLIENT_URL}/verify-magic-link?email=${email}`,
        handleCodeInApp: true,
    };

    const link = await firebaseAdmin.auth().generateSignInWithEmailLink(email, actionCodeSettings);
    return link;
};

module.exports = {
    register,
    login,
    firebaseAuth,
    refreshTokens,
    sendAdminMagicLink,
};

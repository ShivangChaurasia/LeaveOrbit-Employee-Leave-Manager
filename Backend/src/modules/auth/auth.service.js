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

    let user = await User.findOne({ email });

    if (!user) {
        user = await User.create({
            name: name || email.split('@')[0],
            email,
            provider: 'google',
            role: 'employee',
            onboardingCompleted: false,
        });
    }

    const accessToken = authUtils.generateToken(user);

    return { user, accessToken };
};

module.exports = {
    register,
    login,
    firebaseAuth,
};

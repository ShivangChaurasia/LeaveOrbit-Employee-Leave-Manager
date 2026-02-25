const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'],
        index: true,
    },
    password: {
        type: String,
        required: function () { return this.provider === 'local'; },
        select: false, // Don't return password by default
    },
    provider: {
        type: String,
        enum: ['local', 'google'],
        default: 'local',
    },
    role: {
        type: String,
        enum: ['admin', 'manager', 'employee'],
        default: 'employee',
    },
    department: {
        type: String,
        trim: true,
    },
    leaveBalance: {
        type: Number,
        default: 20,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    refreshToken: {
        type: String,
        select: false,
    },
    failedLoginAttempts: {
        type: Number,
        default: 0,
    },
    lockUntil: {
        type: Date,
    },
    lastLogin: {
        type: Date,
    },
    onboardingCompleted: {
        type: Boolean,
        default: false,
    },
    managerApprovalStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
}, {
    timestamps: true,
});

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

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
        select: false,
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
    onboardingCompleted: {
        type: Boolean,
        default: false,
    },
    accountStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    managerApprovalStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'approved',
    },
}, {
    timestamps: true,
});
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model('User', userSchema);
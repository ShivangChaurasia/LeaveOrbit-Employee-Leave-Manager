const mongoose = require('mongoose');

const reimbursementSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
    },
    amount: {
        type: Number,
        required: [true, 'Please add an amount'],
        min: [0, 'Amount cannot be negative'],
    },
    category: {
        type: String,
        required: true,
        enum: ['Travel', 'Food', 'Office Supplies', 'Medical', 'Other'],
        default: 'Other',
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    approvalDate: Date,
    rejectionReason: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model('Reimbursement', reimbursementSchema);

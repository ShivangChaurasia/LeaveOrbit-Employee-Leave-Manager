const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// Middleware & Security
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
const authRoutes = require('./modules/auth/auth.routes');
const userRoutes = require('./modules/users/user.routes');
const leaveRoutes = require('./modules/leaves/leave.routes');
const reimbursementRoutes = require('./modules/reimbursements/reimbursement.routes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/reimbursements', reimbursementRoutes);

// Basic Route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'LeaveOrbit V2 API is running' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(`${err.name}: ${err.message}`);

    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Handle MongoDB duplicate key error
    if (err.code === 11000) {
        statusCode = 400;
        message = 'User already exists';
    }

    res.status(statusCode).json({
        status: 'error',
        message: message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
});

module.exports = app;

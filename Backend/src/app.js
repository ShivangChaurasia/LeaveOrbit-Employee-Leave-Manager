const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
app.use(cors({
    origin: [process.env.CLIENT_URL, 'http://localhost:5173', 'http://localhost:5174'].filter(Boolean),
    credentials: true
}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
const authRoutes = require('./modules/auth/auth.routes');
const userRoutes = require('./modules/users/user.routes');
const leaveRoutes = require('./modules/leaves/leave.routes');
const reimbursementRoutes = require('./modules/reimbursements/reimbursement.routes');
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/reimbursements', reimbursementRoutes);
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'LeaveOrbit V2 API is running' });
});
app.use((err, req, res, next) => {
    console.error(`${err.name}: ${err.message}`);
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
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
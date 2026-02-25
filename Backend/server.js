// Fix: Node v22 + OpenSSL 3.x TLS compatibility for Firebase Admin SDK
const tls = require('tls');
tls.DEFAULT_MIN_VERSION = 'TLSv1.2';
tls.DEFAULT_MAX_VERSION = 'TLSv1.3';

require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

// Connect to Database
connectDB();


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.error(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});

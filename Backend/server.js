const tls = require('tls');
tls.DEFAULT_MIN_VERSION = 'TLSv1.2';
tls.DEFAULT_MAX_VERSION = 'TLSv1.3';
require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');
connectDB();
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
process.on('unhandledRejection', (err, promise) => {
    console.error(`Unhandled Rejection at: ${promise}, reason: ${err.stack || err}`);
    server.close(() => process.exit(1));
});
process.on('uncaughtException', (err) => {
    console.error(`Uncaught Exception: ${err.stack || err}`);
    process.exit(1);
});
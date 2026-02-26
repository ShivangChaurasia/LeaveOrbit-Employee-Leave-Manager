const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const setupSecurity = (app) => {
    app.use(helmet());
    const whitelist = [process.env.CLIENT_URL, 'http:
    app.use(cors({
        origin: function (origin, callback) {
            if (!origin || whitelist.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true
    }));
    app.use((req, res, next) => {
        ['query', 'body', 'params'].forEach(prop => {
            if (req[prop]) {
                Object.defineProperty(req, prop, {
                    value: { ...req[prop] },
                    writable: true,
                    enumerable: true,
                    configurable: true
                });
            }
        });
        next();
    });
    app.use(mongoSanitize());
};
module.exports = setupSecurity;
const admin = require('firebase-admin');
const logger = require('../utils/logger');

let firebaseAdmin;

try {
    firebaseAdmin = admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
    });
    logger.info('Firebase Admin initialized successfully');
} catch (error) {
    logger.error(`Firebase Admin initialization error: ${error.message}`);
}

module.exports = firebaseAdmin;

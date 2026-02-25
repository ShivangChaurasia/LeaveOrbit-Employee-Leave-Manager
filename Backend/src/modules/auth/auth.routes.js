const express = require('express');
const authController = require('./auth.controller');
const { validate, registerSchema, loginSchema, firebaseAuthSchema } = require('./auth.validator');

const router = express.Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/firebase', validate(firebaseAuthSchema), authController.firebaseAuth);
router.post('/logout', authController.logout);

module.exports = router;

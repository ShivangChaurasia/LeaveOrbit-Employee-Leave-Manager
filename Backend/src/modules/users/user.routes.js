const express = require('express');
const userController = require('./user.controller');
const { protect, authorize } = require('../../middleware/auth.middleware');

const router = express.Router();

router.use(protect);

router.get('/profile', userController.getProfile);
router.post('/onboarding', userController.completeOnboarding);

// Admin only routes
router.get('/', authorize('admin'), userController.getAllUsers);
router.patch('/:id/approve-manager', authorize('admin'), userController.approveManager);

module.exports = router;

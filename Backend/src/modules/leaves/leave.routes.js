const express = require('express');
const leaveController = require('./leave.controller');
const { protect, authorize } = require('../../middleware/auth.middleware');

const router = express.Router();

router.use(protect);

router.post('/', leaveController.applyLeave);
router.get('/my', leaveController.getMyLeaves);
router.delete('/:id', leaveController.cancelLeave);

// Manager and Admin routes
router.get('/pending', authorize('manager', 'admin'), leaveController.getPendingLeaves);
router.get('/department', authorize('manager'), leaveController.getDepartmentLeaves);
router.patch('/:id/status', authorize('manager', 'admin'), leaveController.updateStatus);

// Admin only
router.get('/all', authorize('admin'), leaveController.getAllLeaves);
router.get('/', authorize('admin'), leaveController.getAllLeaves);

module.exports = router;

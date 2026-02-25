const express = require('express');
const reimbursementController = require('./reimbursement.controller');
const { protect, authorize } = require('../../middleware/auth.middleware');

const router = express.Router();

router.use(protect);

router.get('/', reimbursementController.getMyReimbursements);
router.post('/', reimbursementController.createReimbursement);

// Manager/Admin only
router.get('/all', authorize('manager', 'admin'), reimbursementController.getAllReimbursements);
router.patch('/:id/status', authorize('manager', 'admin'), reimbursementController.updateStatus);

module.exports = router;

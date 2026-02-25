const Reimbursement = require('./reimbursement.model');

const createReimbursement = async (req, res, next) => {
    try {
        if (req.user.role === 'admin') {
            return res.status(403).json({ success: false, message: 'Admins cannot apply for reimbursements' });
        }
        const reimbursement = await Reimbursement.create({
            ...req.body,
            user: req.user.id,
        });
        res.status(201).json({ success: true, data: { reimbursement } });
    } catch (error) {
        next(error);
    }
};

const getMyReimbursements = async (req, res, next) => {
    try {
        const reimbursements = await Reimbursement.find({ user: req.user.id }).sort('-createdAt');
        res.status(200).json({ success: true, data: { reimbursements } });
    } catch (error) {
        next(error);
    }
};

const getAllReimbursements = async (req, res, next) => {
    try {
        const query = req.user.role === 'admin' ? {} : { user: req.user.id };
        const reimbursements = await Reimbursement.find(query)
            .populate('user', 'name email department')
            .sort('-createdAt');
        res.status(200).json({ success: true, data: { reimbursements } });
    } catch (error) {
        next(error);
    }
};

const updateStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status, rejectionReason } = req.body;

        const reimbursement = await Reimbursement.findById(id);
        if (!reimbursement) {
            return res.status(404).json({ success: false, message: 'Reimbursement not found' });
        }

        reimbursement.status = status;
        reimbursement.approvedBy = req.user.id;
        reimbursement.approvalDate = Date.now();
        if (rejectionReason) reimbursement.rejectionReason = rejectionReason;

        await reimbursement.save();
        res.status(200).json({ success: true, data: { reimbursement } });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createReimbursement,
    getMyReimbursements,
    getAllReimbursements,
    updateStatus,
};

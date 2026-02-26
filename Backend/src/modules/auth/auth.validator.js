const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string().required().trim(),
    email: Joi.string().email().required().lowercase(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'manager', 'employee'),
    department: Joi.string().trim(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required().lowercase(),
    password: Joi.string().required(),
});

const firebaseAuthSchema = Joi.object({
    idToken: Joi.string().required(),
});

const validate = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ status: 'error', message: error.details[0].message });
    }
    // Update req.body with the validated and potentially transformed (lowercase, trim) value
    req.body = value;
    next();
};

module.exports = {
    validate,
    registerSchema,
    loginSchema,
    firebaseAuthSchema,
};

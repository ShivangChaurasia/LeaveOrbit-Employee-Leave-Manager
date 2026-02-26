const authService = require('./auth.service');
const register = async (req, res, next) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json({
            status: 'success',
            data: { user },
        });
    } catch (error) {
        next(error);
    }
};
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { user, accessToken } = await authService.login(email, password);
        res.status(200).json({
            status: 'success',
            data: { user, accessToken },
        });
    } catch (error) {
        next(error);
    }
};
const firebaseAuth = async (req, res, next) => {
    try {
        const { idToken } = req.body;
        const { user, accessToken } = await authService.firebaseAuth(idToken);
        res.status(200).json({
            status: 'success',
            data: { user, accessToken },
        });
    } catch (error) {
        next(error);
    }
};
const logout = async (req, res, next) => {
    try {
        res.status(200).json({ status: 'success', message: 'Logged out successfully' });
    } catch (error) {
        next(error);
    }
};
module.exports = {
    register,
    login,
    firebaseAuth,
    logout,
};
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
        const { user, accessToken, refreshToken } = await authService.login(email, password);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

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
        const { user, accessToken, refreshToken } = await authService.firebaseAuth(idToken);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            status: 'success',
            data: { user, accessToken },
        });
    } catch (error) {
        next(error);
    }
};

const refresh = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: 'No refresh token provided' });
        }

        const { accessToken, refreshToken: newRefreshToken } = await authService.refreshTokens(refreshToken);

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            status: 'success',
            data: { accessToken },
        });
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        res.clearCookie('refreshToken');
        res.status(200).json({ status: 'success', message: 'Logged out successfully' });
    } catch (error) {
        next(error);
    }
};

const sendMagicLink = async (req, res, next) => {
    try {
        const { email } = req.body;
        const link = await authService.sendAdminMagicLink(email);
        res.status(200).json({
            status: 'success',
            message: 'Magic link generated',
            data: { link },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    firebaseAuth,
    refresh,
    logout,
    sendMagicLink,
};

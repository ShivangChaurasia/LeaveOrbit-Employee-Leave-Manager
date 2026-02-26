import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { auth, googleProvider } from '../services/firebase';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);
    const triggerSuccess = () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };
    const login = async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        setUser(response.data.data.user);
        localStorage.setItem('accessToken', response.data.data.accessToken);
        triggerSuccess();
        return response.data.data.user;
    };
    const register = async (userData) => {
        const response = await api.post('/auth/register', userData);
        triggerSuccess();
        return response.data.data.user;
    };
    const firebaseLogin = async (idToken) => {
        const response = await api.post('/auth/firebase', { idToken });
        setUser(response.data.data.user);
        localStorage.setItem('accessToken', response.data.data.accessToken);
        triggerSuccess();
        return response.data.data.user;
    };
    const googleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const idToken = await result.user.getIdToken();
            return await firebaseLogin(idToken);
        } catch (error) {
            console.error('Google Login Error:', error);
            throw error;
        }
    };
    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (err) {
            console.error('Logout error:', err);
        }
        setUser(null);
        localStorage.removeItem('accessToken');
        await signOut(auth);
    };
    const checkAuthStatus = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            setLoading(false);
            return;
        }
        try {
            const response = await api.get('/users/profile');
            setUser(response.data.data.user);
        } catch (error) {
            setUser(null);
            localStorage.removeItem('accessToken');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        checkAuthStatus();
    }, []);
    const value = {
        user,
        loading,
        showSuccess,
        setShowSuccess,
        login,
        register,
        googleLogin,
        firebaseLogin,
        logout,
        setUser,
        checkAuthStatus,
    };
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
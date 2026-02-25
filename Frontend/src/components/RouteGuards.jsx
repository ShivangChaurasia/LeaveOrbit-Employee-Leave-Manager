import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export const RoleRoute = ({ allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" replace />;

    return allowedRoles.includes(user.role) ? (
        <Outlet />
    ) : (
        <Navigate to="/unauthorized" replace />
    );
};

export const PublicRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

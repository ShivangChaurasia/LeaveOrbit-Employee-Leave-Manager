import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = () => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return (
        <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!user) return <Navigate to="/login" replace />;

    // Redirect to onboarding if not completed and not already on onboarding page
    if (!user.onboardingCompleted && location.pathname !== '/onboarding') {
        return <Navigate to="/onboarding" replace />;
    }

    // If manager is pending approval, they can only see onboarding or nothing
    if (user.role === 'manager' && user.managerApprovalStatus === 'pending' && location.pathname !== '/onboarding') {
        return <Navigate to="/onboarding" replace />;
    }

    return <Outlet />;
};

export const RoleRoute = ({ allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) return (
        <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
    if (!user) return <Navigate to="/login" replace />;

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return (
        <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (user) {
        if (!user.onboardingCompleted) return <Navigate to="/onboarding" replace />;
        return <Navigate to="/dashboard" replace />;
    }

    return children || <Outlet />;
};

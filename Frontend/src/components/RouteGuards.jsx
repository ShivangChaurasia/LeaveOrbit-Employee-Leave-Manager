import { useLocation } from 'react-router-dom';

export const ProtectedRoute = () => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-bold">Loading...</div>;

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

    if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-bold">Loading...</div>;
    if (!user) return <Navigate to="/login" replace />;

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-bold">Loading...</div>;

    if (user) {
        if (!user.onboardingCompleted) return <Navigate to="/onboarding" replace />;
        return <Navigate to="/dashboard" replace />;
    }

    return children || <Outlet />;
};

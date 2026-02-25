import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProtectedRoute, PublicRoute } from './components/RouteGuards';
import { AppLayout } from './layouts/AppLayout';

import { Login } from './features/auth/Login';
import { Register } from './features/auth/Register';
import { Onboarding } from './features/onboarding/Onboarding';
import { Dashboard } from './features/dashboard/Dashboard';
import { Analytics } from './features/dashboard/Analytics';
import { MyLeaves } from './features/leaves/MyLeaves';

import { Approvals } from './features/leaves/Approvals';
import { Home } from './features/home/Home';
import { RoleHome } from './features/home/RoleHome';
import { UserManagement } from './features/admin/UserManagement';
import { AccountRequests } from './features/admin/AccountRequests';
import { Settings } from './features/settings/Settings';
import { Reimbursements } from './features/reimbursements/Reimbursements';

import { PublicLayout } from './layouts/PublicLayout';

import { useAuth } from './context/AuthContext';

function AppContent() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={user ? <Navigate to="/home" replace /> : <Home />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/home" element={<RoleHome />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/leaves" element={<MyLeaves />} />
            <Route path="/approvals" element={<Approvals />} />
            <Route path="/reimbursements" element={<Reimbursements />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/requests" element={<AccountRequests />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/onboarding" element={<Onboarding />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

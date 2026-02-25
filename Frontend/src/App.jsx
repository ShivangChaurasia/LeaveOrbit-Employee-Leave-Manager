import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, PublicRoute } from './components/RouteGuards';
import { AppLayout } from './layouts/AppLayout';

import { Login } from './features/auth/Login';
import { Onboarding } from './features/onboarding/Onboarding';
import { Dashboard } from './features/dashboard/Dashboard';
import { Analytics } from './features/dashboard/Analytics';
import { MyLeaves } from './features/leaves/MyLeaves';

import { Approvals } from './features/leaves/Approvals';
import { Home } from './features/home/Home';
import { UserManagement } from './features/admin/UserManagement';
import { Settings } from './features/settings/Settings';
import { Reimbursements } from './features/reimbursements/Reimbursements';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/leaves" element={<MyLeaves />} />
              <Route path="/approvals" element={<Approvals />} />
              <Route path="/reimbursements" element={<Reimbursements />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/onboarding" element={<Onboarding />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

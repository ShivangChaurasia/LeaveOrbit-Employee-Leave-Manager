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

// Pages
const Users = () => <div className="text-white">Employee Directory (WIP)</div>;
const Settings = () => <div className="text-white">Settings Page (WIP)</div>;

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/leaves" element={<MyLeaves />} />
              <Route path="/approvals" element={<Approvals />} />
              <Route path="/users" element={<Users />} />
              <Route path="/onboarding" element={<Onboarding />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

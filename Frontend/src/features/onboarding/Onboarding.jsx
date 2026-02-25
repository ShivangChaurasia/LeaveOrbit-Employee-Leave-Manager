import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { UserPlus, Building, Briefcase } from 'lucide-react';

export const Onboarding = () => {
    const { user, setUser } = useAuth();
    const [department, setDepartment] = useState('');
    const [name, setName] = useState(user?.name || '');
    const [role, setRole] = useState('employee');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await api.post('/users/onboarding', { department, name, role });
            const updatedUser = response.data.data.user;
            setUser(updatedUser);

            if (updatedUser.accountStatus === 'pending') {
                setSubmitted(true);
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Onboarding failed');
        } finally {
            setLoading(false);
        }
    };

    if (submitted || (user?.onboardingCompleted && user?.accountStatus === 'pending')) {
        return (
            <div className="max-w-xl mx-auto mt-12 px-4">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-xl text-center">
                    <div className="bg-yellow-600/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                        <Briefcase className="text-yellow-600 dark:text-yellow-500" size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-tight">Access Pending</h1>
                    <p className="text-slate-600 dark:text-slate-400 mb-8">
                        Hi <strong>{user?.name}</strong>, your account setup for <strong>{user?.department || department}</strong> is complete.
                        To ensure security, all new accounts require <strong>Admin Approval</strong> before you can access the platform.
                    </p>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl mb-8 text-sm text-slate-500 dark:text-slate-400">
                        <p>Our administrators have been notified. Please check back later.</p>
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold py-3 rounded-lg transition-all"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto mt-12 text-slate-100">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-blue-600/20 p-2 rounded-lg">
                        <UserPlus className="text-blue-500" size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white uppercase tracking-tight">Welcome to LeaveOrbit</h1>
                        <p className="text-slate-400">Let's get your profile set up</p>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-900/20 border border-red-900 text-red-400 p-3 rounded-lg mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Department</label>
                        <div className="relative">
                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <select
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                                required
                            >
                                <option value="">Select Department</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Human Resources">Human Resources</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Sales">Sales</option>
                                <option value="Finance">Finance</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Request Role</label>
                        <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                                required
                            >
                                <option value="employee">Employee</option>
                                <option value="manager">Manager (Requires Admin Approval)</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-all"
                    >
                        {loading ? 'Setting up...' : 'Complete Setup'}
                    </button>
                </form>
            </div>
        </div>
    );
};

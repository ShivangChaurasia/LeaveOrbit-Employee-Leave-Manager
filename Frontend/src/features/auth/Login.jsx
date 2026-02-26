import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock, Chrome, ArrowLeft } from 'lucide-react';
import Lottie from 'lottie-react';
import successData from '../../Assets/success.json';
export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, googleLogin, showSuccess } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            setTimeout(() => navigate('/dashboard'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };
    const handleGoogleLogin = async () => {
        setError('');
        try {
            await googleLogin();
            setTimeout(() => navigate('/dashboard'), 2000);
        } catch (err) {
            setError('Google login failed');
        }
    };
    return (
        <div className="min-h-[calc(100vh-64px)] bg-transparent flex items-center justify-center p-4 pt-12 relative overflow-hidden font-inter">
            {}
            {showSuccess && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm">
                    <div className="w-64 h-64">
                        <Lottie animationData={successData} loop={false} />
                    </div>
                </div>
            )}
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
                {}
                <div className="hidden lg:block space-y-8 pr-12 border-r border-slate-200 dark:border-slate-800">
                    <div>
                        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                            The Intelligent Way to <span className="text-blue-600">Manage Time-Off</span>
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                            Experience a streamlined approach to attendance tracking and leave management designed for the modern workplace.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <div className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 flex-shrink-0">
                                <Chrome size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1 uppercase tracking-wider text-xs">Direct Integration</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Seamlessly connect with your existing company workspace for data consistency.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 flex-shrink-0">
                                <LogIn size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1 uppercase tracking-wider text-xs">Automated Workflow</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Lightning-fast request cycles with automated department-level coordination.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                            <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 flex-shrink-0">
                                <Chrome size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1 uppercase tracking-wider text-xs">Secure Platform</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Enterprise-grade security protocols ensuring your data remains private.</p>
                            </div>
                        </div>
                    </div>
                </div>
                {}
                <div className="max-w-md w-full mx-auto relative">
                    {}
                    <Link
                        to="/"
                        className="absolute -top-12 left-0 flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors font-bold text-sm"
                    >
                        <ArrowLeft size={16} />
                        Back to Home
                    </Link>
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-2xl transition-all duration-500">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-tighter">Login</h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">Access your employee portal</p>
                        </div>
                        {error && (
                            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-4 rounded-2xl mb-8 text-sm font-bold flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold placeholder:text-slate-400 placeholder:font-medium"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold placeholder:text-slate-400 placeholder:font-medium"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg active:scale-[0.98]"
                            >
                                <LogIn size={20} />
                                Sign In
                            </button>
                        </form>
                        <div className="mt-8">
                            <div className="relative mb-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                                </div>
                                <div className="relative flex justify-center text-xs">
                                    <span className="px-4 bg-white dark:bg-slate-900 text-slate-400 font-bold uppercase tracking-wider">Or Secure Login</span>
                                </div>
                            </div>
                            <button
                                onClick={handleGoogleLogin}
                                className="w-full bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                            >
                                <Chrome size={20} />
                                Google Workspace
                            </button>
                        </div>
                        <p className="mt-10 text-center text-slate-500 text-sm font-bold">
                            New here?{' '}
                            <Link to="/register" className="text-blue-500 hover:text-blue-400 underline underline-offset-4 decoration-2 transition-colors">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
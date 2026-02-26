import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, ArrowRight, ArrowLeft, Chrome } from 'lucide-react';
import Lottie from 'lottie-react';
import successData from '../../Assets/success.json';

export const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register, login, googleLogin, showSuccess } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await register(formData);
            // After registration, log them in automatically
            await login(formData.email, formData.password);
            setTimeout(() => navigate('/dashboard'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        setError('');
        try {
            await googleLogin();
            setTimeout(() => navigate('/dashboard'), 2000);
        } catch (err) {
            setError('Google signup failed');
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-transparent flex items-center justify-center p-4 pt-12 relative overflow-hidden font-inter">
            {/* Success Overlay */}
            {showSuccess && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm">
                    <div className="w-64 h-64">
                        <Lottie animationData={successData} loop={false} />
                    </div>
                </div>
            )}

            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
                {/* Left Panel: Value Prop */}
                <div className="hidden lg:block space-y-8 pr-12 border-r border-slate-200 dark:border-slate-800">
                    <div>
                        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                            Join the Future of <span className="text-blue-600">Workforce Balance</span>
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                            Create your professional account and start managing your leave benefits with unprecedented clarity and speed.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            { title: 'Zero Friction', desc: 'Apply for leaves in under 30 seconds.' },
                            { title: 'Full Transparency', desc: 'Real-time visibility into your team schedule.' },
                            { title: 'Direct Sync', desc: 'Integrated with payroll and performance tools.' },
                            { title: '24/7 Access', desc: 'Manage requests anytime, from any device.' }
                        ].map((prop, idx) => (
                            <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                                    <h4 className="font-bold text-slate-900 dark:text-white text-[10px] uppercase tracking-widest">{prop.title}</h4>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{prop.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="p-8 rounded-3xl bg-blue-600/5 border border-blue-600/10 flex items-center gap-6">
                        <div className="flex-1">
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Empowering High-Performance Teams</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">LeaveOrbit helps minimize administrative overhead, letting teams focus on what really matters—growth.</p>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Form */}
                <div className="max-w-md w-full mx-auto relative">
                    {/* Back Link */}
                    <Link
                        to="/"
                        className="absolute -top-12 left-0 flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors font-bold text-sm"
                    >
                        <ArrowLeft size={16} />
                        Back to Home
                    </Link>

                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-2xl transition-all duration-500">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-tighter">Sign Up</h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">Create your professional account</p>
                        </div>

                        {error && (
                            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-4 rounded-2xl mb-8 text-sm font-bold flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold placeholder:text-slate-400 placeholder:font-medium"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
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
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold placeholder:text-slate-400 placeholder:font-medium"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg active:scale-[0.98] group disabled:opacity-50"
                            >
                                {loading ? 'Processing...' : (
                                    <>
                                        <UserPlus size={20} />
                                        Register Account
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8">
                            <div className="relative mb-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                                </div>
                                <div className="relative flex justify-center text-xs">
                                    <span className="px-4 bg-white dark:bg-slate-900 text-slate-400 font-bold uppercase tracking-wider">Or Secure Register</span>
                                </div>
                            </div>

                            <button
                                onClick={handleGoogleSignup}
                                className="w-full bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                            >
                                <Chrome size={20} />
                                Google Workspace
                            </button>
                        </div>

                        <p className="mt-10 text-center text-slate-500 text-sm font-bold">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-500 hover:text-blue-400 underline underline-offset-4 decoration-2 transition-colors">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

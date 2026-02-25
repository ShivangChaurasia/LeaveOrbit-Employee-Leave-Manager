import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
    LayoutDashboard,
    CalendarDays,
    Users,
    Settings,
    LogOut,
    Moon,
    Sun,
    Menu,
    X,
    Bell,
    UserCircle,
    ChevronDown,
    ClipboardCheck,
    Wallet,
    UserPlus
} from 'lucide-react';

import Lottie from 'lottie-react';
import logoData from '../Assets/logo.json';

export const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const menuItems = [
        { icon: CalendarDays, label: 'Home', path: '/home', roles: ['employee', 'manager', 'admin'] },
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', roles: ['employee', 'manager', 'admin'] },
        { icon: ClipboardCheck, label: 'My Leaves', path: '/leaves', roles: ['employee', 'manager'] },
        { icon: Wallet, label: 'Reimbursements', path: '/reimbursements', roles: ['employee', 'manager'] },
        { icon: ClipboardCheck, label: 'Approvals', path: '/approvals', roles: ['manager', 'admin'] },
        { icon: Users, label: 'Directory', path: '/users', roles: ['admin'] },
        { icon: UserPlus, label: 'Account Requests', path: '/requests', roles: ['admin'] },
    ].filter(item => item.roles.includes(user?.role));

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 transition-all duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-105">
                                <Lottie animationData={logoData} loop={true} className="w-full h-full" />
                            </div>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">LeaveOrbit</span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-1">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold transition-all ${location.pathname === item.path
                                        ? 'bg-blue-600/10 text-blue-600 dark:text-blue-400'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                        }`}
                                >
                                    <item.icon size={18} />
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>


                        {/* Profile or Guest Links */}
                        {user ? (
                            <div className="relative ml-2">
                                <button
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="flex items-center gap-2 p-1.5 pl-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 transition-all group"
                                >
                                    <div className="text-right hidden sm:block">
                                        <div className="text-xs font-black text-slate-900 dark:text-white leading-none">{user?.name}</div>
                                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{user?.role}</div>
                                    </div>
                                    <UserCircle size={28} className="text-blue-600 dark:text-blue-400" />
                                    <ChevronDown size={14} className={`text-slate-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {profileOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)}></div>
                                        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-20 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                                            <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                                                <div className="text-sm font-black text-slate-900 dark:text-white">{user?.name}</div>
                                                <div className="text-xs font-medium text-slate-500 truncate">{user?.email}</div>
                                            </div>
                                            <div className="p-2">
                                                <Link
                                                    to="/settings"
                                                    onClick={() => setProfileOpen(false)}
                                                    className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                                >
                                                    <Settings size={18} />
                                                    Account Settings
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors mt-1"
                                                >
                                                    <LogOut size={18} />
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 ml-4">
                                <Link to="/login" className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Login</Link>
                                <Link to="/register" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-all shadow-md">Sign Up</Link>
                            </div>
                        )}

                        {/* Mobile Menu Toggle */}
                        <div className="flex md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 text-slate-600 dark:text-slate-400"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t border-slate-100 dark:border-slate-800 p-4 space-y-2 bg-white dark:bg-slate-900">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold ${location.pathname === item.path
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
};

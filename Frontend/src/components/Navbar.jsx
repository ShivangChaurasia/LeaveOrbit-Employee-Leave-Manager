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
    Wallet
} from 'lucide-react';

export const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', roles: ['employee', 'manager', 'admin'] },
        { icon: CalendarDays, label: 'My Leaves', path: '/leaves', roles: ['employee', 'manager'] },
        { icon: Wallet, label: 'Reimbursements', path: '/reimbursements', roles: ['employee', 'manager', 'admin'] },
        { icon: ClipboardCheck, label: 'Approvals', path: '/approvals', roles: ['employee', 'manager', 'admin'] },
        { icon: Users, label: 'Directory', path: '/users', roles: ['admin'] },
    ].filter(item => item.roles.includes(user?.role));

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black group-hover:rotate-12 transition-transform shadow-lg shadow-blue-600/20">L</div>
                            <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">LEAVEOBIT</span>
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

                        <button className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full border-2 border-white dark:border-slate-900"></span>
                        </button>

                        {/* Profile Dropdown */}
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

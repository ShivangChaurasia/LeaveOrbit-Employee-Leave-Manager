import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    CalendarDays,
    Users,
    ClipboardCheck,
    Settings,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
const cn = (...inputs) => twMerge(clsx(inputs));
export const Sidebar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);
    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', roles: ['employee', 'manager', 'admin'] },
        { icon: LayoutDashboard, label: 'Analytics', path: '/analytics', roles: ['admin'] },
        { icon: CalendarDays, label: 'My Leaves', path: '/leaves', roles: ['employee', 'manager', 'admin'] },
        { icon: ClipboardCheck, label: 'Approval requests', path: '/approvals', roles: ['manager', 'admin'] },
        { icon: Users, label: 'Employee Directory', path: '/users', roles: ['admin'] },
        { icon: Settings, label: 'Settings', path: '/settings', roles: ['employee', 'manager', 'admin'] },
    ].filter(item => item.roles.includes(user?.role));
    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };
    return (
        <div className={cn(
            "bg-slate-900 text-white min-h-screen transition-all duration-300 flex flex-col",
            isOpen ? "w-64" : "w-20"
        )}>
            <div className="p-4 flex justify-between items-center border-b border-slate-800">
                {isOpen && <h1 className="text-xl font-bold text-blue-400">LeaveOrbit</h1>}
                <button onClick={() => setIsOpen(!isOpen)} className="p-1 hover:bg-slate-800 rounded">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            <nav className="flex-1 mt-6">
                {menuItems.map((item) => (
                    <button
                        key={item.label}
                        onClick={() => navigate(item.path)}
                        className="w-full flex items-center p-4 hover:bg-slate-800 transition-colors group"
                    >
                        <item.icon size={22} className="text-slate-400 group-hover:text-blue-400" />
                        {isOpen && <span className="ml-4 font-medium">{item.label}</span>}
                    </button>
                ))}
            </nav>
            <div className="p-4 border-t border-slate-800">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center p-2 hover:bg-red-900/30 text-red-400 rounded transition-colors"
                >
                    <LogOut size={22} />
                    {isOpen && <span className="ml-4 font-medium">Logout</span>}
                </button>
            </div>
        </div>
    );
};
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import {
    Calendar,
    CheckCircle2,
    XCircle,
    Clock,
    ArrowRight
} from 'lucide-react';

export const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        pending: 0,
        approved: 0,
        rejected: 0,
        balance: user?.leaveBalance || 0
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await api.get('/leaves/my');
                const leaves = response.data.data.leaves;
                const newStats = {
                    pending: leaves.filter(l => l.status === 'pending').length,
                    approved: leaves.filter(l => l.status === 'approved').length,
                    rejected: leaves.filter(l => l.status === 'rejected').length,
                    balance: user?.leaveBalance || 0
                };
                setStats(newStats);
            } catch (error) {
                console.error('Failed to fetch dashboard data', error);
            }
        };
        fetchDashboardData();
    }, [user]);

    const statCards = [
        { label: 'Available Balance', value: stats.balance, icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Pending Requests', value: stats.pending, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        { label: 'Approved', value: stats.approved, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { label: 'Rejected', value: stats.rejected, icon: XCircle, color: 'text-rose-500', bg: 'bg-rose-500/10' },
    ];

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
                <p className="text-slate-600 dark:text-slate-400">Welcome back, {user?.name}</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => (
                    <div key={stat.label} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm dark:shadow-none transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className={cn("p-2 rounded-xl", stat.bg)}>
                                <stat.icon className={stat.color} size={24} />
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-none">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Activity</h2>
                        <button className="text-blue-500 text-sm font-medium flex items-center gap-1 hover:underline">
                            View all <ArrowRight size={16} />
                        </button>
                    </div>
                    <div className="p-6 text-slate-500 text-center py-12">
                        No recent activity found.
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-blue-500/20">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-2">Need a break?</h2>
                        <p className="text-blue-100 mb-6">Apply for your next leave in just a few clicks.</p>
                        <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                            Apply for Leave
                        </button>
                    </div>
                    <Calendar className="absolute -right-8 -bottom-8 text-blue-400/20 w-48 h-48 -rotate-12" />
                </div>
            </div>
        </div>
    );
};

const cn = (...inputs) => inputs.filter(Boolean).join(' ');

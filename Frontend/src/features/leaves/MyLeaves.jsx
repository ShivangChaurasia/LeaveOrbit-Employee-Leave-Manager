import { useEffect, useState } from 'react';
import api from '../../services/api';
import { LeaveForm } from './LeaveForm';
import {
    Clock,
    CheckCircle2,
    XCircle,
    Trash2,
    ChevronRight,
    Search,
    Filter
} from 'lucide-react';
export const MyLeaves = () => {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchLeaves = async () => {
        try {
            const response = await api.get('/leaves/my');
            setLeaves(response.data.data.leaves);
        } catch (error) {
            console.error('Failed to fetch leaves', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchLeaves();
    }, []);
    const handleCancel = async (id) => {
        if (!confirm('Are you sure you want to cancel this leave request?')) return;
        try {
            await api.delete(`/leaves/${id}`);
            fetchLeaves();
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to cancel leave');
        }
    };
    const getStatusStyle = (status) => {
        switch (status) {
            case 'approved': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
            case 'rejected': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
            case 'pending': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
            default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        }
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case 'approved': return <CheckCircle2 size={16} />;
            case 'rejected': return <XCircle size={16} />;
            case 'pending': return <Clock size={16} />;
            default: return null;
        }
    };
    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Leaves</h1>
                    <p className="text-slate-600 dark:text-slate-400">Track and manage your leave requests</p>
                </div>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <LeaveForm onSuccess={fetchLeaves} />
                </div>
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-none transition-all">
                        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search by reason or type..."
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <button className="p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors">
                                <Filter size={18} />
                            </button>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {loading ? (
                                <div className="p-12 text-center text-slate-500 italic">Loading your leaves...</div>
                            ) : leaves.length === 0 ? (
                                <div className="p-12 text-center text-slate-500 italic">No leave requests found.</div>
                            ) : (
                                leaves.map((leave) => (
                                    <div key={leave._id} className="p-5 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className={cn(
                                                "w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg",
                                                leave.status === 'approved' ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                                            )}>
                                                {leave.totalDays}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-slate-900 dark:text-white font-bold">{leave.leaveType}</span>
                                                    <div className={cn(
                                                        "text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border font-bold flex items-center gap-1",
                                                        getStatusStyle(leave.status)
                                                    )}>
                                                        {getStatusIcon(leave.status)}
                                                        {leave.status}
                                                    </div>
                                                </div>
                                                <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                                    {new Date(leave.startDate).toLocaleDateString()}
                                                    <ChevronRight size={14} />
                                                    {new Date(leave.endDate).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            {leave.status === 'pending' && (
                                                <button
                                                    onClick={() => handleCancel(leave._id)}
                                                    className="p-2 text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all"
                                                    title="Cancel Request"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                            <div className="text-sm text-slate-400 hidden sm:block">
                                                Applied on {new Date(leave.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
const cn = (...inputs) => inputs.filter(Boolean).join(' ');
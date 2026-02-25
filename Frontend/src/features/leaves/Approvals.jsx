import { useEffect, useState } from 'react';
import api from '../../services/api';
import {
    Check,
    X,
    Clock,
    AlertCircle,
    User,
    Calendar
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Approvals = () => {
    const { user } = useAuth();
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPending = async () => {
        try {
            const response = await api.get('/leaves/pending');
            setLeaves(response.data.data.leaves);
        } catch (error) {
            console.error('Failed to fetch pending leaves', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPending();
    }, []);

    const handleAction = async (id, status) => {
        const note = prompt(`Enter a note for this ${status}:`);
        if (note === null) return;
        try {
            await api.patch(`/leaves/${id}/status`, { status, note });
            fetchPending();
        } catch (error) {
            alert(error.response?.data?.message || 'Action failed');
        }
    };

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Pending Approvals</h1>
                <p className="text-slate-600 dark:text-slate-400 font-medium">
                    {user.role === 'admin'
                        ? 'Administrative review of Management leave requests.'
                        : `Reviewing leave requests from the ${user.department} department.`}
                </p>
            </header>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-none transition-all">
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {loading ? (
                        <div className="p-12 text-center text-slate-500">Loading requests...</div>
                    ) : leaves.length === 0 ? (
                        <div className="p-12 text-center text-slate-500 italic">No pending requests found.</div>
                    ) : (
                        leaves.map((leave) => (
                            <div key={leave._id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-600/20 p-3 rounded-2xl">
                                        <User className="text-blue-500" size={24} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-slate-900 dark:text-white font-bold text-lg">{leave.employee.name}</span>
                                            <span className="text-[10px] font-black uppercase tracking-wider bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md">{leave.employee.role}</span>
                                            <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full">{leave.employee.department}</span>
                                        </div>
                                        <div className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                                            Requested <span className="text-slate-900 dark:text-white font-medium">{leave.totalDays} days</span> for <span className="text-slate-900 dark:text-white font-medium">{leave.leaveType}</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-slate-500">
                                            <div className="flex items-center gap-1">
                                                <Calendar size={14} />
                                                {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock size={14} />
                                                Applied on {new Date(leave.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="mt-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg text-sm text-slate-600 dark:text-slate-300 italic border-l-2 border-blue-500">
                                            "{leave.reason}"
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleAction(leave._id, 'rejected')}
                                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-rose-500/30 text-rose-500 hover:bg-rose-500 hover:text-white transition-all font-bold"
                                    >
                                        <X size={18} />
                                        Reject
                                    </button>
                                    <button
                                        onClick={() => handleAction(leave._id, 'approved')}
                                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-all font-bold shadow-lg shadow-emerald-600/20"
                                    >
                                        <Check size={18} />
                                        Approve
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

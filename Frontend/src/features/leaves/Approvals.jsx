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
    const [reimbursements, setReimbursements] = useState([]);
    const [auditLogs, setAuditLogs] = useState([]);
    const [activeTab, setActiveTab] = useState('leaves');
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        try {
            setLoading(true);
            const promises = [api.get('/leaves/pending')];
            if (user.role === 'admin') {
                promises.push(api.get('/reimbursements/pending'));
            }
            const [leaveRes, reimRes] = await Promise.all(promises);
            setLeaves(leaveRes.data.data.leaves);
            if (user.role === 'admin') {
                setReimbursements(reimRes.data.data.reimbursements);
            }
        } catch (error) {
            console.error('Failed to fetch pending data', error);
        } finally {
            setLoading(false);
        }
    };
    const fetchAuditLogs = async () => {
        try {
            setLoading(true);
            const promises = [];
            if (user.role === 'admin') {
                promises.push(api.get('/leaves/all'));
                promises.push(api.get('/reimbursements/all'));
            } else if (user.role === 'manager') {
                promises.push(api.get('/leaves/department'));
            }
            const results = await Promise.all(promises);
            let combined = [];
            if (user.role === 'admin') {
                const allLeaves = (results[0].data.data.leaves || []).map(l => ({ ...l, type: 'Leave' }));
                const allReims = (results[1].data.data.reimbursements || []).map(r => ({ ...r, type: 'Reimbursement' }));
                combined = [...allLeaves, ...allReims];
            } else if (user.role === 'manager') {
                combined = (results[0].data.data.leaves || []).map(l => ({ ...l, type: 'Leave' }));
            }
            combined.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            setAuditLogs(combined);
        } catch (error) {
            console.error('Failed to fetch audit logs', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (activeTab === 'audit') {
            fetchAuditLogs();
        } else {
            fetchData();
        }
    }, [activeTab]);
    const handleLeaveAction = async (id, status) => {
        const note = prompt(`Enter a note for this ${status}:`);
        if (note === null) return;
        try {
            await api.patch(`/leaves/${id}/status`, { status, note });
            fetchData();
        } catch (error) {
            alert(error.response?.data?.message || 'Action failed');
        }
    };
    const handleReimbursementAction = async (id, status) => {
        const rejectionReason = status === 'rejected' ? prompt('Enter rejection reason:') : null;
        if (status === 'rejected' && rejectionReason === null) return;
        try {
            await api.patch(`/reimbursements/${id}/status`, { status, rejectionReason });
            fetchData();
        } catch (error) {
            alert(error.response?.data?.message || 'Action failed');
        }
    };
    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Pending Approvals</h1>
                    <p className="text-slate-600 dark:text-slate-400 font-medium max-w-lg">
                        {user.role === 'admin'
                            ? 'Review and manage all employee leave requests and expense reimbursements.'
                            : `Reviewing pending requests from the ${user.department || 'Unknown'} department.`}
                    </p>
                </div>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
                    <button
                        onClick={() => setActiveTab('leaves')}
                        className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${activeTab === 'leaves'
                            ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                    >
                        Leaves ({leaves.length})
                    </button>
                    {(user.role === 'admin' || user.role === 'manager') && (
                        <>
                            {user.role === 'admin' && (
                                <button
                                    onClick={() => setActiveTab('reimbursements')}
                                    className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${activeTab === 'reimbursements'
                                        ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                        }`}
                                >
                                    Reimbursements ({reimbursements.length})
                                </button>
                            )}
                            <button
                                onClick={() => setActiveTab('audit')}
                                className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${activeTab === 'audit'
                                    ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                    }`}
                            >
                                {user.role === 'admin' ? 'Audit Logs' : 'Dept History'}
                            </button>
                        </>
                    )}
                </div>
            </header>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-none transition-all">
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {loading ? (
                        <div className="p-12 text-center text-slate-500 font-bold">Loading pending requests...</div>
                    ) : (
                        <>
                            {activeTab === 'leaves' && (
                                leaves.length === 0 ? (
                                    <div className="p-12 text-center text-slate-500 italic font-medium">
                                        No pending leave requests found
                                        {user.role === 'manager' && ` for your ${user.department || 'assigned'} department`}.
                                    </div>
                                ) : (
                                    leaves.map((leave) => (
                                        <div key={leave._id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 last:border-0 dark:border-slate-800">
                                            <div className="flex items-start gap-4">
                                                <div className="bg-blue-600/10 p-4 rounded-2xl text-blue-600">
                                                    <Calendar size={24} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-slate-900 dark:text-white font-bold text-lg">{leave.employee?.name || 'Unknown User'}</span>
                                                        <span className="text-[10px] font-black uppercase tracking-wider bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md">{leave.employee?.role || 'N/A'}</span>
                                                        <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full">{leave.employee?.department || 'N/A'}</span>
                                                    </div>
                                                    <div className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                                                        <span className="font-bold text-slate-900 dark:text-white">{leave.totalDays} Days</span> request for <span className="font-bold text-slate-900 dark:text-white">{leave.leaveType}</span>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                                                        <div className="flex items-center gap-1.5">
                                                            <Clock size={14} className="text-slate-400" />
                                                            {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <div className="w-1 h-1 rounded-full bg-slate-300" />
                                                            Applied {new Date(leave.createdAt).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl text-sm text-slate-600 dark:text-slate-300 italic flex items-start gap-2">
                                                        <span className="text-blue-500 font-serif text-2xl leading-none">"</span>
                                                        {leave.reason}
                                                        <span className="text-blue-500 font-serif text-2xl leading-none self-end">"</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => handleLeaveAction(leave._id, 'rejected')}
                                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-rose-500 hover:text-rose-500 transition-all font-bold"
                                                >
                                                    <X size={18} />
                                                    Reject
                                                </button>
                                                <button
                                                    onClick={() => handleLeaveAction(leave._id, 'approved')}
                                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-600/20"
                                                >
                                                    <Check size={18} />
                                                    Approve
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )
                            )}
                            {activeTab === 'reimbursements' && (
                                reimbursements.length === 0 ? (
                                    <div className="p-12 text-center text-slate-500 italic font-medium">No pending reimbursement claims found.</div>
                                ) : (
                                    reimbursements.map((r) => (
                                        <div key={r._id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 last:border-0 dark:border-slate-800">
                                            <div className="flex items-start gap-4">
                                                <div className="bg-emerald-600/10 p-4 rounded-2xl text-emerald-600 font-black">
                                                    $
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-slate-900 dark:text-white font-bold text-lg">{r.user?.name || 'Unknown User'}</span>
                                                        <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md">{r.user?.role || 'N/A'}</span>
                                                        <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full">{r.user?.department || 'N/A'}</span>
                                                    </div>
                                                    <div className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                                                        Claiming <span className="font-black text-slate-900 dark:text-white">${r.amount.toFixed(2)}</span> for <span className="font-bold text-slate-900 dark:text-white">{r.title}</span>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                                                        <div className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-black uppercase tracking-wider">
                                                            {r.category}
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <div className="w-1 h-1 rounded-full bg-slate-300" />
                                                            Submitted {new Date(r.createdAt).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl text-sm text-slate-600 dark:text-slate-300 italic flex items-start gap-2">
                                                        <span className="text-emerald-500 font-serif text-2xl leading-none">"</span>
                                                        {r.description}
                                                        <span className="text-emerald-500 font-serif text-2xl leading-none self-end">"</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => handleReimbursementAction(r._id, 'rejected')}
                                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-rose-500 hover:text-rose-500 transition-all font-bold"
                                                >
                                                    <X size={18} />
                                                    Reject
                                                </button>
                                                <button
                                                    onClick={() => handleReimbursementAction(r._id, 'approved')}
                                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-all font-bold shadow-lg shadow-emerald-600/20"
                                                >
                                                    <Check size={18} />
                                                    Approve
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )
                            )}
                            {activeTab === 'audit' && (
                                auditLogs.length === 0 ? (
                                    <div className="p-12 text-center text-slate-500 italic font-medium">No audit logs found.</div>
                                ) : (
                                    auditLogs.map((log) => (
                                        <div key={log._id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 last:border-0 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                            <div className="flex items-start gap-4">
                                                <div className={`p-4 rounded-2xl font-black ${log.type === 'Leave'
                                                    ? 'bg-blue-600/10 text-blue-600'
                                                    : 'bg-emerald-600/10 text-emerald-600'
                                                    }`}>
                                                    {log.type === 'Leave' ? <Calendar size={24} /> : '$'}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                        <span className="text-slate-900 dark:text-white font-bold text-lg">{(log.employee || log.user)?.name || 'Unknown User'}</span>
                                                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${log.status === 'approved' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' :
                                                            log.status === 'rejected' ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' :
                                                                'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                                                            }`}>
                                                            {log.status}
                                                        </span>
                                                        <span className="text-xs font-black bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md uppercase tracking-tight">
                                                            {log.type}
                                                        </span>
                                                    </div>
                                                    <div className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                                                        {log.type === 'Leave' ? (
                                                            <>Requested <span className="font-bold text-slate-900 dark:text-white">{log.totalDays} Days</span> of <span className="font-bold text-slate-900 dark:text-white">{log.leaveType}</span></>
                                                        ) : (
                                                            <>Claimed <span className="font-black text-slate-900 dark:text-white">${log.amount?.toFixed(2)}</span> for <span className="font-bold text-slate-900 dark:text-white">{log.title}</span></>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                                            <User size={12} className="text-slate-400" />
                                                            Requested by <span className="text-slate-700 dark:text-slate-300">{(log.employee || log.user)?.name}</span>
                                                            <span className="text-slate-400">({(log.employee || log.user)?.department})</span>
                                                        </div>
                                                        {log.status !== 'pending' && (
                                                            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                                                                <Check size={12} />
                                                                Processed by <span className="underline italic">{(log.reviewedBy || log.approvedBy)?.name || 'System / Admin'}</span>
                                                            </div>
                                                        )}
                                                        <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">
                                                            <Clock size={10} />
                                                            Last Updated: {new Date(log.updatedAt).toLocaleString()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="hidden md:block text-right">
                                                <div className="text-xs font-black text-slate-400 uppercase tracking-tighter mb-1">Impact</div>
                                                <div className="text-lg font-black text-slate-900 dark:text-white">
                                                    {log.type === 'Leave' ? `-${log.totalDays}d` : `$${log.amount?.toFixed(0)}`}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
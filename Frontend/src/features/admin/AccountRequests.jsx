import { useState, useEffect } from 'react';
import api from '../../services/api';
import {
    UserPlus,
    Search,
    Mail,
    Building2,
    CheckCircle2,
    XCircle,
    UserCircle,
    UserCheck,
    UserX,
    Clock
} from 'lucide-react';

export const AccountRequests = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const response = await api.get('/users');
            // Filter users who are pending approval
            const pendingUsers = response.data.data.users.filter(u => u.accountStatus === 'pending');
            setUsers(pendingUsers);
        } catch (err) {
            setError('Failed to fetch account requests');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleApproval = async (userId, status) => {
        try {
            await api.patch(`/users/${userId}/approve-account`, { status });
            fetchRequests();
        } catch (err) {
            setError('Failed to update account status');
            console.error(err);
        }
    };

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Account Requests</h1>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">Review and approve new sign-ups before they can access the platform.</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search requests..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                        />
                    </div>
                </div>
            </header>

            {error && (
                <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-900 text-rose-600 p-4 rounded-xl text-sm font-medium">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => (
                    <div key={user._id} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/5">
                        <div className="flex items-start justify-between mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-amber-600/10 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                                <UserPlus size={32} />
                            </div>
                            <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400`}>
                                Pending {user.role}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate">{user.name}</h3>
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mt-1">
                                    <Mail size={14} />
                                    <span className="text-sm font-medium truncate">{user.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mt-1">
                                    <Building2 size={14} />
                                    <span className="text-sm font-medium truncate">{user.department || 'No department'}</span>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex gap-3">
                                <button
                                    onClick={() => handleApproval(user._id, 'approved')}
                                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/20"
                                >
                                    <UserCheck size={18} />
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleApproval(user._id, 'rejected')}
                                    className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-900/20 text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all"
                                >
                                    <UserX size={18} />
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredUsers.length === 0 && (
                <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                    <CheckCircle2 className="mx-auto text-emerald-500/20 mb-4" size={48} />
                    <p className="text-slate-500 font-medium">All caught up! No pending account requests.</p>
                </div>
            )}
        </div>
    );
};

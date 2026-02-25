import { useState, useEffect } from 'react';
import api from '../../services/api';
import {
    Users,
    Search,
    Filter,
    Mail,
    Building2,
    ShieldCheck,
    Clock,
    CheckCircle2,
    XCircle,
    UserCircle
} from 'lucide-react';

export const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await api.get('/users');
            setUsers(response.data.data.users);
        } catch (err) {
            setError('Failed to fetch users');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

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
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Employee Directory</h1>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">Manage all registered employees and their permissions.</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search employees..."
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
                            <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                                <UserCircle size={32} />
                            </div>
                            <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${user.role === 'admin'
                                    ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                                    : user.role === 'manager'
                                        ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                                        : 'bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400'
                                }`}>
                                {user.role}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate">{user.name}</h3>
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mt-1">
                                    <Mail size={14} />
                                    <span className="text-sm font-medium truncate">{user.email}</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Department</div>
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                                        <Building2 size={12} className="text-blue-500" />
                                        {user.department || 'Unassigned'}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</div>
                                    <div className="flex items-center gap-1.5 text-xs font-bold">
                                        {user.managerApprovalStatus === 'approved' ? (
                                            <>
                                                <CheckCircle2 size={12} className="text-emerald-500" />
                                                <span className="text-emerald-600 dark:text-emerald-400">Verified</span>
                                            </>
                                        ) : user.managerApprovalStatus === 'rejected' ? (
                                            <>
                                                <XCircle size={12} className="text-rose-500" />
                                                <span className="text-rose-600">Denied</span>
                                            </>
                                        ) : (
                                            <>
                                                <Clock size={12} className="text-amber-500" />
                                                <span className="text-amber-600">Pending</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredUsers.length === 0 && (
                <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                    <Users className="mx-auto text-slate-300 dark:text-slate-700 mb-4" size={48} />
                    <p className="text-slate-500 font-medium">No employees found matching your search.</p>
                </div>
            )}
        </div>
    );
};

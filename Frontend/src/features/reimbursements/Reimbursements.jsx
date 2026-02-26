import { useState, useEffect } from 'react';
import api from '../../services/api';
import {
    Wallet,
    Plus,
    ReceiptText,
    Clock,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Send,
    Filter,
    ArrowUpRight,
    TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export const Reimbursements = () => {
    const [reimbursements, setReimbursements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: 'Other',
        description: '',
    });
    const fetchReimbursements = async () => {
        try {
            const res = await api.get('/reimbursements');
            setReimbursements(res.data.data.reimbursements);
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchReimbursements();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage({ type: '', text: '' });
        try {
            await api.post('/reimbursements', formData);
            setMessage({ type: 'success', text: 'Claim submitted successfully!' });
            setFormData({ title: '', amount: '', category: 'Other', description: '' });
            setShowForm(false);
            fetchReimbursements();
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.message || 'Submission failed' });
        } finally {
            setSubmitting(false);
        }
    };
    const stats = [
        { label: 'Total Claims', value: reimbursements.length, icon: ReceiptText, color: 'blue' },
        { label: 'Pending', value: reimbursements.filter(r => r.status === 'pending').length, icon: Clock, color: 'amber' },
        { label: 'Approved', value: reimbursements.filter(r => r.status === 'approved').length, icon: CheckCircle2, color: 'emerald' },
    ];
    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"
            />
        </div>
    );
    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Reimbursements</h1>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">Manage and track your expense claims.</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/20"
                >
                    {showForm ? <XCircle size={20} /> : <Plus size={20} />}
                    {showForm ? 'Cancel Request' : 'New Claim'}
                </button>
            </header>
            {message.text && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-2xl border flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600'
                        }`}
                >
                    {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                    <p className="text-sm font-bold">{message.text}</p>
                </motion.div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm dark:shadow-none transition-all">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-2xl bg-${stat.color}-100/50 dark:bg-${stat.color}-900/30 text-${stat.color}-600 dark:text-${stat.color}-400`}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <div className="text-2xl font-black text-slate-900 dark:text-white leading-none">{stat.value}</div>
                                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">{stat.label}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-xl space-y-6">
                            <h2 className="text-xl font-black text-slate-900 dark:text-white">Submit New Expense Claim</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Expense Title</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g., Client Visit - Transport"
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Amount ($)</label>
                                    <input
                                        type="number"
                                        value={formData.amount}
                                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                        placeholder="0.00"
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold"
                                    >
                                        <option value="Travel">Travel</option>
                                        <option value="Food">Food</option>
                                        <option value="Office Supplies">Office Supplies</option>
                                        <option value="Medical">Medical</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold min-h-[100px] resize-none"
                                        placeholder="Details of the expense..."
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg"
                                >
                                    {submitting ? 'Submitting...' : (
                                        <>
                                            <Send size={18} />
                                            Submit Claim
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <h3 className="font-black text-slate-900 dark:text-white">Recent Claims</h3>
                    <button className="text-blue-600 text-xs font-bold uppercase tracking-widest hover:underline flex items-center gap-1">
                        <Filter size={14} />
                        Filter
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 dark:bg-slate-800/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-600 dark:text-slate-500 uppercase tracking-widest">Description</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-600 dark:text-slate-500 uppercase tracking-widest">Amount</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-600 dark:text-slate-500 uppercase tracking-widest">Category</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-600 dark:text-slate-500 uppercase tracking-widest">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {reimbursements.map((r) => (
                                <tr key={r._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-900 dark:text-white">{r.title}</div>
                                        <div className="text-[10px] text-slate-500 font-medium">{new Date(r.createdAt).toLocaleDateString()}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-black text-slate-900 dark:text-white">${r.amount.toFixed(2)}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                            {r.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={`flex items-center gap-1.5 text-xs font-black ${r.status === 'approved' ? 'text-emerald-600' : r.status === 'rejected' ? 'text-rose-600' : 'text-amber-600'
                                            }`}>
                                            {r.status === 'approved' ? <CheckCircle2 size={14} /> : r.status === 'rejected' ? <XCircle size={14} /> : <Clock size={14} />}
                                            <span className="uppercase tracking-widest">{r.status}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {reimbursements.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-20 text-center text-slate-500 font-medium">
                                        No reimbursement claims found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
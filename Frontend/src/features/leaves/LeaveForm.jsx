import { useState } from 'react';
import api from '../../services/api';
import { Send, Calendar, Clock, AlertCircle } from 'lucide-react';

export const LeaveForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        leaveType: 'Sick',
        reason: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await api.post('/leaves', formData);
            setFormData({ startDate: '', endDate: '', leaveType: 'Sick', reason: '' });
            if (onSuccess) onSuccess();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit leave request');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm dark:shadow-none">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Request Leave</h2>

            {error && (
                <div className="bg-red-900/20 border border-red-900 text-red-400 p-3 rounded-lg text-sm flex items-center gap-2">
                    <AlertCircle size={16} />
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Start Date</label>
                    <input
                        type="date"
                        value={formData.startDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value, endDate: '' })}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">End Date</label>
                    <input
                        type="date"
                        value={formData.endDate}
                        min={formData.startDate || new Date().toISOString().split('T')[0]}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        required
                    />
                </div>
            </div>


            <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Leave Type</label>
                <select
                    value={formData.leaveType}
                    onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="Sick">Sick Leave</option>
                    <option value="Casual">Casual Leave</option>
                    <option value="Earned">Earned Leave</option>
                    <option value="Maternity">Maternity Leave</option>
                    <option value="Paternity">Paternity Leave</option>
                    <option value="Loss of Pay">Loss of Pay</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Reason</label>
                <textarea
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                    placeholder="Briefly explain the reason for your leave..."
                    required
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
            >
                <Send size={18} />
                {loading ? 'Submitting...' : 'Submit Request'}
            </button>
        </form>
    );
};

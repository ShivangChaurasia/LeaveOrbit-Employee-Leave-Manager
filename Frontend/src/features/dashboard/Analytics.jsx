import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';
export const Analytics = () => {
    const { user } = useAuth();
    const [data, setData] = useState({
        trends: [],
        ratios: [],
        reimbursements: []
    });
    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                let leaveEndpoint = '/leaves/my';
                if (user.role === 'admin') leaveEndpoint = '/leaves/all';
                else if (user.role === 'manager') leaveEndpoint = '/leaves/department';
                const leaveResponse = await api.get(leaveEndpoint);
                const leaves = leaveResponse.data.data.leaves;
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const trends = months.map(m => ({ name: m, count: 0 }));
                leaves.forEach(l => {
                    const month = new Date(l.startDate).getMonth();
                    trends[month].count++;
                });
                const approved = leaves.filter(l => l.status === 'approved').length;
                const rejected = leaves.filter(l => l.status === 'rejected').length;
                const pending = leaves.filter(l => l.status === 'pending').length;
                const ratios = [
                    { name: 'Approved', value: approved, color: '#10b981' },
                    { name: 'Rejected', value: rejected, color: '#f43f5e' },
                    { name: 'Pending', value: pending, color: '#f59e0b' },
                ];
                let reimbursementData = [];
                if (user.role === 'admin') {
                    const reimbResponse = await api.get('/reimbursements/all');
                    const reimbs = reimbResponse.data.data.reimbursements;
                    const categories = ['Travel', 'Food', 'Office Supplies', 'Medical', 'Other'];
                    reimbursementData = categories.map(cat => ({
                        name: cat,
                        value: reimbs.filter(r => r.category === cat).reduce((sum, r) => sum + r.amount, 0)
                    }));
                }
                setData({ trends, ratios, reimbursements: reimbursementData });
            } catch (error) {
                console.error('Failed to fetch analytics', error);
            }
        };
        fetchAnalytics();
    }, [user.role]);
    const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#10b981'];
    return (
        <div className="space-y-8 pb-12">
            <header>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">System Analytics</h1>
                <p className="text-slate-500 font-medium">Visualization of {user.role === 'admin' ? 'organization' : 'personal'} productivity and expenses.</p>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl h-[450px] shadow-sm">
                    <h2 className="text-lg font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-[10px] bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full w-fit">Monthly Trends</h2>
                    <ResponsiveContainer width="100%" height="85%">
                        <BarChart data={data.trends}>
                            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                            <XAxis dataKey="name" fontSize={12} stroke="#64748b" axisLine={false} tickLine={false} />
                            <YAxis fontSize={12} stroke="#64748b" axisLine={false} tickLine={false} />
                            <Tooltip
                                cursor={{ fill: '#3b82f610' }}
                                contentStyle={{
                                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: '#fff'
                                }}
                            />
                            <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={32} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                {}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl h-[450px] shadow-sm">
                    <h2 className="text-lg font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-[10px] bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full w-fit">Decision Ratios</h2>
                    <ResponsiveContainer width="100%" height="75%">
                        <PieChart>
                            <Pie
                                data={data.ratios}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={110}
                                paddingAngle={8}
                                dataKey="value"
                            >
                                {data.ratios.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                {user.role === 'admin' && (
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl h-[450px] shadow-sm lg:col-span-2">
                        <h2 className="text-lg font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-[10px] bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full w-fit">Financial Distribution</h2>
                        <ResponsiveContainer width="100%" height="85%">
                            <BarChart data={data.reimbursements}>
                                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                                <XAxis dataKey="name" fontSize={12} stroke="#64748b" axisLine={false} tickLine={false} />
                                <YAxis fontSize={12} stroke="#64748b" axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Bar dataKey="value" name="Amount ($)" radius={[6, 6, 0, 0]} barSize={60}>
                                    {data.reimbursements.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
};
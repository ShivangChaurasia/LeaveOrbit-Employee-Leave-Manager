import { useEffect, useState } from 'react';
import api from '../../services/api';
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
    Cell
} from 'recharts';

export const Analytics = () => {
    const [data, setData] = useState({
        trends: [],
        ratios: []
    });

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await api.get('/leaves'); // In real app, separate analytics endpoint
                const leaves = response.data.data.leaves;

                // Process for trends (by month)
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const trends = months.map(m => ({ name: m, count: 0 }));
                leaves.forEach(l => {
                    const month = new Date(l.startDate).getMonth();
                    trends[month].count++;
                });

                // Process for ratios (status)
                const approved = leaves.filter(l => l.status === 'approved').length;
                const rejected = leaves.filter(l => l.status === 'rejected').length;
                const pending = leaves.filter(l => l.status === 'pending').length;

                const ratios = [
                    { name: 'Approved', value: approved, color: '#10b981' },
                    { name: 'Rejected', value: rejected, color: '#f43f5e' },
                    { name: 'Pending', value: pending, color: '#f59e0b' },
                ];

                setData({ trends, ratios });
            } catch (error) {
                console.error('Failed to fetch analytics', error);
            }
        };
        fetchAnalytics();
    }, []);

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Analytics</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl h-[400px] shadow-sm dark:shadow-none">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Monthly Leave Trends</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data.trends}>
                            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-100 dark:text-slate-800" />
                            <XAxis dataKey="name" stroke="#64748b" />
                            <YAxis stroke="#64748b" />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'var(--tooltip-bg, #fff)', border: '1px solid #1e293b' }}
                                itemStyle={{ color: 'var(--tooltip-text, #0f172a)' }}
                            />
                            <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl h-[400px] shadow-sm dark:shadow-none">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Approval Status Ratio</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data.ratios}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={120}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.ratios.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: 'var(--tooltip-bg)', border: '1px solid #1e293b' }}
                                itemStyle={{ color: 'var(--tooltip-text)' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-6 mt-4">
                        {data.ratios.map(r => (
                            <div key={r.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: r.color }}></div>
                                <span className="text-sm text-slate-400">{r.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

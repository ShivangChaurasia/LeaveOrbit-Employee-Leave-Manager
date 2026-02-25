import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, Clock, Calendar, ShieldCheck, TrendingUp, Bell, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const RoleHome = () => {
    const { user } = useAuth();

    const getRoleContent = () => {
        switch (user?.role) {
            case 'admin':
                return {
                    title: 'System Administration Hub',
                    subtitle: 'Manage organizational structure and system-wide compliance.',
                    features: [
                        { icon: Users, title: 'User Management', desc: 'Manage roles and access control across all departments.' },
                        { icon: ShieldCheck, title: 'Compliance Audit', desc: 'Review high-level leave trends and structural integrity.' },
                        { icon: TrendingUp, title: 'System Analytics', desc: 'Real-time monitoring of organization-wide attendance.' }
                    ]
                };
            case 'manager':
                return {
                    title: 'Department Management Overview',
                    subtitle: 'Optimizing team availability and coordinating time-off approvals.',
                    features: [
                        { icon: Calendar, title: 'Team Availability', desc: 'Visual overview of your department\'s upcoming leave schedule.' },
                        { icon: LayoutDashboard, title: 'Approval Queue', desc: 'Streamlined interface for processing pending leave requests.' },
                        { icon: Users, title: 'Capacity Planning', desc: 'Ensure department coverage remains optimal during peak seasons.' }
                    ]
                };
            default: // employee
                return {
                    title: 'Employee Self-Service Portal',
                    subtitle: 'Quick access to your leave benefits and personal attendance records.',
                    features: [
                        { icon: Clock, title: 'Leave Summary', desc: 'Real-time view of your current leave balances and history.' },
                        { icon: Calendar, title: 'Personal Schedule', desc: 'Track your upcoming time-off and status updates.' },
                        { icon: Bell, title: 'Status Alerts', desc: 'Instant notifications on the progress of your requests.' }
                    ]
                };
        }
    };

    const content = getRoleContent();

    return (
        <div className="min-h-[calc(100vh-64px)] bg-transparent text-slate-900 dark:text-slate-200 font-inter">
            {/* Hero Section */}
            <section className="relative pt-16 pb-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                            {content.title}
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-2xl">
                            {content.subtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Link
                                to="/dashboard"
                                className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all flex items-center gap-3 shadow-lg active:scale-95"
                            >
                                <LayoutDashboard size={18} />
                                Open Workspace
                            </Link>
                            <Link
                                to={user.role === 'admin' ? '/users' : '/leaves'}
                                className="px-8 py-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold transition-all active:scale-95"
                            >
                                {user.role === 'admin' ? 'Employee Directory' : 'My Schedule'}
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Role Features */}
            <section className="py-20 bg-slate-100/50 dark:bg-slate-900/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {content.features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-600 mb-6 font-bold">
                                    <feature.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 italic">{feature.desc}</p>
                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                    <CheckCircle2 size={12} className="text-blue-600" />
                                    Active Platform Module
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

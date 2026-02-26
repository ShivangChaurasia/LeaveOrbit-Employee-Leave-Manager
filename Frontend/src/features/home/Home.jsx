import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import logoData from '../../Assets/logo.json';
import { useAuth } from '../../context/AuthContext';
import {
    CalendarDays,
    BarChart3,
    Wallet,
    ShieldCheck,
    Zap,
    Clock,
    ArrowRight,
    Github,
    Linkedin,
    Mail,
    Twitter,
    Globe,
    ExternalLink,
    CheckCircle2
} from 'lucide-react';
import HeroAnimation from '../../components/HeroAnimation';
import { motion } from 'framer-motion';
export const Home = () => {
    const { user } = useAuth();
    const features = [
        {
            title: 'Intelligent Planning',
            description: 'Smart overlap detection and conflict prevention for seamless scheduling.',
            icon: CalendarDays,
            color: 'blue'
        },
        {
            title: 'Actionable Insights',
            description: 'Real-time attendance trends and leave utilization reports at a glance.',
            icon: BarChart3,
            color: 'emerald'
        },
        {
            title: 'Enterprise Security',
            description: 'Bank-level encryption and role-based access control for your data.',
            icon: ShieldCheck,
            color: 'violet'
        },
        {
            title: 'Blazing Fast',
            description: 'Optimized workflow that saves hours of administrative overhead weekly.',
            icon: Zap,
            color: 'amber'
        }
    ];
    return (
        <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-200 transition-colors duration-500">
            {}
            <section className="relative pt-20 pb-32 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] bg-gradient-to-b from-blue-600/20 via-blue-900/5 to-transparent pointer-events-none" />
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute top-1/2 -right-24 w-80 h-80 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex-1 text-center lg:text-left"
                        >
                            <h1 className="text-4xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                                Intelligent Leave Management System
                            </h1>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl leading-relaxed">
                                A professional-grade platform for tracking attendance, managing leave requests, and ensuring organizational compliance through automated workflows.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
                                <Link
                                    to={user ? "/dashboard" : "/register"}
                                    className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all flex items-center gap-3 shadow-lg active:scale-95"
                                >
                                    Access Dashboard
                                    <ArrowRight size={18} />
                                </Link>
                                <Link
                                    to="/login"
                                    className="px-8 py-4 rounded-xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold transition-all backdrop-blur-md active:scale-95"
                                >
                                    Login
                                </Link>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="flex-1 relative lg:w-1/2"
                        >
                            <div className="relative z-10 w-full aspect-square max-w-2xl mx-auto">
                                <HeroAnimation />
                            </div>
                            {}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-blue-500/5 rounded-full animate-pulse-slow pointer-events-none" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-indigo-500/5 rounded-full animate-pulse-slow delay-700 pointer-events-none" />
                        </motion.div>
                    </div>
                </div>
            </section>
            {}
            <section className="py-32 relative bg-slate-900/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">Core Functionality</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg">LeaveOrbit is built with a focus on administrative efficiency and organizational transparency.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="group p-8 rounded-[32px] bg-slate-900/50 border border-slate-800/50 hover:border-blue-500/30 hover:bg-slate-900 transition-all duration-500 relative overflow-hidden"
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-${feature.color}-600/10 flex items-center justify-center text-${feature.color}-400 mb-8 group-hover:scale-110 transition-transform relative z-10`}>
                                    <feature.icon size={26} />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors">{feature.title}</h3>
                                <p className="text-sm text-slate-300 leading-relaxed font-medium mb-6 opacity-90">{feature.description}</p>
                                <ul className="space-y-2">
                                    {['System Sync', 'Direct Approvals'].map(item => (
                                        <li key={item} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                            <CheckCircle2 size={12} className="text-blue-500" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

    const stats = [
        { label: 'Active Users', value: '2,500+' },
        { label: 'Leaves Managed', value: '50,000+' },
        { label: 'Avg Approval Time', value: '< 2 Hours' },
        { label: 'Customer Rating', value: '4.9/5' }
    ];

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
        <div className="min-h-screen bg-transparent text-slate-200 selection:bg-blue-500/30">

            {/* Hero Section */}
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
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest mb-8">
                                <Zap size={14} className="fill-current" />
                                Next-Gen Workforce Management
                            </div>
                            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
                                Manage time, <br />
                                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                                    Not paperwork.
                                </span>
                            </h1>
                            <p className="text-xl text-slate-400 mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                                LeaveOrbit streamlines the entire employee leave cycle — from request to approval. Pure, simple, and light years ahead. 🚀
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
                                <Link
                                    to={user ? "/dashboard" : "/register"}
                                    className="px-10 py-5 rounded-2xl bg-blue-600 hover:bg-shadow-blue text-white font-black transition-all flex items-center gap-3 shadow-2xl shadow-blue-600/40 group active:scale-95"
                                >
                                    Get Started Free
                                    <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
                                </Link>
                                <Link
                                    to="/login"
                                    className="px-10 py-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:bg-slate-800 text-white font-black transition-all backdrop-blur-md active:scale-95"
                                >
                                    Live Demo
                                </Link>
                            </div>

                            <div className="mt-16 pt-16 border-t border-slate-900 flex flex-wrap items-center gap-12 justify-center lg:justify-start">
                                {stats.map((stat) => (
                                    <div key={stat.label} className="group">
                                        <div className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">{stat.value}</div>
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{stat.label}</div>
                                    </div>
                                ))}
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
                            {/* Decorative Elements */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-blue-500/5 rounded-full animate-pulse-slow pointer-events-none" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-indigo-500/5 rounded-full animate-pulse-slow delay-700 pointer-events-none" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Showcase */}
            <section className="py-32 relative bg-slate-900/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-24">
                        <span className="text-blue-500 font-black tracking-widest uppercase text-xs">Capabilities</span>
                        <h2 className="text-4xl lg:text-6xl font-black text-white mt-4 mb-8 tracking-tighter italic">Designed for high-performance teams.</h2>
                        <p className="text-slate-400 text-lg font-medium leading-relaxed">Everything you need to manage time off in one unified orbit.</p>
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
                                <h3 className="text-xl font-bold text-white mb-4 tracking-tight group-hover:text-blue-400 transition-colors">{feature.title}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed font-medium mb-6 opacity-80">{feature.description}</p>
                                <ul className="space-y-3">
                                    {['Real-time sync', 'Auto-scheduling'].map(item => (
                                        <li key={item} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
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

            {/* CTA Section */}
            <section className="py-32 relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-4 relative z-10">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[48px] p-12 lg:p-24 text-center relative overflow-hidden shadow-2xl shadow-blue-600/20">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full -translate-y-12 translate-x-12" />
                        <h2 className="text-4xl lg:text-7xl font-black text-white mb-8 tracking-tighter leading-none">Ready to orbit with us?</h2>
                        <p className="text-blue-100 text-lg mb-12 max-w-2xl mx-auto font-medium opacity-90">Join 2,500+ teams who have simplified their leave management forever.</p>
                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                            <Link to="/register" className="px-12 py-5 bg-white text-blue-600 font-black rounded-2xl hover:bg-slate-50 transition-all shadow-xl active:scale-95">Get Started Now</Link>
                            <Link to="/login" className="px-12 py-5 bg-blue-700/30 text-white font-black rounded-2xl border border-white/20 hover:bg-blue-700/50 transition-all backdrop-blur-sm active:scale-95">Contact Sales</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="pt-32 pb-12 bg-slate-950 border-t border-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                        <div className="col-span-1 lg:col-span-1">
                            <Link to="/" className="flex items-center gap-3 mb-8 group">
                                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black transition-transform group-hover:rotate-12">L</div>
                                <span className="text-2xl font-black tracking-tighter text-white">LEAVEOBIT</span>
                            </Link>
                            <p className="text-slate-400 font-medium leading-relaxed mb-8">
                                Redefining the way modern teams manage time and productivity. Simple, fast, and automated.
                            </p>
                            <div className="flex items-center gap-4">
                                {[Github, Twitter, Linkedin, Globe].map((Icon, i) => (
                                    <a key={i} href="#" className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-all">
                                        <Icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Product</h4>
                            <ul className="space-y-4">
                                {['Features', 'Integrations', 'Pricing', 'Changelog', 'Roadmap'].map(item => (
                                    <li key={item}><a href="#" className="text-slate-500 hover:text-blue-400 font-bold transition-colors">{item}</a></li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Resources</h4>
                            <ul className="space-y-4">
                                {['Documentation', 'API Reference', 'Community', 'Support', 'Status'].map(item => (
                                    <li key={item}><a href="#" className="text-slate-500 hover:text-blue-400 font-bold transition-colors">{item}</a></li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Newsletter</h4>
                            <p className="text-slate-400 text-sm font-medium mb-6">Get the latest updates directly in your inbox.</p>
                            <form className="relative">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 px-6 text-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                                />
                                <button className="absolute right-2 top-2 p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-all">
                                    <ArrowRight size={20} />
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="text-slate-500 text-sm font-bold">
                            © 2026 LeaveOrbit. Built with <span className="text-rose-500">❤️</span> for modern teams.
                        </div>
                        <div className="flex items-center gap-8">
                            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-black uppercase tracking-widest">Privacy</a>
                            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-black uppercase tracking-widest">Terms</a>
                            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-black uppercase tracking-widest">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

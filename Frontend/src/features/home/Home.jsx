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
    Linkedin
} from 'lucide-react';
import HeroAnimation from '../../components/HeroAnimation';
import { motion } from 'framer-motion';

export const Home = () => {
    const { user } = useAuth();

    const stats = [
        { label: 'Active Users', value: '2,500+' },
        { label: 'Leaves Managed', value: '50,000+' },
        { label: 'Uptime', value: '99.99%' },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-blue-600/10 via-transparent to-transparent pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex-1 text-center lg:text-left"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
                                <Zap size={14} className="animate-pulse" />
                                Faster Leave Approvals
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter text-white mb-6 leading-[1.1]">
                                Management made <br />
                                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                                    Simpler.
                                </span>
                            </h1>
                            <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                                LeaveOrbit streamlines your employee leave cycle — from request to approval. Pure, simple, and lightning fast. 🚀
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                                <Link
                                    to={user ? "/dashboard" : "/register"}
                                    className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 group"
                                >
                                    Get Started Free
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    to="/login"
                                    className="px-8 py-4 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white font-bold transition-all"
                                >
                                    Sign In
                                </Link>
                            </div>

                            <div className="mt-12 flex items-center gap-8 justify-center lg:justify-start opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                                {stats.map((stat) => (stat &&
                                    <div key={stat.label}>
                                        <div className="text-xl font-black text-white">{stat.value}</div>
                                        <div className="text-xs font-bold uppercase tracking-widest text-slate-500">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="flex-1 relative"
                        >
                            <div className="absolute w-[80%] h-[80%] bg-blue-500/20 blur-[100px] rounded-full animate-pulse pointer-events-none" />
                            <div className="absolute w-[50%] h-[50%] bg-indigo-500/30 blur-[80px] rounded-full pointer-events-none" />

                            <HeroAnimation />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 relative bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl lg:text-5xl font-black text-white mb-6 tracking-tight">Built for modern teams</h2>
                        <p className="text-slate-400 font-medium">Why companies choose LeaveOrbit to manage their most valuable asset.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Card 1: Intelligent Planning */}
                        <div className="group p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all duration-500">
                            <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform overflow-hidden relative">
                                <div className="absolute inset-0 bg-blue-500/10 animate-pulse" />
                                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-blue-500 overflow-hidden">
                                    <div className="w-full h-full bg-white/50 animate-shimmer-fast" />
                                </div>
                                <CalendarDays className="relative z-10" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Intelligent Planning</h3>
                            <p className="text-sm text-slate-400 leading-relaxed font-medium">Smart overlap detection and conflict prevention for seamless scheduling.</p>
                        </div>

                        {/* Card 2: Deep Analytics */}
                        <div className="group p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all duration-500">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-600/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform overflow-hidden relative">
                                <div className="absolute inset-x-2 bottom-2 top-2 flex items-end gap-[2px]">
                                    <div className="w-full bg-emerald-500/60 transition-all animate-grow-up-1 h-[40%]" />
                                    <div className="w-full bg-emerald-500/60 transition-all animate-grow-up-2 h-[75%]" />
                                    <div className="w-full bg-emerald-500/60 transition-all animate-grow-up-3 h-[55%]" />
                                </div>
                                <BarChart3 className="relative z-10 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Actionable Insights</h3>
                            <p className="text-sm text-slate-400 leading-relaxed font-medium">Real-time attendance trends and leave utilization reports at a glance.</p>
                        </div>

                        {/* Card 3: Enterprise Security */}
                        <div className="group p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-violet-500/50 transition-all duration-500">
                            <div className="w-14 h-14 rounded-2xl bg-violet-600/10 flex items-center justify-center text-violet-400 mb-6 group-hover:scale-110 transition-transform overflow-hidden relative">
                                <div className="absolute inset-0 border-[2px] border-violet-500/20 rounded-full animate-ping-slow" />
                                <div className="absolute inset-0 border-[2px] border-violet-500/10 rounded-full animate-ping-slow delay-700" />
                                <ShieldCheck className="relative z-10" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Enterprise Grade</h3>
                            <p className="text-sm text-slate-400 leading-relaxed font-medium">Bank-level encryption and role-based access control for your data.</p>
                        </div>

                        {/* Card 4: Lightning Speed */}
                        <div className="group p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all duration-500">
                            <div className="w-14 h-14 rounded-2xl bg-amber-600/10 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform overflow-hidden relative">
                                <div className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent top-4 animate-slide-right scale-x-150" />
                                <div className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent bottom-4 animate-slide-right-slow scale-x-150" />
                                <Zap className="relative z-10" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Blazing Fast</h3>
                            <p className="text-sm text-slate-400 leading-relaxed font-medium">Optimized workflow that saves hours of administrative overhead weekly.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-black">L</div>
                        <span className="font-black tracking-tighter text-white">LEAVEOBIT</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <a href="mailto:shiva17ng@gmail.com" className="text-slate-400 hover:text-white transition-colors"><Mail size={20} /></a>
                        <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github size={20} /></a>
                        <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
                    </div>
                    <div className="text-slate-500 text-sm font-medium">
                        © 2026 LeaveOrbit. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

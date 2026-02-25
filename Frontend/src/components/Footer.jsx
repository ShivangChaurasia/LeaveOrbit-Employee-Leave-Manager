import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import logoData from '../Assets/logo.json';
import { Github, Linkedin, Mail, Twitter, ExternalLink } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="py-16 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 lg:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-6 group">
                            <div className="w-8 h-8 flex items-center justify-center transition-transform group-hover:scale-105">
                                <Lottie animationData={logoData} loop={true} className="w-full h-full" />
                            </div>
                            <span className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">LeaveOrbit</span>
                        </Link>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-6">
                            Simplifying time-off management for modern high-performance teams with intelligent workflows and real-time insights.
                        </p>
                        <div className="flex items-center gap-3">
                            <a href="https://github.com/ShivangChaurasia" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/30 transition-all">
                                <Github size={18} />
                            </a>
                            <a href="https://www.linkedin.com/in/shivang-chaurasia-754232297/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/30 transition-all">
                                <Linkedin size={18} />
                            </a>
                            <a href="mailto:shiva17ng@gmail.com" className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/30 transition-all">
                                <Mail size={18} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-slate-900 dark:text-white font-bold uppercase tracking-widest text-[10px] mb-6">Platform</h4>
                        <ul className="space-y-3">
                            {['Dashboard', 'Analytics', 'Leave Requests', 'Reimbursements'].map(item => (
                                <li key={item}><Link to="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-xs font-semibold transition-colors">{item}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-slate-900 dark:text-white font-bold uppercase tracking-widest text-[10px] mb-6">Resources</h4>
                        <ul className="space-y-3">
                            {['Documentation', 'Help Center', 'API Status', 'Security'].map(item => (
                                <li key={item}><Link to="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-xs font-semibold transition-colors">{item}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-slate-900 dark:text-white font-bold uppercase tracking-widest text-[10px] mb-6">Legal</h4>
                        <ul className="space-y-3">
                            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility'].map(item => (
                                <li key={item}><Link to="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-xs font-semibold transition-colors">{item}</Link></li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                        © 2026 LeaveOrbit. All rights reserved.
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                            Status: <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Operational
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

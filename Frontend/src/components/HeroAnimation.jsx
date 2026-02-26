import { motion } from 'framer-motion';
const HeroAnimation = () => {
    return (
        <div className="relative w-full max-w-lg mx-auto select-none">
            <svg
                viewBox="0 0 480 380"
                fill="none"
                xmlns="http:
                className="w-full h-auto"
            >
                {}
                <defs>
                    <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="screenGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="deskGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#334155" />
                        <stop offset="100%" stopColor="#1E293B" />
                    </linearGradient>
                    <linearGradient id="monitorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#1E293B" />
                        <stop offset="100%" stopColor="#0F172A" />
                    </linearGradient>
                    <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0F172A" />
                        <stop offset="100%" stopColor="#1E3A5F" />
                    </linearGradient>
                    <linearGradient id="barBlue" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#60A5FA" />
                    </linearGradient>
                    <linearGradient id="barGreen" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#10B981" />
                        <stop offset="100%" stopColor="#34D399" />
                    </linearGradient>
                    <linearGradient id="barPurple" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#A78BFA" />
                    </linearGradient>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000" floodOpacity="0.3" />
                    </filter>
                </defs>
                {}
                <ellipse cx="240" cy="190" rx="200" ry="170" fill="url(#bgGlow)" />
                {}
                <rect x="60" y="280" width="360" height="18" rx="4" fill="url(#deskGrad)" />
                <rect x="80" y="298" width="20" height="60" rx="3" fill="#1E293B" />
                <rect x="380" y="298" width="20" height="60" rx="3" fill="#1E293B" />
                {}
                <rect x="210" y="268" width="60" height="14" rx="3" fill="#334155" />
                <rect x="220" y="258" width="40" height="12" rx="2" fill="#1E293B" />
                {}
                <rect x="100" y="90" width="280" height="180" rx="12" fill="url(#monitorGrad)" filter="url(#shadow)" />
                <rect x="108" y="98" width="264" height="164" rx="8" fill="url(#screenGrad)" />
                {}
                <ellipse cx="240" cy="180" rx="80" ry="60" fill="url(#screenGlow)" />
                {}
                <rect x="116" y="106" width="248" height="22" rx="4" fill="#1E3A5F" />
                <circle cx="128" cy="117" r="4" fill="#EF4444" />
                <circle cx="142" cy="117" r="4" fill="#F59E0B" />
                <circle cx="156" cy="117" r="4" fill="#10B981" />
                <rect x="175" y="112" width="80" height="10" rx="2" fill="#334155" />
                <rect x="330" y="112" width="26" height="10" rx="2" fill="#3B82F6" />
                {}
                <rect x="116" y="128" width="48" height="128" rx="2" fill="#0F172A" opacity="0.8" />
                <circle cx="140" cy="144" r="10" fill="#3B82F6" opacity="0.9" />
                <rect x="128" y="162" width="24" height="4" rx="2" fill="#334155" />
                <rect x="128" y="172" width="24" height="4" rx="2" fill="#1E3A5F" />
                <rect x="128" y="196" width="24" height="4" rx="2" fill="#334155" />
                <rect x="128" y="210" width="24" height="4" rx="2" fill="#334155" />
                <rect x="128" y="224" width="24" height="4" rx="2" fill="#334155" />
                {}
                <rect x="172" y="130" width="52" height="32" rx="4" fill="#1E3A5F" />
                <rect x="178" y="135" width="20" height="4" rx="2" fill="#334155" />
                <rect x="178" y="143" width="36" height="8" rx="2" fill="#60A5FA" />
                <rect x="178" y="153" width="24" height="3" rx="1.5" fill="#334155" opacity="0.6" />
                <rect x="228" y="130" width="52" height="32" rx="4" fill="#1E3A5F" />
                <rect x="234" y="135" width="20" height="4" rx="2" fill="#334155" />
                <rect x="234" y="143" width="36" height="8" rx="2" fill="#34D399" />
                <rect x="234" y="153" width="24" height="3" rx="1.5" fill="#334155" opacity="0.6" />
                <rect x="284" y="130" width="52" height="32" rx="4" fill="#1E3A5F" />
                <rect x="290" y="135" width="20" height="4" rx="2" fill="#334155" />
                <rect x="290" y="143" width="36" height="8" rx="2" fill="#A78BFA" />
                <rect x="290" y="153" width="24" height="3" rx="1.5" fill="#334155" opacity="0.6" />
                {}
                <rect x="172" y="170" width="164" height="80" rx="4" fill="#0F172A" opacity="0.8" />
                <rect x="180" y="175" width="60" height="6" rx="2" fill="#334155" />
                {}
                <line x1="180" y1="218" x2="328" y2="218" stroke="#1E3A5F" strokeWidth="1" />
                <line x1="180" y1="207" x2="328" y2="207" stroke="#1E3A5F" strokeWidth="1" />
                <line x1="180" y1="196" x2="328" y2="196" stroke="#1E3A5F" strokeWidth="1" />
                {}
                <rect x="190" y="198" width="14" height="20" rx="2" fill="url(#barBlue)" opacity="0.3" />
                <rect x="210" y="194" width="14" height="24" rx="2" fill="url(#barGreen)" opacity="0.3" />
                <rect x="230" y="186" width="14" height="32" rx="2" fill="url(#barPurple)" opacity="0.3" />
                <rect x="250" y="200" width="14" height="18" rx="2" fill="url(#barBlue)" opacity="0.3" />
                <rect x="270" y="192" width="14" height="26" rx="2" fill="url(#barGreen)" opacity="0.3" />
                <rect x="290" y="200" width="14" height="18" rx="2" fill="url(#barPurple)" opacity="0.3" />
                <rect x="310" y="188" width="14" height="30" rx="2" fill="url(#barBlue)" opacity="0.3" />
                {}
                <rect x="150" y="290" width="180" height="12" rx="3" fill="#334155" />
                <rect x="155" y="292" width="170" height="8" rx="2" fill="#1E293B" />
                {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                    <rect key={i} x={158 + i * 19} y="293.5" width="14" height="5" rx="1" fill="#334155" />
                ))}
            </svg>
            {}
            <motion.div
                className="absolute"
                style={{ left: '42%', top: '63.5%', width: '2.9%', transformOrigin: 'bottom' }}
            >
                <motion.div
                    animate={{ scaleY: [0.3, 1, 0.6, 1, 0.3], opacity: [0.6, 1, 0.8, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="h-5 w-full rounded-sm bg-blue-500"
                    style={{ transformOrigin: 'bottom' }}
                />
            </motion.div>
            <motion.div
                className="absolute"
                style={{ left: '46.2%', top: '61%', width: '2.9%' }}
            >
                <motion.div
                    animate={{ scaleY: [0.4, 0.8, 1, 0.8, 0.4], opacity: [0.6, 1, 0.8, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="h-6 w-full rounded-sm bg-emerald-500"
                    style={{ transformOrigin: 'bottom' }}
                />
            </motion.div>
            <motion.div
                className="absolute"
                style={{ left: '50.4%', top: '57%', width: '2.9%' }}
            >
                <motion.div
                    animate={{ scaleY: [1, 0.5, 0.9, 0.6, 1], opacity: [1, 0.6, 0.9, 0.7, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="h-8 w-full rounded-sm bg-violet-500"
                    style={{ transformOrigin: 'bottom' }}
                />
            </motion.div>
            {}
            <motion.div
                animate={{ y: [-6, 6, -6], opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 right-0 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 shadow-2xl shadow-black/40 flex items-center gap-2"
                style={{ transform: 'translateX(20%)' }}
            >
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div>
                    <div className="text-white text-[9px] font-bold leading-none">Leave Approved!</div>
                    <div className="text-slate-400 text-[8px] mt-0.5">Rahul S. — 3 days</div>
                </div>
            </motion.div>
            {}
            <motion.div
                animate={{ y: [6, -6, 6], opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 left-0 bg-blue-600 rounded-xl px-3 py-2 shadow-2xl shadow-blue-600/40"
                style={{ transform: 'translateX(-20%)' }}
            >
                <div className="text-white/70 text-[8px] font-bold uppercase tracking-wider leading-none">Attendance</div>
                <div className="text-white text-sm font-black leading-none mt-0.5">94.7%</div>
            </motion.div>
            {}
            <motion.div
                animate={{ y: [-4, 4, -4], rotate: [-2, 2, -2] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-14 left-0 bg-violet-600 text-white text-[8px] font-bold rounded-full px-3 py-1 shadow-lg shadow-violet-600/40"
                style={{ transform: 'translateX(-10%)' }}
            >
                🚀 12 Pending
            </motion.div>
            {}
            <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "steps(1)" }}
                className="absolute bg-blue-400 rounded-sm"
                style={{ left: '56%', top: '40%', width: '1.5px', height: '10px' }}
            />
        </div>
    );
};
export default HeroAnimation;
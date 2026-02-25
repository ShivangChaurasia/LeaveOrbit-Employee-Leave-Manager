import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import {
    Moon,
    Sun,
    Bell,
    Shield,
    User,
    BadgeCheck,
    Save,
    Lock,
    AlertCircle,
    CheckCircle2,
    Eye,
    EyeOff
} from 'lucide-react';

export const Settings = () => {
    const { theme, toggleTheme } = useTheme();
    const { user, setUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Profile State
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        department: user?.department || '',
    });

    // Password State
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [showPasswords, setShowPasswords] = useState(false);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });
        try {
            const res = await api.patch('/users/profile', profileData);
            setUser({ ...user, ...res.data.data.user });
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.message || 'Update failed' });
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            return setMessage({ type: 'error', text: 'Passwords do not match' });
        }
        setLoading(true);
        setMessage({ type: '', text: '' });
        try {
            await api.post('/users/password', {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            });
            setMessage({ type: 'success', text: 'Password updated successfully!' });
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.message || 'Password update failed' });
        } finally {
            setLoading(false);
        }
    };

    const sections = [
        {
            title: 'Appearance',
            description: 'Customize how LeaveOrbit looks on your device.',
            icon: Sun,
            content: (
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-blue-900/30 flex items-center justify-center text-amber-600 dark:text-blue-400">
                            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                        </div>
                        <div>
                            <div className="text-sm font-bold text-slate-900 dark:text-white">Dark Mode</div>
                            <div className="text-xs text-slate-500 font-medium tracking-tight">Switch between light and dark themes</div>
                        </div>
                    </div>
                    <button
                        onClick={toggleTheme}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${theme === 'dark' ? 'bg-blue-600' : 'bg-slate-300'
                            }`}
                    >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                    </button>
                </div>
            )
        },
        {
            title: 'Profile Information',
            description: 'Update your display name and department.',
            icon: User,
            content: (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Display Name</label>
                            <input
                                type="text"
                                value={profileData.name}
                                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-4 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Department</label>
                            <input
                                type="text"
                                value={profileData.department}
                                onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-4 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20"
                        >
                            <Save size={16} />
                            Save Changes
                        </button>
                    </div>
                </form>
            )
        },
        {
            title: 'Security',
            description: 'Change your login password to keep your account safe.',
            icon: Shield,
            content: user?.provider !== 'local' ? (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900/50 flex items-center gap-3">
                    <AlertCircle className="text-blue-600 dark:text-blue-400" size={20} />
                    <p className="text-sm font-bold text-blue-900 dark:text-blue-300">Google accounts manage passwords through Google Settings.</p>
                </div>
            ) : (
                <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="relative">
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Current Password</label>
                        <input
                            type={showPasswords ? "text" : "password"}
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-4 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPasswords(!showPasswords)}
                            className="absolute right-4 bottom-2.5 text-slate-400 hover:text-blue-500"
                        >
                            {showPasswords ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">New Password</label>
                            <input
                                type={showPasswords ? "text" : "password"}
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-4 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                required
                                minLength={8}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Confirm New Password</label>
                            <input
                                type={showPasswords ? "text" : "password"}
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-4 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-50 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-xl"
                        >
                            <Lock size={16} />
                            Update Password
                        </button>
                    </div>
                </form>
            )
        }
    ];

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Account Settings</h1>
                <p className="text-slate-600 dark:text-slate-400 font-medium">Manage your profile, theme, and account security.</p>
            </header>

            {message.text && (
                <div className={`p-4 rounded-2xl border flex items-center gap-3 animate-in zoom-in-95 duration-300 ${message.type === 'success'
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-400'
                        : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-400'
                    }`}>
                    {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                    <p className="text-sm font-bold">{message.text}</p>
                </div>
            )}

            <div className="space-y-6 pb-20">
                {sections.map((section) => (
                    <div key={section.title} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm dark:shadow-none transition-all overflow-hidden relative">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-blue-600/10 rounded-xl text-blue-600 dark:text-blue-500">
                                <section.icon size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{section.title}</h2>
                                <p className="text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest">{section.description}</p>
                            </div>
                        </div>
                        {section.content}
                    </div>
                ))}

                <div className="bg-rose-500/5 border border-rose-500/10 rounded-3xl p-6">
                    <h3 className="text-rose-600 font-black mb-1">Danger Zone</h3>
                    <p className="text-xs font-bold text-rose-500/70 uppercase tracking-widest mb-4">Actions here are permanent and cannot be undone.</p>
                    <button className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-rose-600/20">
                        Deactivate Account
                    </button>
                </div>
            </div>
        </div>
    );
};

import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export const AppLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
            <Navbar />
            <main className="p-8">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};


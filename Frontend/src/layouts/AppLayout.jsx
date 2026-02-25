import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';

export const AppLayout = () => {
    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            <Sidebar />
            <main className="flex-1 p-8">
                <div className="max-w-6xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

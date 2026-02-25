import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export const PublicLayout = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200">
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

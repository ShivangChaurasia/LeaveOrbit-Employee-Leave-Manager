import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
export const PublicLayout = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-200 transition-colors duration-500">
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
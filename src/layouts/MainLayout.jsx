import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useScrollAnimation from '../hooks/useScrollAnimation';

const MainLayout = () => {
    useScrollAnimation();

    return (
        <div className="flex flex-col min-h-screen bg-body text-body-foreground" style={{ backgroundColor: 'var(--body-bg)', color: 'var(--body-text)' }}>
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;

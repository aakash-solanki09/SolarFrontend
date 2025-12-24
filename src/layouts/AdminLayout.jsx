import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';

const AdminLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-body text-body-foreground" style={{ backgroundColor: 'var(--body-bg)', color: 'var(--body-text)' }}>
            <AdminNavbar />
            <main className="flex-grow">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;

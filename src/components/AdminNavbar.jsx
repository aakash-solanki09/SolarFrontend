import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSiteConfig } from '../context/SiteConfigContext';
import api from '../utils/api';
import { Menu, X, Sun, LogOut, LayoutDashboard, Users, Package, MessageSquare, Bell, Mail, Settings } from 'lucide-react';

const AdminNavbar = () => {
    const { logout } = useAuth();
    const { siteConfig } = useSiteConfig();
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [showNotifications, setShowNotifications] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dropdownRef = useRef(null);

    const AdminNavLink = ({ to, icon: Icon, children }) => {
        const isActive = location.pathname === to || location.pathname.startsWith(to + '/');
        
        return (
            <Link 
                to={to} 
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors`}
                style={{ 
                    color: isActive ? 'var(--header-hover-text)' : 'inherit',
                    backgroundColor: isActive ? 'var(--header-hover-bg)' : 'transparent',
                    opacity: isActive ? 1 : 0.8
                }}
                onMouseEnter={(e) => {
                    if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'var(--header-hover-bg)';
                        e.currentTarget.style.color = 'var(--header-hover-text)';
                        e.currentTarget.style.opacity = '1';
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'inherit';
                        e.currentTarget.style.opacity = '0.8';
                    }
                }}
            >
                <Icon className="h-4 w-4 mr-2" /> {children}
            </Link>
        );
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const fetchNotifications = async () => {
        try {
            const res = await api.get('/api/notifications?limit=5');
            if (res.data.notifications) {
                setNotifications(res.data.notifications);
                setUnreadCount(res.data.unreadCount);
            } else {
                 setNotifications(res.data);
                 setUnreadCount(res.data.filter(n => !n.isRead).length);
            }
        } catch (error) {
            console.error("Error fetching notifications", error);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="bg-header shadow-md sticky top-0 z-50 text-header-foreground" style={{ backgroundColor: 'var(--header-bg)', color: 'var(--header-text)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/admin/dashboard" className="flex-shrink-0 flex items-center">
                            <Sun className="h-8 w-8 text-solar-500" />
                            <span className="ml-2 text-xl font-bold hidden sm:inline">{siteConfig?.appName || 'Solar'} Admin</span>
                            <span className="ml-2 text-xl font-bold sm:hidden">Admin</span>
                        </Link>
                    </div>

                    <div className="hidden xl:flex items-center space-x-6">
                        {/* Define a common class for hover effects */}
                        <AdminNavLink to="/admin/dashboard" icon={LayoutDashboard}>Dashboard</AdminNavLink>
                        <AdminNavLink to="/admin/products" icon={Package}>Products</AdminNavLink>
                        <AdminNavLink to="/admin/users" icon={Users}>Users</AdminNavLink>
                        <AdminNavLink to="/admin/inquiries" icon={Mail}>Inquiries</AdminNavLink>
                        <AdminNavLink to="/admin/chat" icon={MessageSquare}>Chat</AdminNavLink>
                        <AdminNavLink to="/admin/settings" icon={Settings}>Settings</AdminNavLink>

                        {/* Notification Bell */}
                        <div className="relative" ref={dropdownRef}>
                            <button 
                                onClick={() => setShowNotifications(!showNotifications)} 
                                className="p-2 relative rounded-full hover:bg-header-foreground/10 transition-colors"
                                style={{ color: 'inherit', opacity: 0.8 }}
                            >
                                <Bell className="h-5 w-5" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full border-2 border-gray-900">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {/* Dropdown */}
                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl py-1 z-50 ring-1 ring-black ring-opacity-5 overflow-hidden">
                                    {/* (Existing Notification Dropdown Content - usually handles its own internal styling well, keeping as is mostly but checking for glaring issues) */}
                                    <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                        <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
                                        <Link to="/admin/notifications" onClick={() => setShowNotifications(false)} className="text-xs text-blue-600 hover:text-blue-800 font-medium">View All</Link>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        {notifications.length === 0 ? (
                                            <div className="px-4 py-8 text-center text-gray-500 flex flex-col items-center">
                                                <Bell className="h-8 w-8 text-gray-300 mb-2" />
                                                <p className="text-sm">No notifications</p>
                                            </div>
                                        ) : (
                                            notifications.slice(0, 5).map(n => (
                                                <div key={n._id} className={`px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 cursor-pointer transition-colors ${!n.isRead ? 'bg-blue-50/50' : ''}`}>
                                                    <p className="text-sm text-gray-800 font-medium line-clamp-2">{n.message}</p>
                                                    {n.user && <p className="text-xs text-gray-500 mt-1 font-medium">{n.user.name} • {n.user.phone}</p>}
                                                    <p className="text-xs text-gray-400 mt-1">{new Date(n.createdAt).toLocaleDateString()} {new Date(n.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    {notifications.length > 5 && (
                                        <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 text-center">
                                             <Link to="/admin/notifications" onClick={() => setShowNotifications(false)} className="text-sm text-blue-600 hover:text-blue-800 font-medium block w-full">
                                                See All Notifications
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleLogout}
                            className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:text-red-600 transition-colors"
                            style={{ color: 'inherit', opacity: 0.8 }}
                        >
                            <LogOut className="h-5 w-5 mr-1" /> Logout
                        </button>
                    </div>

                    <div className="flex items-center xl:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="xl:hidden" style={{ backgroundColor: 'var(--header-bg)', color: 'var(--header-text)' }}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/admin/dashboard" className="block px-3 py-2 rounded-md text-base font-medium hover:opacity-100 hover:bg-header-foreground/10 transition-colors" style={{ color: 'inherit', opacity: 0.8 }}>Dashboard</Link>
                        <Link to="/admin/products" className="block px-3 py-2 rounded-md text-base font-medium hover:opacity-100 hover:bg-header-foreground/10 transition-colors" style={{ color: 'inherit', opacity: 0.8 }}>Products</Link>
                        <Link to="/admin/users" className="block px-3 py-2 rounded-md text-base font-medium hover:opacity-100 hover:bg-header-foreground/10 transition-colors" style={{ color: 'inherit', opacity: 0.8 }}>Users</Link>
                        <Link to="/admin/inquiries" className="block px-3 py-2 rounded-md text-base font-medium hover:opacity-100 hover:bg-header-foreground/10 transition-colors" style={{ color: 'inherit', opacity: 0.8 }}>Inquiries</Link>
                        <Link to="/admin/chat" className="block px-3 py-2 rounded-md text-base font-medium hover:opacity-100 hover:bg-header-foreground/10 transition-colors" style={{ color: 'inherit', opacity: 0.8 }}>Chat</Link>
                        <Link to="/admin/settings" className="block px-3 py-2 rounded-md text-base font-medium hover:opacity-100 hover:bg-header-foreground/10 transition-colors" style={{ color: 'inherit', opacity: 0.8 }}>Settings</Link>
                        <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">Logout</button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default AdminNavbar;

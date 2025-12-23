import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { Menu, X, Sun, LogOut, LayoutDashboard, Users, Package, MessageSquare, Bell, Mail } from 'lucide-react';

const AdminNavbar = () => {
    const { logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [showNotifications, setShowNotifications] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

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
        <nav className="bg-gray-900 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/admin/dashboard" className="flex-shrink-0 flex items-center">
                            <Sun className="h-8 w-8 text-solar-500" />
                            <span className="ml-2 text-xl font-bold text-white">Vishwamangal Solar Admin</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/admin/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                            <LayoutDashboard className="h-4 w-4 mr-2" /> Dashboard
                        </Link>
                        <Link to="/admin/products" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                            <Package className="h-4 w-4 mr-2" /> Products
                        </Link>
                        <Link to="/admin/users" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                            <Users className="h-4 w-4 mr-2" /> Users
                        </Link>
                        <Link to="/admin/inquiries" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                            <Mail className="h-4 w-4 mr-2" /> Inquiries
                        </Link>
                        <Link to="/admin/chat" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                            <MessageSquare className="h-4 w-4 mr-2" /> Chat
                        </Link>

                        {/* Notification Bell */}
                        <div className="relative" ref={dropdownRef}>
                            <button 
                                onClick={() => setShowNotifications(!showNotifications)} 
                                className="text-gray-300 hover:text-white p-2 relative rounded-full hover:bg-gray-800 transition-colors"
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
                            className="text-gray-300 hover:text-red-400 flex items-center px-3 py-2 rounded-md text-sm font-medium"
                        >
                            <LogOut className="h-5 w-5 mr-1" /> Logout
                        </button>
                    </div>

                    <div className="flex items-center md:hidden">
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
                <div className="md:hidden bg-gray-800">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/admin/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Dashboard</Link>
                        <Link to="/admin/products" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Products</Link>
                        <Link to="/admin/users" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Users</Link>
                        <Link to="/admin/inquiries" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Inquiries</Link>
                        <Link to="/admin/chat" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Chat</Link>
                        <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-gray-700">Logout</button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default AdminNavbar;

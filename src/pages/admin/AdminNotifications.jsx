import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Bell, Check, Trash2, User, MessageCircle, ShoppingBag, Mail, Eye, X } from 'lucide-react';
import { format } from 'date-fns';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';

const AdminNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedIds, setSelectedIds] = useState([]);
    const [viewNotification, setViewNotification] = useState(null);

    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [limit, setLimit] = useState(5);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchNotifications();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [page, keyword, limit]);

    const fetchNotifications = async () => {
        try {
            const res = await api.get(`/api/notifications?page=${page}&limit=${limit}&search=${keyword}`);
            if (res.data.notifications) {
                setNotifications(res.data.notifications);
                setPages(res.data.pages);
                setTotal(res.data.total);
            } else {
                 setNotifications(res.data);
            }
        } catch (error) {
            console.error("Error fetching notifications", error);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (id, e) => {
        if(e) e.stopPropagation();
        try {
            await api.put(`/api/notifications/${id}/read`);
            setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
        } catch (error) {
            console.error("Error marking as read", error);
        }
    };

    const handleMarkAllRead = async () => {
        try {
            await api.put('/api/notifications/read-all');
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        } catch (error) {
            console.error("Error marking all as read", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this notification?")) return;
        try {
            await api.delete(`/api/notifications/${id}`);
            fetchNotifications();
            setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
        } catch (error) {
            console.error("Error deleting notification", error);
            alert("Failed to delete notification");
        }
    };

    const handleBulkDelete = async () => {
        if (selectedIds.length === 0) return;
        if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} notifications?`)) return;

        try {
            await api.post('/api/notifications/delete-multiple', { ids: selectedIds });
            fetchNotifications();
            setSelectedIds([]);
        } catch (error) {
            console.error("Error deleting notifications", error);
            alert("Failed to delete notifications");
        }
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === notifications.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(notifications.map(n => n._id));
        }
    };

    const toggleSelect = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
        } else {
            setSelectedIds(prev => [...prev, id]);
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'REGISTER': return <User className="h-5 w-5 text-green-500" />;
            case 'INTEREST': return <ShoppingBag className="h-5 w-5 text-blue-500" />;
            case 'MESSAGE': return <MessageCircle className="h-5 w-5 text-purple-500" />;
            case 'CONTACT': return <Mail className="h-5 w-5 text-orange-500" />;
            default: return <Bell className="h-5 w-5 text-gray-500" />;
        }
    };

    const openViewModal = (notification) => {
        setViewNotification(notification);
        if (!notification.isRead) {
            handleMarkAsRead(notification._id);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                        <Bell className="mr-3 h-8 w-8 text-solar-600" />
                        Notifications
                    </h1>
                    <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
                         <SearchBar keyword={keyword} setKeyword={setKeyword} placeholder="Search Notifications..." />
                         {selectedIds.length > 0 && (
                            <button
                                onClick={handleBulkDelete}
                                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 shadow-sm transition-colors whitespace-nowrap"
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Selected ({selectedIds.length})
                            </button>
                        )}
                        <button
                            onClick={handleMarkAllRead}
                            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-colors whitespace-nowrap"
                        >
                            <Check className="mr-2 h-4 w-4" />
                            Mark all as read
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                    {loading ? (
                        <div className="p-12 text-center text-gray-500">Loading notifications...</div>
                    ) : notifications.length === 0 ? (
                        <div className="p-12 text-center text-gray-500 flex flex-col items-center">
                            <Bell className="h-12 w-12 text-gray-300 mb-4" />
                            <p className="text-lg">No notifications found.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.length === notifications.length && notifications.length > 0}
                                                onChange={toggleSelectAll}
                                                className="h-4 w-4 text-solar-600 focus:ring-solar-500 border-gray-300 rounded"
                                            />
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                                    {notifications.map((notification) => (
                                        <tr 
                                            key={notification._id} 
                                            className={`hover:bg-gray-50 transition-colors ${!notification.isRead ? 'bg-blue-50/30' : ''}`}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(notification._id)}
                                                    onChange={() => toggleSelect(notification._id)}
                                                    className="h-4 w-4 text-solar-600 focus:ring-solar-500 border-gray-300 rounded"
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {getIcon(notification.type)}
                                                    <span className="ml-2 font-medium text-gray-900">{notification.type}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-gray-900 font-medium line-clamp-2 md:line-clamp-1 max-w-xs cursor-pointer" onClick={() => openViewModal(notification)}>
                                                    {notification.message}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {notification.user ? (
                                                    <div className="flex flex-col">
                                                        <span className="text-gray-900 font-semibold">{notification.user.name}</span>
                                                        <span className="text-gray-500 text-xs">{notification.user.phone}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400 italic">Guest</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                {format(new Date(notification.createdAt), 'MMM d, yyyy h:mm a')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => openViewModal(notification)}
                                                    className="text-blue-600 hover:text-blue-900 mr-4"
                                                    title="View Details"
                                                >
                                                    <Eye className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(notification._id)}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                
                 <Pagination page={page} setPage={setPage} pages={pages} total={total} limit={limit} setLimit={setLimit} />
            </div>

            {/* View Modal */}
            {viewNotification && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                {getIcon(viewNotification.type)}
                                Notification Details
                            </h3>
                            <button onClick={() => setViewNotification(null)} className="text-gray-400 hover:text-gray-500">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="mb-4">
                                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Message</h4>
                                <p className="text-gray-900 text-lg leading-relaxed">{viewNotification.message}</p>
                            </div>
                            
                            {viewNotification.user && (
                                <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-100">
                                    <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center"><User className="h-4 w-4 mr-2"/> User Information</h4>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-500 block">Name</span>
                                            <span className="text-gray-900 font-medium">{viewNotification.user.name}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 block">Phone</span>
                                            <span className="text-gray-900 font-medium">{viewNotification.user.phone}</span>
                                        </div>
                                        <div className="col-span-2">
                                            <span className="text-gray-500 block">Email</span>
                                            <span className="text-gray-900 font-medium">{viewNotification.user.email}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="text-right text-xs text-gray-400 mt-4">
                                Received on {format(new Date(viewNotification.createdAt), 'MMMM d, yyyy h:mm a')}
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end gap-3">
                             <button
                                onClick={() => {
                                    handleDelete(viewNotification._id);
                                    setViewNotification(null);
                                }}
                                className="px-4 py-2 bg-red-100 text-red-700 font-medium rounded-lg hover:bg-red-200 transition-colors"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setViewNotification(null)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminNotifications;

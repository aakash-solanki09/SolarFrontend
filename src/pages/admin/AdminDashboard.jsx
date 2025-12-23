import { Link } from 'react-router-dom';
import { Package, Users, MessageSquare, Plus } from 'lucide-react';

const AdminDashboard = () => {
    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Products Card */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                                <Package className="h-8 w-8" />
                            </div>
                            <Link to="/admin/products/new" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                                <Plus className="h-5 w-5 text-gray-600" />
                            </Link>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Manage Products</h2>
                        <p className="text-gray-500 mb-4">Add, edit, or remove solar products.</p>
                        <Link to="/admin/products" className="text-blue-600 font-medium hover:underline">View All Products &rarr;</Link>
                    </div>

                    {/* Users Card */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                                <Users className="h-8 w-8" />
                            </div>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Manage Users</h2>
                        <p className="text-gray-500 mb-4">View user profiles and interested products.</p>
                        <Link to="/admin/users" className="text-green-600 font-medium hover:underline">View All Users &rarr;</Link>
                    </div>

                    {/* Chat Card */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                                <MessageSquare className="h-8 w-8" />
                            </div>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Support Chat</h2>
                        <p className="text-gray-500 mb-4">Chat with users in real-time.</p>
                        <Link to="/admin/chat" className="text-purple-600 font-medium hover:underline">Open Chat Console &rarr;</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

import { Link } from 'react-router-dom';
import { Package, Users, MessageSquare, Plus } from 'lucide-react';

const AdminDashboard = () => {
    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-body-foreground mb-8">Admin Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Products Card */}
                    <div className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-card-border" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--card-text)' }}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                                <Package className="h-8 w-8" />
                            </div>
                            <Link to="/admin/products/new" className="p-2 bg-body rounded-full hover:bg-body/80 border border-card-border">
                                <Plus className="h-5 w-5 text-card-foreground" />
                            </Link>
                        </div>
                        <h2 className="text-xl font-bold text-card-foreground mb-2" style={{ color: 'inherit' }}>Manage Products</h2>
                        <p className="text-card-foreground/70 mb-4" style={{ color: 'inherit', opacity: 0.7 }}>Add, edit, or remove solar products.</p>
                        <Link to="/admin/products" className="text-blue-600 font-medium hover:underline">View All Products &rarr;</Link>
                    </div>

                    {/* Users Card */}
                    <div className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-card-border" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--card-text)' }}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                                <Users className="h-8 w-8" />
                            </div>
                        </div>
                        <h2 className="text-xl font-bold text-card-foreground mb-2" style={{ color: 'inherit' }}>Manage Users</h2>
                        <p className="text-card-foreground/70 mb-4" style={{ color: 'inherit', opacity: 0.7 }}>View user profiles and interested products.</p>
                        <Link to="/admin/users" className="text-green-600 font-medium hover:underline">View All Users &rarr;</Link>
                    </div>

                    {/* Chat Card */}
                    <div className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-card-border" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--card-text)' }}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                                <MessageSquare className="h-8 w-8" />
                            </div>
                        </div>
                        <h2 className="text-xl font-bold text-card-foreground mb-2" style={{ color: 'inherit' }}>Support Chat</h2>
                        <p className="text-card-foreground/70 mb-4" style={{ color: 'inherit', opacity: 0.7 }}>Chat with users in real-time.</p>
                        <Link to="/admin/chat" className="text-purple-600 font-medium hover:underline">Open Chat Console &rarr;</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

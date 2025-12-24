import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { User, MapPin, ShoppingBag, MessageCircle, Edit, ExternalLink, ArrowRight } from 'lucide-react';

const UserDashboard = () => {
    const { user } = useAuth();
    const [interestedProducts, setInterestedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInterestedProducts();
    }, []);

    const fetchInterestedProducts = async () => {
        try {
            const res = await api.get('/api/users/interested-products');
            setInterestedProducts(res.data);
        } catch (error) {
            console.error("Error fetching interested products", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen">
            {/* Header / Hero Section */}
            {/* Header / Hero Section */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 lg:py-16 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12">
                        {/* User Info - Left Side */}
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 flex-1">
                            <div className="relative">
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-solar-500 shadow-xl">
                                    <img
                                        src={user?.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                                        alt={user?.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <Link 
                                    to="/edit-profile" 
                                    className="absolute bottom-0 right-0 bg-white text-gray-900 rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors lg:hidden"
                                >
                                    <Edit className="h-4 w-4" />
                                </Link>
                            </div>
                            <div className="text-center md:text-left flex-1">
                                <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
                                <p className="text-gray-400 max-w-xl">{user?.email}</p>
                                
                                <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start mb-6">
                                    {user?.phone && (
                                        <div className="flex items-center text-sm text-gray-300 bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-700">
                                            <User className="h-4 w-4 mr-2 text-solar-400" />
                                            {user.phone}
                                        </div>
                                    )}
                                    {(user?.city || user?.country) && (
                                        <div className="flex items-center text-sm text-gray-300 bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-700">
                                            <MapPin className="h-4 w-4 mr-2 text-solar-400" />
                                            {user.city ? `${user.city}, ` : ''}{user.country}
                                        </div>
                                    )}
                                </div>

                                {/* Address Details - Moved here below contact info */}
                                <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700/50 inline-block text-left min-w-[250px]">
                                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center">
                                        <MapPin className="h-3 w-3 mr-1" /> Address Details
                                    </h3>
                                    <div className="text-sm text-gray-300 leading-relaxed">
                                        {user?.address && (user.address.street || user.address.city) ? (
                                            <>
                                                {user.address.street && <div className="mb-1">{user.address.street}</div>}
                                                <div className="mb-1">
                                                    {user.address.city && `${user.address.city}, `}
                                                    {user.address.state && `${user.address.state} `}
                                                    {user.address.postalCode}
                                                </div>
                                                {user.address.country && <div>{user.address.country}</div>}
                                                {user.address.landmark && <div className="mt-1 text-xs text-gray-500 italic">Near {user.address.landmark}</div>}
                                            </>
                                        ) : (
                                            <div className="text-gray-500 italic">No address details added.</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Account Actions - Desktop Top Right Navbar Style */}
                        <div className="hidden lg:flex items-center gap-4">
                            <Link
                                to="/edit-profile"
                                className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-sm transition-all border border-white/10 hover:border-white/20 shadow-sm"
                            >
                                <Edit className="h-4 w-4 mr-2 text-solar-400" />
                                <span>Edit Profile</span>
                            </Link>
                            <Link
                                to="/chat"
                                className="flex items-center px-4 py-2 bg-solar-600 hover:bg-solar-500 text-white rounded-lg transition-all shadow-lg hover:shadow-solar-500/20"
                            >
                                <MessageCircle className="h-4 w-4 mr-2" />
                                <span>Support Chat</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Account Actions - Mobile/Tablet inline */}
                    <div className="lg:hidden">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Account Actions</h2>
                                <div className="space-y-3">
                                    <Link
                                        to="/edit-profile"
                                        className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                                    >
                                        <span className="flex items-center text-gray-700 font-medium">
                                            <Edit className="h-5 w-5 mr-3 text-solar-600 group-hover:scale-110 transition-transform" />
                                            Edit Profile
                                        </span>
                                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                                    </Link>
                                    <Link
                                        to="/chat"
                                        className="flex items-center justify-between w-full px-4 py-3 bg-solar-50 rounded-lg hover:bg-solar-100 transition-colors group"
                                    >
                                        <span className="flex items-center text-solar-900 font-medium">
                                            <MessageCircle className="h-5 w-5 mr-3 text-solar-600 group-hover:scale-110 transition-transform" />
                                            Support Chat
                                        </span>
                                        <ArrowRight className="h-4 w-4 text-solar-400 group-hover:text-solar-600" />
                                    </Link>
                                </div>
                                <div className="mt-8">
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Address Details</h3>
                                    <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 leading-relaxed">
                                        {user?.address && (user.street || user.city) ? (
                                            <>
                                                {user.street && <div className="mb-1">{user.street}</div>}
                                                <div className="mb-1">
                                                    {user.city && `${user.city}, `}
                                                    {user.state && `${user.state} `}
                                                    {user.postalCode}
                                                </div>
                                                {user.country && <div>{user.country}</div>}
                                                {user.landmark && <div className="mt-2 text-xs text-gray-500 italic">Near {user.landmark}</div>}
                                            </>
                                        ) : (
                                            <div className="text-gray-400 italic text-center py-2">No address details added.</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Interested Products Section - Full Width */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                                    <ShoppingBag className="h-6 w-6 mr-3 text-solar-600" />
                                    Your Interested Products
                                </h2>
                                <Link to="/products" className="text-sm font-medium text-solar-600 hover:text-solar-700 hover:underline">
                                    Browse All Products
                                </Link>
                            </div>

                            {loading ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                                    {[1, 2, 3].map(n => (
                                        <div key={n} className="bg-white rounded-xl h-64 border border-gray-200"></div>
                                    ))}
                                </div>
                            ) : interestedProducts.length === 0 ? (
                                <div className="text-center py-16 bg-gray-50 rounded-xl">
                                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <ShoppingBag className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
                                    <p className="text-gray-500 mb-6">Start exploring our solar solutions and save items you're interested in.</p>
                                    <Link to="/products" className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-solar-600 hover:bg-solar-700 transition-colors">
                                        Explore Products
                                    </Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {interestedProducts.map(product => {
                                        // Handle multiple images logic
                                        const displayImage = (product.images && product.images.length > 0 ? product.images[0] : product.image) || "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=400&q=80";
                                        
                                        return (
                                            <div key={product._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
                                                <div className="h-56 relative overflow-hidden">
                                                    <img
                                                        src={displayImage}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                                                </div>
                                                
                                                <div className="p-5 flex flex-col flex-grow">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-solar-600 transition-colors">{product.name}</h3>
                                                        <span className="bg-solar-50 text-solar-700 text-xs font-bold px-2 py-1 rounded border border-solar-100">
                                                            ${product.price}
                                                        </span>
                                                    </div>
                                                    
                                                    <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">
                                                        {product.description}
                                                    </p>
                                                    
                                                    <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
                                                        <Link
                                                            to={`/products/${product._id}`}
                                                            className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                                        >
                                                            <ExternalLink className="h-4 w-4 mr-2" />
                                                            Details
                                                        </Link>
                                                        <Link
                                                            to={`/chat?product=${product._id}`}
                                                            className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-black bg-solar-600 hover:bg-solar-700 transition-colors"
                                                        >
                                                            <MessageCircle className="h-4 w-4 mr-2" />
                                                            Chat
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;

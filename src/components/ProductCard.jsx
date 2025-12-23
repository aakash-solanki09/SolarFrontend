import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, MessageCircle, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product, onInterest, onChat }) => {
    console.log('ProductCard product:', product);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleAction = (action, id) => {
        if (!isAuthenticated) {
            if (window.confirm("You need to login to perform this action. Go to login page?")) {
                navigate('/login');
            }
        } else {
            action(id);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full">
            <div className="h-48 overflow-hidden relative group">
                <img
                    src={(product.images && product.images.length > 0 ? product.images[0] : product.image) || "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"}
                    alt={product.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
                {!isAuthenticated && (
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="bg-white text-gray-900 text-xs font-bold px-2 py-1 rounded shadow">Login to interact</span>
                    </div>
                )}
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-800 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-solar-600">₹{product.price}</span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{product.capacity}</span>
                </div>

                <div className="flex space-x-2 mt-auto">
                    <button
                        onClick={() => handleAction(onInterest, product._id)}
                        className={`flex-1 flex items-center justify-center py-2 rounded-lg transition-colors ${isAuthenticated ? 'bg-solar-500 text-black hover:bg-solar-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                    >
                        {isAuthenticated ? <ShoppingBag className="h-4 w-4 mr-2" /> : <LogIn className="h-4 w-4 mr-2" />}
                        {isAuthenticated ? 'Interested' : 'Login to Add'}
                    </button>
                    <button
                        onClick={() => handleAction(onChat, product._id)}
                        className="flex items-center justify-center bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-colors"
                        title={isAuthenticated ? "Chat about this product" : "Login to chat"}
                    >
                        <MessageCircle className="h-5 w-5" />
                    </button>
                </div>
                <Link to={`/products/${product._id}`} className="block text-center mt-3 text-sm text-solar-600 hover:underline">
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;

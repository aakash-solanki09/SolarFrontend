
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, MessageCircle, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const res = await api.get(`/api/products/${id}`);
            setProduct(res.data);
        } catch (error) {
            console.error("Error fetching product", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInterest = async () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        try {
            await api.post(`/api/users/interest/${id}`);
            alert('Added to your interested products!');
        } catch (error) {
            console.error("Error adding interest", error);
        }
    };

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!product) return <div className="text-center py-20">Product not found</div>;


    // ... (rest of code)

    // Helper to get all available images
    const allImages = product?.images && product.images.length > 0 
        ? product.images 
        : (product?.image ? [product.image] : []);

    const mainImage = selectedImage || (allImages.length > 0 ? allImages[0] : null);

    return (
        <div className="min-h-screen py-12">
            <SEO 
                title={product.name}
                description={product.description?.substring(0, 160)}
                image={mainImage}
                url={`/products/${id}`}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-solar-600 mb-8"
                >
                    <ArrowLeft className="h-5 w-5 mr-2" /> Back to Products
                </button>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="h-full flex flex-col">
                            <div className="h-96 w-full relative">
                                <img
                                    src={mainImage}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Thumbnail Gallery */}
                            {allImages.length > 1 && (
                                <div className="flex gap-2 p-4 overflow-x-auto">
                                    {allImages.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImage(img)}
                                            className={`flex-shrink-0 h-16 w-16 border-2 rounded overflow-hidden ${mainImage === img ? 'border-solar-600' : 'border-transparent hover:border-gray-300'}`}
                                        >
                                            <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="p-8 md:p-12">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                            <div className="flex items-center mb-6">
                                <span className="text-3xl font-bold text-solar-600">${product.price}</span>
                                <span className="ml-4 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{product.capacity}</span>
                            </div>

                            <p className="text-gray-800 mb-8 text-lg leading-relaxed">{product.description}</p>

                            <div className="flex gap-4 mb-10">
                                {isAuthenticated ? (
                                    <>
                                        <button
                                            onClick={handleInterest}
                                            className="flex-1 btn-dynamic py-3 px-6 rounded-lg transition-colors flex items-center justify-center font-semibold shadow-md"
                                        >
                                            <ShoppingBag className="h-5 w-5 mr-2" />
                                            Add to Interested
                                        </button>
                                        <button
                                            onClick={() => navigate(`/chat?product=${id}`)}
                                            className="bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center font-semibold shadow-sm"
                                        >
                                            <MessageCircle className="h-5 w-5 mr-2" />
                                            Chat with Expert
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => navigate('/login')}
                                        className="flex-1 btn-dynamic py-3 px-6 rounded-lg transition-colors flex items-center justify-center font-semibold shadow-md"
                                    >
                                        Login to Show Interest or Chat
                                    </button>
                                )}
                            </div>

                            <div className="border-t border-gray-200 pt-8">
                                <h3 className="text-lg font-semibold mb-4">Technical Details</h3>
                                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                                    {product.details && Object.entries(product.details).map(([key, value]) => (
                                        <div key={key}>
                                            <dt className="text-sm font-bold text-gray-700 capitalize">{key}</dt>
                                            <dd className="text-sm text-gray-900">{value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

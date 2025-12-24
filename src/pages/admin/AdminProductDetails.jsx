import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../utils/api';
import { Edit, ArrowLeft, Trash2 } from 'lucide-react';

const AdminProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
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

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/api/products/${id}`);
                navigate('/admin/products');
            } catch (error) {
                console.error("Error deleting product", error);
            }
        }
    };

    if (loading) return <div className="p-12 text-center text-gray-500">Loading details...</div>;
    if (!product) return <div className="p-12 text-center text-gray-500">Product not found</div>;

    // Helper to get all available images
    const allImages = product?.images && product.images.length > 0 
        ? product.images 
        : (product?.image ? [product.image] : []);

    const mainImage = selectedImage || (allImages.length > 0 ? allImages[0] : null);

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <button
                onClick={() => navigate('/admin/products')}
                className="flex items-center text-gray-600 hover:text-solar-600 mb-6 transition-colors"
            >
                <ArrowLeft className="h-5 w-5 mr-2" /> Back to Manage Products
            </button>

            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Image Section */}
                    <div className="h-full flex flex-col">
                        <div className="h-96 w-full relative">
                            {mainImage ? (
                                <img
                                    src={mainImage}
                                    alt={product.name}
                                    className="w-full h-full object-contain p-4"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    No Image Available
                                </div>
                            )}
                        </div>
                        {/* Thumbnail Gallery */}
                        {allImages.length > 1 && (
                            <div className="flex gap-2 p-4 overflow-x-auto border-t border-gray-200">
                                {allImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(img)}
                                        className={`flex-shrink-0 h-16 w-16 border-2 rounded overflow-hidden bg-white ${mainImage === img ? 'border-solar-600' : 'border-transparent hover:border-gray-300'}`}
                                    >
                                        <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="p-8 md:p-12 flex flex-col h-full">
                        <div>
                            <div className="flex justify-between items-start">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                    {product.capacityKW}
                                </span>
                            </div>
                            
                            <div className="flex items-center mb-6">
                                <span className="text-3xl font-bold text-solar-600">₹{product.price}</span>
                            </div>

                            <p className="text-gray-600 mb-8 text-lg leading-relaxed whitespace-pre-wrap">{product.description}</p>
                            
                            <div className="border-t border-gray-200 py-6">
                                <h3 className="text-lg font-semibold mb-4 text-gray-900">Technical Details</h3>
                                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                                    {product.details && Object.entries(product.details).map(([key, value]) => (
                                        <div key={key}>
                                            <dt className="text-sm font-medium text-gray-500 capitalize">{key}</dt>
                                            <dd className="text-sm font-semibold text-gray-900 mt-1">{value}</dd>
                                        </div>
                                    ))}
                                    {(!product.details || Object.keys(product.details).length === 0) && (
                                        <div className="text-sm text-gray-400 italic">No technical details provided.</div>
                                    )}
                                </dl>
                            </div>
                        </div>

                        {/* Admin Actions */}
                        <div className="mt-auto pt-8 flex gap-4 border-t border-gray-200">
                            <Link 
                                to={`/admin/products/edit/${product._id}`}
                                className="flex-1 bg-solar-600 text-black py-3 px-6 rounded-lg hover:bg-solar-700 transition-colors flex items-center justify-center font-semibold shadow-sm"
                            >
                                <Edit className="h-5 w-5 mr-2" />
                                Edit Product
                            </Link>
                            <button
                                onClick={handleDelete}
                                className="flex-1 bg-white border border-red-300 text-red-600 py-3 px-6 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center font-semibold shadow-sm"
                            >
                                <Trash2 className="h-5 w-5 mr-2" />
                                Delete Product
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProductDetails;

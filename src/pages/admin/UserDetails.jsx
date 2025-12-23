import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../utils/api';
import { ArrowLeft, MapPin, ShoppingBag } from 'lucide-react';

const UserDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUser();
    }, [id]);

    const fetchUser = async () => {
        try {
            const res = await api.get(`/api/admin/users/${id}`);
            setUser(res.data);
        } catch (error) {
            console.error("Error fetching user", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!user) return <div className="text-center py-20">User not found</div>;

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate('/admin/users')}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
                >
                    <ArrowLeft className="h-5 w-5 mr-2" /> Back to Users
                </button>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                    <div className="p-8">
                        <div className="flex items-center mb-8">
                            <img
                                src={user.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                                alt={user.name}
                                className="w-24 h-24 rounded-full object-cover border-4 border-solar-100"
                            />
                            <div className="ml-6">
                                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                                <p className="text-gray-500">{user.email}</p>
                                <p className="text-gray-500">{user.phone}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-lg font-semibold mb-4 flex items-center">
                                    <MapPin className="h-5 w-5 mr-2 text-solar-500" /> Address
                                </h3>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p>{user.address?.street}</p>
                                    <p>{user.address?.city}, {user.address?.state}</p>
                                    <p>{user.address?.postalCode}</p>
                                    <p>{user.address?.country}</p>
                                    {user.address?.landmark && <p className="text-sm text-gray-500 mt-2">Landmark: {user.address.landmark}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-8">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                            <ShoppingBag className="h-5 w-5 mr-2 text-solar-500" /> Interested Products
                        </h3>

                        {user.interestedProducts && user.interestedProducts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {user.interestedProducts.map(product => {
                                    const displayImage = (product.images && product.images.length > 0 ? product.images[0] : product.image) || "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=400&q=80";
                                    return (
                                        <div key={product._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden flex shadow-sm hover:shadow-md transition-shadow">
                                            <div className="w-24 h-24 flex-shrink-0">
                                                <img
                                                    src={displayImage}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="p-4 flex flex-col justify-center">
                                                <h4 className="font-bold text-black mb-1 text-lg">{product.name}</h4>
                                                <p className="text-gray-800 font-semibold">${product.price}</p>
                                                <Link to={`/products/${product._id}`} className="text-solar-600 hover:text-solar-700 text-sm mt-2 font-medium">
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No interested products found for this user.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;

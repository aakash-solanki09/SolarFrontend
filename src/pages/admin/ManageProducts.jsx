import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { Edit, Trash2, Plus, Eye } from 'lucide-react';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [limit, setLimit] = useState(5);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchProducts();
        }, 300); // Debounce search

        return () => clearTimeout(delayDebounceFn);
    }, [page, keyword, limit]);

    const fetchProducts = async () => {
        try {
            const res = await api.get(`/api/products?page=${page}&limit=${limit}&search=${keyword}`);
            // Check if response is the new object format or fallback (just in case)
            if (res.data.products) {
                setProducts(res.data.products);
                setPages(res.data.pages);
                setTotal(res.data.total);
            } else {
                 setProducts(res.data);
            }
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/api/products/${id}`);
                fetchProducts(); // Refresh list
            } catch (error) {
                console.error("Error deleting product", error);
            }
        }
    };

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-center">
                    <SearchBar keyword={keyword} setKeyword={setKeyword} placeholder="Search Products..." />
                    <Link
                        to="/admin/products/new"
                        className="bg-solar-600 text-black px-4 py-2 rounded-lg hover:bg-solar-700 flex items-center whitespace-nowrap"
                    >
                        <Plus className="h-5 w-5 mr-2" /> Add New Product
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.length === 0 ? (
                            <tr><td colSpan="4" className="px-6 py-4 text-center">No products found.</td></tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img 
                                                    className="h-10 w-10 rounded-full object-cover" 
                                                    src={product.images && product.images.length > 0 ? product.images[0] : (product.image || 'https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=150&q=80')} 
                                                    alt={product.name} 
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">₹{product.price}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            {product.capacityKW}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end gap-3">
                                            <Link to={`/admin/products/${product._id}`} className="text-gray-600 hover:text-gray-900">
                                                <Eye className="h-5 w-5" />
                                            </Link>
                                            <Link to={`/admin/products/edit/${product._id}`} className="text-blue-600 hover:text-blue-900">
                                                <Edit className="h-5 w-5" />
                                            </Link>
                                            <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:text-red-900">
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            
            <Pagination page={page} setPage={setPage} pages={pages} total={total} limit={limit} setLimit={setLimit} />
        </div>
    );
};

export default ManageProducts;

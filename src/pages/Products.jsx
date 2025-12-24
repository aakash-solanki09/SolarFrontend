import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';
import { useSiteConfig } from '../context/SiteConfigContext';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import SEO from '../components/SEO';

const Products = () => {
    const { siteConfig } = useSiteConfig();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [limit, setLimit] = useState(9);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchProducts();
        }, 500); // 500ms debounce

        return () => clearTimeout(delayDebounceFn);
    }, [page, keyword, limit]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/api/products?page=${page}&limit=${limit}&search=${keyword}`);
            if (res.data.products) {
                setProducts(res.data.products);
                setPages(res.data.pages);
                setTotal(res.data.total);
            } else {
                setProducts(res.data);
            }
        } catch (error) {
            console.error("Error fetching products", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInterest = async (productId) => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        try {
            await api.post(`/api/users/interest/${productId}`);
            alert('Added to your interested products!');
        } catch (error) {
            console.error("Error adding interest", error);
            alert('Could not add to interested products.');
        }
    };

    const handleChat = (productId) => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        navigate(`/chat?product=${productId}`);
    };

    return (
        <div className="bg-body min-h-screen py-12">
            <SEO 
                title="Our Products" 
                description="Explore our range of high-efficiency solar panels and inverters. Find the perfect solar solution for your needs."
            />
            {/* Products Hero */}
             <div className="relative bg-black py-20 lg:py-28">
                <div className="absolute inset-0 z-0">
                    <img
                         src={siteConfig?.productPageImage || "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=1600&q=80"}
                        alt="Solar Products"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">Our Premium Solar Solutions</h1>
                    <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
                         High-efficiency panels, advanced inverters, and complete mounting systems for every need.
                    </p>
                </div>
            </div>

            <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-on-scroll">
                
                <div className="flex justify-center mb-10">
                    <SearchBar keyword={keyword} setKeyword={setKeyword} placeholder="Search products..." />
                </div>

                {loading ? (
                    <div className="text-center py-20 text-body-foreground/70">Loading products...</div>
                ) : (
                    <>
                        {products.length === 0 ? (
                             <div className="text-center py-20 text-body-foreground/60">No products found matching your search.</div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {products.map(product => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        onInterest={handleInterest}
                                        onChat={handleChat}
                                    />
                                ))}
                            </div>
                        )}
                         <Pagination page={page} setPage={setPage} pages={pages} total={total} limit={limit} setLimit={setLimit} />
                    </>
                )}
            </div>
        </div>
    );
};

export default Products;

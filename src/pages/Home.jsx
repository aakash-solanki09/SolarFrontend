import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sun, Battery, ShieldCheck } from 'lucide-react';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';
import homeBg from '../assets/homeBg.avif';
import Contact from './Contact';

import HeroImageSlider from '../components/HeroImageSlider';
import SEO from '../components/SEO';

const Home = () => {
    // Product State
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await api.get('/api/products?limit=6');
            if (res.data.products) {
                setProducts(res.data.products);
            } else {
                 setProducts(res.data);
            }
        } catch (error) {
            console.error("Error fetching products", error);
        } finally {
            setLoadingProducts(false);
        }
    };

    // Product Handlers
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
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-black text-white py-20 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={homeBg}
                        alt="Solar Panels"
                        className="w-full h-full object-cover opacity-90 scale-105 animate-float"
                    />
                    {/* Gradient Overlay for Visibility */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <span className="block text-[#fcd34d] font-extrabold tracking-widest uppercase mb-3 drop-shadow-md animate-fade-in-up text-lg md:text-xl">
                        Central India’s Leading Rooftop Solar Company
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-2 text-[#fbbf24] drop-shadow-2xl animate-fade-in-up-delay-1 leading-tight">
                        Vishwamangal <span className="text-[#f59e0b] drop-shadow-lg">Solar Energy</span> Service
                    </h1>
                    
                    <div className="animate-fade-in-up-delay-2">
                        <HeroImageSlider />
                    </div>

                    <p className="text-xl md:text-3xl text-gray-100 mb-10 max-w-4xl mx-auto font-bold drop-shadow-lg animate-fade-in-up-delay-2">
                        Premium On-grid Rooftop Solar Power Plants.
                        <br/>
                        <span className="text-lg md:text-xl mt-4 block text-[#fde68a] font-semibold tracking-wide">Site Survey | Installation | Net Metering | After-Sales Service</span>
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in-up-delay-2 mt-8">
                        <Link
                            to="/contact"
                            className="px-8 py-4 bg-[#f59e0b] text-black font-extrabold text-lg rounded-full hover:bg-[#fbbf24] transition-all shadow-[0_0_15px_rgba(245,158,11,0.5)] hover:shadow-[0_0_25px_rgba(245,158,11,0.7)] transform hover:scale-105 flex items-center justify-center group"
                        >
                            Get a Free Quote <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            to="/products"
                            className="px-8 py-4 bg-transparent border-2 border-[#fbbf24] text-[#fbbf24] font-bold text-lg rounded-full hover:bg-[#fbbf24] hover:text-black transition-all shadow-lg hover:shadow-[0_0_20px_rgba(251,191,36,0.5)] transform hover:scale-105 flex items-center justify-center"
                        >
                            View Our Products
                        </Link>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-20 bg-gray-50 animate-on-scroll">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Premium Solar Products</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Explore our range of high-efficiency solar solutions designed for your needs.
                        </p>
                    </div>
                    
                    {loadingProducts ? (
                        <div className="text-center py-10">Loading Products...</div>
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
                    
                    <div className="text-center mt-12">
                         <Link to="/products" className="inline-block px-8 py-3 border border-solar-500 text-solar-600 font-bold rounded-lg hover:bg-solar-50 transition-colors">
                            View All Products
                        </Link>
                    </div>
                </div>
            </section>

            {/* Brands Section */}
            <section className="py-16 bg-white animate-on-scroll">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">Trusted Brands & Partners</h2>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-80 hover:opacity-100 transition-all duration-500">
                        {/* Validated Partner Names */}
                        <span className="text-2xl font-bold text-gray-500 hover:text-primary-600 transition-colors cursor-default">TATA Power Solar</span>
                        <span className="text-2xl font-bold text-gray-500 hover:text-primary-600 transition-colors cursor-default">WAAREE</span>
                        <span className="text-2xl font-bold text-gray-500 hover:text-primary-600 transition-colors cursor-default">Adani Solar</span>
                        <span className="text-2xl font-bold text-gray-500 hover:text-primary-600 transition-colors cursor-default">Havells</span>
                        <span className="text-2xl font-bold text-gray-500 hover:text-primary-600 transition-colors cursor-default">Polycab</span>
                        <span className="text-2xl font-bold text-gray-500 hover:text-primary-600 transition-colors cursor-default">UTL Solar</span>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="bg-primary-50 animate-on-scroll">
               <Contact isEmbedded={true} />
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary-900 animate-on-scroll">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-black mb-6">Start Your Solar Journey Today</h2>
                    <p className="text-xl text-black mb-10">
                        Contact us at <span className="text-black font-bold">+91-9977137348</span> for a personalized consultation.
                    </p>
                    <Link
                        to="/signup"
                        className="px-8 py-3 bg-solar-500 text-black font-bold rounded-lg hover:bg-solar-600 transition-colors inline-block"
                    >
                        Create Account & Track
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;

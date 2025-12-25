import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sun, Battery, ShieldCheck } from 'lucide-react';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';
import { useSiteConfig } from '../context/SiteConfigContext';
import homeBg from '../assets/homeBg.avif';
import Contact from './Contact';

import HeroImageSlider from '../components/HeroImageSlider';
import TrustedPartners from '../components/TrustedPartners';
import SEO from '../components/SEO';
import AnimationWrapper from '../components/common/AnimationWrapper';

const Home = () => {
    // Product State
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const { isAuthenticated } = useAuth();
    const { siteConfig } = useSiteConfig();
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
                        src={siteConfig?.heroImage || homeBg}
                        alt="Solar Panels"
                        className="w-full h-full object-cover opacity-90 scale-105 animate-float"
                    />
                    {/* Gradient Overlay for Visibility */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <AnimationWrapper animation="fadeInUp" delay={0.2}>
                        <span className="block font-extrabold tracking-widest uppercase mb-3 drop-shadow-md text-lg md:text-xl" style={{ color: 'var(--color-accent)' }}>
                            {siteConfig?.heroText?.topText || "Central India’s Leading Rooftop Solar Company"}
                        </span>
                    </AnimationWrapper>
                    <AnimationWrapper animation="scaleIn" delay={0.4}>
                        <h1 id="tour-welcome" className="text-5xl md:text-7xl font-extrabold tracking-tight mb-2 text-[#fbbf24] drop-shadow-2xl leading-tight">
                            {siteConfig?.heroText?.headline || "Vishwamangal Solar Energy Service"}
                        </h1>
                    </AnimationWrapper>
                    
                    <AnimationWrapper animation="fadeInUp" delay={0.6}>
                        <HeroImageSlider />
                    </AnimationWrapper>

                    <AnimationWrapper animation="fadeInUp" delay={0.8}>
                        <p className="text-xl md:text-3xl text-white/90 mb-10 max-w-4xl mx-auto font-bold drop-shadow-lg whitespace-pre-line">
                            {siteConfig?.heroText?.description || "Premium On-grid Rooftop Solar Power Plants.\nSite Survey | Installation | Net Metering | After-Sales Service"}
                        </p>
                    </AnimationWrapper>

                    <AnimationWrapper animation="fadeInUp" delay={1.0}>
                        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
                            <Link
                                to="/contact"
                                className="px-8 py-4 btn-dynamic rounded-full font-extrabold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center group"
                            >
                                Get a Free Quote <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/products"
                                className="px-8 py-4 bg-transparent border-2 border-[var(--btn-bg)] text-[var(--btn-bg)] font-bold text-lg rounded-full hover:bg-[var(--btn-bg)] hover:text-[var(--btn-text)] transition-all shadow-lg hover:shadow-[0_0_20px_rgba(251,191,36,0.5)] transform hover:scale-105 flex items-center justify-center"
                            >
                                View Our Products
                            </Link>
                        </div>
                    </AnimationWrapper>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-20 bg-body">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimationWrapper animation="fadeInUp">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-body-foreground mb-4">Our Premium Solar Products</h2>
                            <p className="text-xl text-body-foreground/80 max-w-3xl mx-auto">
                                Explore our range of high-efficiency solar solutions designed for your needs.
                            </p>
                        </div>
                    </AnimationWrapper>
                    
                    {loadingProducts ? (
                        <div className="text-center py-10">Loading Products...</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map((product, index) => (
                                <AnimationWrapper key={product._id} animation="fadeInUp" delay={index * 0.1}>
                                    <ProductCard
                                        product={product}
                                        onInterest={handleInterest}
                                        onChat={handleChat}
                                    />
                                </AnimationWrapper>
                            ))}
                        </div>
                    )}
                    
                    <AnimationWrapper animation="fadeInUp" delay={0.4}>
                        <div className="text-center mt-12">
                             <Link to="/products" className="inline-block px-8 py-3 border border-solar-500 text-solar-600 font-bold rounded-lg hover:bg-solar-50 transition-colors">
                                View All Products
                            </Link>
                        </div>
                    </AnimationWrapper>
                </div>
            </section>

            {/* Brands Section */}
            <AnimationWrapper animation="fadeInUp">
                <TrustedPartners />
            </AnimationWrapper>

            {/* Contact Form Section */}
            <section className="bg-primary-50">
               <AnimationWrapper animation="fadeInLeft">
                   <Contact isEmbedded={true} />
               </AnimationWrapper>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-footer text-footer-foreground">
                <AnimationWrapper animation="scaleIn">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold text-inherit mb-6">Start Your Solar Journey Today</h2>
                        <p className="text-xl text-inherit/90 mb-10">
                            Contact us at <span className="font-bold">+91-9977137348</span> for a personalized consultation.
                        </p>
                        <Link
                            to="/signup"
                            className="px-8 py-3 bg-solar-500 text-black font-bold rounded-lg hover:bg-solar-600 transition-colors inline-block"
                        >
                            Create Account & Track
                        </Link>
                    </div>
                </AnimationWrapper>
            </section>
        </div>
    );
};

export default Home;

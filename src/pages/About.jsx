
import SEO from '../components/SEO';
import TrustedPartners from '../components/TrustedPartners';
import { useSiteConfig } from '../context/SiteConfigContext';
import { Users } from 'lucide-react';

const About = () => {
    const { siteConfig } = useSiteConfig();
    const leadership = siteConfig?.leadership || [];

    return (
        <div>
            <SEO 
                title="About Us" 
                description="Learn about Vishwamangal Solar's mission to power a sustainable future. Meet our team of solar experts."
            />
             {/* About Hero */}
             <div className="relative bg-black py-24 mb-16">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1624397640148-949179d63c50?auto=format&fit=crop&w=1600&q=80"
                        alt="Solar Engineering"
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-xl">About Vishwamangal Solar</h1>
                    <div className="w-24 h-1 bg-solar-400 mb-6"></div>
                    <p className="text-xl md:text-2xl text-white/90 max-w-2xl font-light">
                        Empowering Central India with sustainable, clean energy solutions since our inception.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Mission Section with Image Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24 animate-on-scroll">
                    <div className="grid grid-cols-2 gap-4">
                         <img
                            src="https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&w=600&q=80"
                            alt="Solar Panels 2"
                            className="rounded-2xl shadow-lg transform translate-y-8"
                        />
                         <img
                            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=600&q=80"
                            alt="Solar Worker"
                            className="rounded-2xl shadow-lg"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-body-foreground mb-6">Our Mission</h2>
                        <p className="text-body-foreground/90 mb-6 text-lg leading-relaxed">
                            Vishwamangal Solar Energy Service is committed to delivering high-quality, on-grid rooftop solar power plants.
                            We aim to reduce electricity costs for our clients while contributing to a greener, cleaner environment.
                        </p>
                        <p className="text-body-foreground/90 text-lg">
                            With a focus on premium components and expert installation, we ensure your transition to solar is smooth,
                            profitable, and worry-free.
                        </p>
                        <div className="mt-8 grid grid-cols-2 gap-6">
                             <div className="bg-card p-4 rounded-lg shadow-sm border-l-4 border-solar-500" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--card-text)' }}>
                                 <h4 className="font-bold text-card-foreground" style={{ color: 'inherit' }}>500+</h4>
                                 <p className="text-sm text-card-foreground/70" style={{ color: 'inherit', opacity: 0.7 }}>Projects Completed</p>
                             </div>
                             <div className="bg-card p-4 rounded-lg shadow-sm border-l-4 border-primary-500" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--card-text)' }}>
                                 <h4 className="font-bold text-card-foreground" style={{ color: 'inherit' }}>100%</h4>
                                 <p className="text-sm text-card-foreground/70" style={{ color: 'inherit', opacity: 0.7 }}>Customer Satisfaction</p>
                             </div>
                         </div>
                    </div>
                </div>

                {/* Trusted Partners Section */}
                <TrustedPartners />

                {/* Management Section */}
                <div className="mb-24 animate-on-scroll">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Meet Our Leadership</h2>
                    
                    {leadership.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                            {leadership.map((leader, index) => (
                                <div key={index} className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center group border border-card-border" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--card-text)' }}>
                                    <div className="h-32 bg-gradient-to-b from-primary-600 to-primary-800 relative">
                                        <div className="w-24 h-24 bg-card rounded-full absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex items-center justify-center p-1 border-4 border-card">
                                            {leader.image ? (
                                                <img src={leader.image} alt={leader.name} className="w-full h-full rounded-full object-cover" />
                                            ) : (
                                                <span className="text-2xl font-bold text-primary-700 bg-primary-50 w-full h-full rounded-full flex items-center justify-center">
                                                    {leader.name ? leader.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : <Users className="w-8 h-8"/>}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="pt-16 pb-8 px-6">
                                        <h3 className="text-xl font-bold text-card-foreground">{leader.name}</h3>
                                        <p className="text-solar-600 font-medium mb-4">{leader.role}</p>
                                        {leader.phone && (
                                            <p className="text-card-foreground/70 text-sm bg-body py-2 rounded-full inline-block px-4">{leader.phone}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Fallback or specific hardcoded default if desired, but user wants dynamic. 
                           If empty, we might show nothing or a placeholder. 
                           For now, if empty, we just show nothing or the section header + empty msg. */
                        <div className="text-center text-gray-500">
                            Updates coming soon.
                        </div>
                    )}
                </div>



                <div className="bg-footer text-footer-foreground rounded-3xl shadow-xl p-8 md:p-16 text-center animate-on-scroll relative overflow-hidden mb-20 border border-footer/20">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-solar-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
                     <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-12 text-footer-foreground">Our Core Values</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-all">
                                <h3 className="text-xl font-bold text-solar-400 mb-3">Quality</h3>
                                <p className="text-footer-foreground/90">
                                    We use only top-tier components like Waaree modules and Polycab cables to ensure longevity.
                                </p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-all">
                                <h3 className="text-xl font-bold text-solar-400 mb-3">Transparency</h3>
                                <p className="text-footer-foreground/90">
                                    Honest pricing with no hidden costs. Tentative prices confirmed after site visits.
                                </p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-all">
                                <h3 className="text-xl font-bold text-solar-400 mb-3">Service</h3>
                                <p className="text-footer-foreground/90">
                                    5-year complete service warranty and comprehensive after-sales support.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;

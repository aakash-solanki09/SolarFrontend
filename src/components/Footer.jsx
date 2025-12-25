import { Sun, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteConfig } from '../context/SiteConfigContext';

const Footer = () => {
    const { siteConfig } = useSiteConfig();
    const { companyDetails, appName } = siteConfig || {};
    
    // Defaults
    const name = companyDetails?.name || appName || "Vishwamangal Solar";
    const tagline = companyDetails?.tagline || "Central India’s leading Rooftop Solar Company. Empowering your home with sustainable solar energy.";
    const address = companyDetails?.address || "226-B, Prajapat Nagar, Indore – 452009, MP, India";
    const phone = companyDetails?.phone || "+91-9977137348";
    const email = companyDetails?.email || "vishwamangalsolar@gmail.com";
    const year = companyDetails?.foundedYear || new Date().getFullYear();

    return (
        <footer className="bg-footer text-footer-foreground pt-12 pb-8" style={{ backgroundColor: 'var(--footer-bg)', color: 'var(--footer-text)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center mb-4">
                             {/* Primary Logo retrieval */}
                             {siteConfig?.appLogo?.secondary ? (
                                <img src={siteConfig.appLogo.secondary} alt={name} className="h-10 w-auto" />
                             ) : (
                                <>
                                    <Sun className="h-8 w-8 text-solar-500" />
                                    <span className="ml-2 text-xl font-bold">{name}</span>
                                </>
                             )}
                        </div>
                        <p className="text-sm" style={{ opacity: 0.8 }}>
                            {tagline}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/products" className="hover:text-solar-400 transition-colors" style={{ opacity: 0.8 }}>Products</Link></li>
                            <li><Link to="/about" className="hover:text-solar-400 transition-colors" style={{ opacity: 0.8 }}>About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-solar-400 transition-colors" style={{ opacity: 0.8 }}>Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center" style={{ opacity: 0.8 }}>
                                <Phone className="h-4 w-4 mr-2" /> {phone}
                            </li>
                            <li className="flex items-center" style={{ opacity: 0.8 }}>
                                <Mail className="h-4 w-4 mr-2" /> {email}
                            </li>
                            <li className="flex items-start" style={{ opacity: 0.8 }}>
                                <MapPin className="h-4 w-4 mr-2 mt-1" /> 
                                <span>{address}</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                        <p className="text-sm mb-4" style={{ opacity: 0.8 }}>Follow us on social media for updates.</p>
                        
                        <div className="flex space-x-4 mb-6">
                            {/* Instagram */}
                            {siteConfig?.socialLinks?.instagram && (
                                <a 
                                    href={siteConfig.socialLinks.instagram} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="bg-white/10 hover:bg-solar-500 hover:text-white p-2 rounded-full transition-all duration-300"
                                    title="Instagram"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                                </a>
                            )}
                            
                            {/* Facebook */}
                            {siteConfig?.socialLinks?.facebook && (
                                <a 
                                    href={siteConfig.socialLinks.facebook} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="bg-white/10 hover:bg-solar-500 hover:text-white p-2 rounded-full transition-all duration-300"
                                    title="Facebook"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                                </a>
                            )}
                            
                            {/* Twitter / X */}
                            {siteConfig?.socialLinks?.twitter && (
                                <a 
                                    href={siteConfig.socialLinks.twitter} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="bg-white/10 hover:bg-solar-500 hover:text-white p-2 rounded-full transition-all duration-300"
                                    title="Twitter"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                                </a>
                            )}
                        </div>

                        {/* Dynamic Logo from Admin */}
                        {siteConfig?.appLogo?.secondary ? (
                             <img 
                                src={siteConfig.appLogo.secondary} 
                                alt={name} 
                                className="h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" 
                              />
                        ) : (
                            // Fallback if no logo
                            <div className="flex items-center text-solar-500">
                                <Sun className="h-8 w-8" />
                                <span className="ml-2 font-bold text-white">{name}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm" style={{ opacity: 0.6 }}>
                    &copy; {new Date().getFullYear()} {name} Energy Service. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;

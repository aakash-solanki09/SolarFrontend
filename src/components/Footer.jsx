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
                            <Sun className="h-8 w-8 text-solar-500" />
                            <span className="ml-2 text-xl font-bold">{name}</span>
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
                        <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/10 placeholder-white/50 px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-solar-500 w-full"
                                style={{ color: 'inherit' }}
                            />
                            <button className="bg-solar-500 text-white px-4 py-2 rounded-r-md hover:bg-solar-600 transition-colors">
                                Subscribe
                            </button>
                        </div>
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

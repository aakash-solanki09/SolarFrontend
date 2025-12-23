import { Sun, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center mb-4">
                            <Sun className="h-8 w-8 text-solar-500" />
                            <span className="ml-2 text-xl font-bold">Vishwamangal Solar</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Central India’s leading Rooftop Solar Company.
                            Empowering your home with sustainable solar energy.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/products" className="text-gray-400 hover:text-solar-400">Products</Link></li>
                            <li><Link to="/about" className="text-gray-400 hover:text-solar-400">About Us</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-solar-400">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center text-gray-400">
                                <Phone className="h-4 w-4 mr-2" /> +91-9977137348
                            </li>
                            <li className="flex items-center text-gray-400">
                                <Mail className="h-4 w-4 mr-2" /> vishwamangalsolar@gmail.com
                            </li>
                            <li className="flex items-start text-gray-400">
                                <MapPin className="h-4 w-4 mr-2 mt-1" /> 
                                <span>226-B, Prajapat Nagar, Indore – 452009, MP, India</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-solar-500 w-full"
                            />
                            <button className="bg-solar-500 px-4 py-2 rounded-r-md hover:bg-solar-600 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} Vishwamangal Solar Energy Service. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;

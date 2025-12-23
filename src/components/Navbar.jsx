import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Sun, User, LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, logout, isAuthenticated, isAdmin } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    const NavLink = ({ to, children }) => (
        <Link 
            to={to} 
            className={`relative px-4 py-2 font-medium transition-all duration-300 group z-10 ${
                isActive(to) ? 'text-black' : 'text-gray-600 hover:text-solar-700'
            }`}
        >
            {/* Irregular Background Shape */}
            <span className={`absolute inset-0 transform transition-all duration-300 -z-10 rounded-md ${
                isActive(to) 
                    ? 'bg-solar-400 -skew-x-12 scale-100 outline outline-2 outline-solar-500 shadow-lg' 
                    : 'bg-gray-100 scale-0 group-hover:scale-100 -skew-x-12 group-hover:bg-solar-50'
            }`}></span>
            
            <span className="relative z-10">{children}</span>
        </Link>
    );

    return (
        <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center group">
                            <div className="relative">
                                <Sun className="h-9 w-9 text-solar-500 transform transition-transform duration-700 group-hover:rotate-180" />
                                <div className="absolute inset-0 bg-solar-400 blur-lg opacity-20 rounded-full group-hover:opacity-40 transition-opacity"></div>
                            </div>
                            <span className="ml-3 text-xl font-extrabold text-gray-900 tracking-tight">
                                Vishwamangal <span className="text-solar-600">Solar</span>
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/products">Products</NavLink>
                        <NavLink to="/about">About</NavLink>
                        <NavLink to="/contact">Contact</NavLink>
                        {isAuthenticated && !isAdmin && (
                            <NavLink to="/chat">Chat With Admin</NavLink>
                        )}

                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4 ml-4">
                                <Link 
                                    to="/dashboard"
                                    className="flex items-center px-4 py-2 rounded-full text-gray-700 bg-gray-50 border border-gray-200 shadow-sm hover:bg-solar-50 hover:border-solar-200 transition-all cursor-pointer"
                                >
                                    <User className="h-4 w-4 mr-2 text-solar-500" />
                                    <span className="font-bold text-gray-900">{user?.name}</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-300"
                                    title="Logout"
                                >
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3 ml-4 text-black">
                                <Link to="/login" className="text-black hover:text-solar-600 font-medium px-4 py-2 transition-colors">Login</Link>
                                <Link to="/signup" className="bg-gradient-to-r from-solar-500 to-solar-600 text-black px-5 py-2.5 rounded-full font-bold shadow-lg hover:shadow-xl hover:from-solar-600 hover:to-solar-700 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center">
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-solar-600 hover:bg-solar-50 focus:outline-none transition-colors"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
                    <div className="px-4 pt-2 pb-4 space-y-1">
                        {['/', '/products', '/about', '/contact', ...(isAuthenticated && !isAdmin ? ['/chat'] : [])].map((path) => (
                            <Link 
                                key={path}
                                to={path} 
                                className={`block px-3 py-3 rounded-md text-base font-medium transition-colors ${
                                    isActive(path) 
                                    ? 'bg-solar-50 text-solar-700' 
                                    : 'text-gray-700 hover:text-solar-600 hover:bg-gray-50'
                                }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {path === '/' ? 'Home' : path === '/chat' ? 'Chat With Admin' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                            </Link>
                        ))}
                        
                        {isAuthenticated ? (
                            <>
                                <div className="border-t border-gray-100 my-2 pt-2"></div>
                                <Link 
                                    to="/dashboard"
                                    className="block px-3 py-3 rounded-md text-base font-medium text-gray-900 bg-solar-50 hover:bg-solar-100 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Hi, <span className="font-bold">{user?.name}</span>
                                </Link>
                                <button 
                                    onClick={() => { handleLogout(); setIsOpen(false); }} 
                                    className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="border-t border-gray-100 my-2 pt-2"></div>
                                <Link 
                                    to="/login" 
                                    className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-solar-600 hover:bg-gray-50"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/signup" 
                                    className="block px-3 py-3 rounded-md text-base font-medium text-solar-700 hover:bg-solar-50 font-bold"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

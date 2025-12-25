import React, { useEffect, useState } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';

const WebsiteTour = () => {
    const { siteConfig } = useSiteConfig();
    const { user, isAuthenticated } = useAuth(); // Destructure isAuthenticated
    const location = useLocation();
    const [hasSeenTour, setHasSeenTour] = useState(false);

    useEffect(() => {
        const seen = localStorage.getItem('solar_app_tour_seen');
        if (seen) setHasSeenTour(true);
    }, []);

    useEffect(() => {
        const validPaths = ['/', '/login', '/signup', '/about'];
        // Only trigger if enabled, not seen, and on a valid path
        if (
            siteConfig?.userExperience?.tourEnabled && 
            !hasSeenTour && 
            validPaths.includes(location.pathname)
        ) {
            // Delay slightly to ensure elements render
            const timer = setTimeout(() => {
                startTour();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [siteConfig, hasSeenTour, location.pathname, isAuthenticated]);

    const startTour = () => {
        let steps = [];

        // Shared steps for end of tour
        const guestSteps = [
            { 
                element: 'a[href="/login"]', 
                popover: { title: 'Login', description: 'Already have an account? Sign in here.', side: "left", align: 'center' } 
            },
            { 
                element: 'a[href="/signup"]', 
                popover: { title: 'Join Us', description: 'New here? Create a free account to get started.', side: "left", align: 'center' } 
            },
            { 
                element: '#tour-reset-btn', 
                popover: { title: 'Need Help?', description: 'Click this star icon to see this help again.', side: "left", align: 'center' } 
            }
        ];

        const authSteps = [
            { 
                element: 'a[href="/dashboard"]', 
                popover: { title: 'Your Account', description: 'See your Order Status and Profile here.', side: "bottom", align: 'center' } 
            },
            { 
                element: '#tour-reset-btn', 
                popover: { title: 'Need Help?', description: 'Click this star icon to see this help again.', side: "left", align: 'center' } 
            }
        ];

        if (location.pathname === '/login') {
            steps = [
                { 
                    element: 'input[name="email"]', 
                    popover: { title: 'Email', description: 'Enter your registered email here.', side: "right", align: 'center' } 
                },
                { 
                    element: 'input[name="password"]', 
                    popover: { title: 'Password', description: 'Enter your secure password.', side: "right", align: 'center' } 
                },
                { 
                    element: 'button[type="submit"]', 
                    popover: { title: 'Sign In', description: 'Click here to access your account.', side: "bottom", align: 'center' } 
                },
                { 
                    element: 'a[href="/signup"]', 
                    popover: { title: 'New User?', description: 'Create a new account here.', side: "bottom", align: 'center' } 
                }
            ];
        } else if (location.pathname === '/signup') {
            steps = [
                { 
                    element: 'form', 
                    popover: { title: 'Join Us', description: 'Fill in your details to create your account.', side: "right", align: 'start' } 
                },
                { 
                    element: 'input[name="password"]', 
                    popover: { title: 'Security', description: 'Choose a strong password.', side: "left", align: 'center' } 
                },
                { 
                    element: 'button[type="submit"]', 
                    popover: { title: 'Create Account', description: 'Click to finish registration.', side: "bottom", align: 'center' } 
                },
                { 
                    element: 'a[href="/login"]', 
                    popover: { title: 'Already Registered?', description: 'Login with your existing account.', side: "bottom", align: 'center' } 
                }
            ];
        } else if (location.pathname === '/about') {
            const aboutSteps = [
                { 
                    element: 'h1', 
                    popover: { title: 'Our Story', description: 'Learn about our mission to empower clean energy.', side: "bottom", align: 'center' } 
                },
                { 
                    element: 'h2', // Mission Section
                    popover: { title: 'Our Mission', description: 'We provide high-quality solar solutions for a greener future.', side: "top", align: 'center' } 
                },
                { 
                    element: '.mb-24 > h2', // "Meet Our Leadership"
                    popover: { title: 'Leadership', description: 'Meet the experts driving our vision.', side: "top", align: 'center' } 
                },
                { 
                    element: '.bg-footer', // Core Values
                    popover: { title: 'Core Values', description: 'Quality, Transparency, and Service are our promise.', side: "top", align: 'center' } 
                }
            ];
            // Append shared steps
            steps = [...aboutSteps, ...(isAuthenticated ? authSteps : guestSteps)];
        } else {
            // Home Page Steps
            const commonSteps = [
                { 
                    element: '#tour-welcome', 
                    popover: { 
                        title: 'Welcome!', 
                        description: siteConfig?.userExperience?.welcomeMessage || 'Welcome! Let us show you how to use this website.',
                        side: "bottom", 
                        align: 'start' 
                    } 
                },
                { 
                    element: 'a[href="/products"]', 
                    popover: { 
                        title: 'Solar Products', 
                        description: 'Click here to see our Solar Panels and Inverters.', 
                        side: "bottom", 
                        align: 'start' 
                    } 
                },
                { 
                    element: 'a[href="/about"]', 
                    popover: { 
                        title: 'About Us', 
                        description: 'Read our story and mission here.', 
                        side: "bottom", 
                        align: 'start' 
                    } 
                },
                { 
                    element: 'a[href="/contact"]', 
                    popover: { 
                        title: 'Contact Us', 
                        description: 'Need help? Click here to call or message us.', 
                        side: "bottom", 
                        align: 'start' 
                    } 
                }
            ];

            // Append shared steps
            steps = [...commonSteps, ...(isAuthenticated ? authSteps : guestSteps)];
        }

        const driverObj = driver({
            showProgress: true,
            animate: true,
            popoverClass: 'driverjs-theme', // Use our custom theme
            steps: steps,
            onDestroyed: () => {
                localStorage.setItem('solar_app_tour_seen', 'true');
                setHasSeenTour(true);
            },
            nextBtnText: 'Next >',
            prevBtnText: '< Back',
            doneBtnText: 'Finish'
        });

        driverObj.drive();
    };

    return null; // Logic only component
};

export default WebsiteTour;

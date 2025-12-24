import React from 'react';
import tataLogo from '../assets/partners/tata.png';
import waareeLogo from '../assets/partners/waaree.png';
import adaniLogo from '../assets/partners/adani.png';
import havellsLogo from '../assets/partners/havells.png';
import polycabLogo from '../assets/partners/polycab.png';
import utlLogo from '../assets/partners/utl.png';

const partners = [
    { name: 'TATA Power Solar', logo: tataLogo },
    { name: 'WAAREE', logo: waareeLogo },
    { name: 'Adani Solar', logo: adaniLogo },
    { name: 'Havells', logo: havellsLogo },
    { name: 'Polycab', logo: polycabLogo },
    { name: 'UTL Solar', logo: utlLogo },
];

const TrustedPartners = () => {
    return (
        <section className="py-16 bg-body animate-on-scroll">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-body-foreground mb-12">
                    Trusted Brands & Partners
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
                    {partners.map((partner, index) => (
                        <div 
                            key={index} 
                            className="group relative flex items-center justify-center p-4 w-full h-32 bg-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                            style={{ backgroundColor: 'var(--card-bg)', color: 'var(--card-text)' }}
                        >
                            {partner.logo ? (
                                <img 
                                    src={partner.logo} 
                                    alt={`${partner.name} logo`} 
                                    className="max-h-20 w-auto transition-transform duration-300 group-hover:scale-110"
                                />
                            ) : (
                                <span className="text-lg font-bold text-card-foreground/50 group-hover:text-primary-600 transition-colors text-center">
                                    {partner.name}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustedPartners;

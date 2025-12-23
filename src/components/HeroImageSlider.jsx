import { useEffect, useState } from 'react';

const images = [
  "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=400&q=80", // Existing working one
  "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=400&q=80", // Solar Roof
  "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=400&q=80", // Solar Panels
  "https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?auto=format&fit=crop&w=400&q=80", // Solar Farm
  "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=400&q=80", // Close up
];

const HeroImageSlider = () => {
    // Duplicate images to create endless loop effect
    const sliderImages = [...images, ...images];

    return (
        <div className="w-full max-w-5xl mx-auto overflow-hidden py-8 mask-gradient mb-6">
            <div className="flex animate-marquee hover:pause">
                {sliderImages.map((src, index) => (
                    <div key={index} className="flex-shrink-0 mx-3 w-64 h-40 md:w-80 md:h-48 rounded-xl overflow-hidden shadow-lg border-2 border-solar-200 transform transition-transform hover:scale-105">
                        <img 
                            src={src} 
                            alt={`Solar Project ${index}`} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HeroImageSlider;

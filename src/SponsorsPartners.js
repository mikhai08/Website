import React from 'react';

const SponsorsPartners = ({ darkMode }) => {
  const logos = Array.from({ length: 7 }, (_, i) => `/${i + 1}.png`);

  return (
    <section className={`py-16 ${darkMode ? 'bg-[#0B1120] text-white' : 'bg-white text-black'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Our sponsors & partners</h2>
        <div className="relative overflow-hidden" style={{ height: '100px' }}>
          <div className="flex animate-scroll" style={{ width: '200%' }}>
            {[...logos, ...logos].map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt={`Partner logo ${(index % logos.length) + 1}`}
                className={`h-12 mx-8 object-contain flex-shrink-0 ${darkMode ? 'brightness-0 invert' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsPartners;
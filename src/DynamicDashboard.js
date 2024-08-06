import React, { useState, useEffect, useRef } from 'react';

const DynamicDashboard = () => {
  const [zoom, setZoom] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollPercentage = Math.max(0, Math.min(1, 1 - (rect.bottom / window.innerHeight)));
      setZoom(scrollPercentage * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-6xl mx-auto" style={{ height: '150vh' }}>
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="relative w-full max-w-4xl" style={{ paddingTop: '56.25%' }}> {/* 16:9 aspect ratio */}
          <img 
            src="/laptop.png" 
            alt="Laptop" 
            className="absolute top-0 left-0 w-full h-full object-contain"
          />
          <div 
            className="absolute top-[3.3%] left-[11.5%] right-[11.5%] bottom-[20%] overflow-hidden bg-white"
          >
            <img 
              src="/dashboard.png" 
              alt="Dashboard" 
              className="absolute top-0 left-0 w-full transition-transform duration-300 ease-out"
              style={{
                transform: `scale(${1 + (zoom * 0.002)})`,
                transformOrigin: 'top left',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicDashboard;
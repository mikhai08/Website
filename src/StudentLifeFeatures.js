import React, { useEffect, useRef } from 'react';
import { Zap } from 'lucide-react';

const StudentLifeFeatures = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      const scrollAnimation = () => {
        if (scrollElement.scrollLeft >= scrollElement.scrollWidth / 2) {
          scrollElement.scrollLeft = 0;
        } else {
          scrollElement.scrollLeft += 1;
        }
      };

      const animationId = setInterval(scrollAnimation, 50);

      return () => clearInterval(animationId);
    }
  }, []);

  const features = [
    { icon: '🎉', name: 'Upcoming Events' },
    { icon: '🏫', name: 'Campus Life Experience' },
    { icon: '🚌', name: 'Campus Transport' },
    { icon: '📚', name: 'Open Study Spots' },
    { icon: '🍽️', name: 'Dining Hall Menus' },
    { icon: '🧘', name: 'Wellness Resources' },
    { icon: '💰', name: 'Student Deals' },
    { icon: '📰', name: 'Campus News' },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center mb-8">
          <Zap className="w-6 h-6 text-blue-500 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Coming Soon - Student Life
          </h2>
        </div>
        <div className="overflow-hidden" style={{ height: '180px' }}>
          <div
            ref={scrollRef}
            className="flex animate-scroll space-x-4"
            style={{ width: '200%' }}
          >
            {[...features, ...features].map((feature, index) => (
              <div
                key={index}
                className="flex-none w-48 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center justify-center"
              >
                <span className="text-3xl mb-2">{feature.icon}</span>
                <p className="text-sm text-center text-gray-700 dark:text-gray-300">
                  {feature.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentLifeFeatures;
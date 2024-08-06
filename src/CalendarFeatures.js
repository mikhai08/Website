import React, { useEffect, useRef } from 'react';
import { Calendar, Search, Palette, Save, Brain, BarChart2, TrendingUp, Share2, BookOpen, Star } from 'lucide-react';

const CalendarFeatures = () => {
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
    { icon: Search, name: 'Easy to use search bar' },
    { icon: Palette, name: 'Color coded calendar' },
    { icon: Save, name: 'Save multiple schedules' },
    { icon: Brain, name: 'Let AI plan schedule for you' },
    { icon: BarChart2, name: 'Access unique course statistics' },
    { icon: TrendingUp, name: 'See the hottest picks and sleepers' },
    { icon: Share2, name: 'Share calendar with friends' },
    { icon: BookOpen, name: 'Plan semesters ahead' },
    { icon: Star, name: 'View professor ratings and benchmarks' },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center mb-8">
          <Calendar className="w-6 h-6 text-indigo-500 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Smart Calendar Features
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
                <feature.icon className="w-8 h-8 text-indigo-500 mb-2" />
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

export default CalendarFeatures;
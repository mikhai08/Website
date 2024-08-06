import React, { useEffect, useRef, useState } from 'react';
import { Clock, Users, Briefcase, Brain } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, isActive }) => (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 ${isActive ? 'scale-105' : 'scale-95 opacity-50'}`}>
      <Icon className={`w-12 h-12 mb-4 ${isActive ? 'text-blue-500' : 'text-gray-400 dark:text-gray-500'}`} />
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );

const SlidingFeatures = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);

  const features = [
    {
      icon: Clock,
      title: "Time Management",
      description: "Optimize your study schedule and balance academic life with personal commitments."
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description: "Connect with peers, share resources, and engage in group study sessions."
    },
    {
      icon: Briefcase,
      title: "Career Preparation",
      description: "Access internship opportunities and career guidance tailored to your academic path."
    },
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Receive personalized learning recommendations and performance analytics."
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const sectionTop = sectionRef.current.offsetTop;
        const sectionHeight = sectionRef.current.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        const index = Math.floor((scrollPosition - sectionTop) / (sectionHeight / features.length));
        setActiveIndex(Math.max(0, Math.min(index, features.length - 1)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [features.length]);

  return (
    <section ref={sectionRef} className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12 text-center dark:text-white">
          Get Better Results with<br />
          <span className="text-blue-500">Real-World Use Cases</span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 text-center max-w-3xl mx-auto">
          Panda offers a comprehensive suite of features designed to enhance your academic journey and prepare you for future success.
        </p>
        <div className="space-y-24">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center justify-center">
              <FeatureCard {...feature} isActive={index === activeIndex} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SlidingFeatures;
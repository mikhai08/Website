import React, { useState, useEffect, useRef } from 'react';
import { Calendar, FileText, Cloud, BarChart,  List, Clock, Layout, Moon, Sun } from 'lucide-react';
import DynamicDashboard from './DynamicDashboard';
import SponsorsPartners from './SponsorsPartners';
import FAQ from './FAQ';
import DegreePlanning from './degreeplanner/DegreePlanning'; // Adjust the path as needed
import { DarkModeProvider } from './degreeplanner/DarkModeContext'; 
import SlidingFeatures from './SlidingFeatures';
import StudentLifeFeatures from './StudentLifeFeatures';
import CalendarFeatures from './CalendarFeatures';
import CareerPage from './CareerPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Button = ({ children, variant = 'default', size = 'md', ...props }) => {
    const baseStyles = "font-semibold rounded-md transition-colors";
    const variantStyles = {
      default: "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700",
      outline: "bg-white text-blue-500 border border-blue-500 hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700"
    };
    const sizeStyles = {
      sm: "px-2 py-1 text-sm",
      md: "px-4 py-2",
      lg: "px-6 py-3 text-lg"
    };
  
    return (
      <button 
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
        {...props}
      >
        {children}
      </button>
    );
  };



  const LaptopMockup = () => {
    const imageRef = useRef(null);
  
    useEffect(() => {
      const handleScroll = () => {
        if (imageRef.current) {
          const scrollPosition = window.scrollY;
          imageRef.current.style.transform = `translateY(${scrollPosition * 0.1}px)`;
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    return (
      <div className="relative w-full max-w-4xl mx-auto overflow-hidden" style={{ height: '600px' }}>
        <svg className="w-full h-auto absolute top-0 left-0" viewBox="0 0 1280 854" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_ii)">
            <path fillRule="evenodd" clipRule="evenodd" d="M1280 831C1280 843.703 1269.7 854 1257 854H23C10.2975 854 0 843.703 0 831V39C0 17.4609 17.4609 0 39 0H1241C1262.54 0 1280 17.4609 1280 39V831ZM1221 50.5C1221 41.3873 1213.61 34 1204.5 34H75.5C66.3873 34 59 41.3873 59 50.5V750.5C59 759.613 66.3873 767 75.5 767H1204.5C1213.61 767 1221 759.613 1221 750.5V50.5Z" fill="url(#paint0_linear)"/>
          </g>
          <defs>
            <filter id="filter0_ii" x="-4" y="-4" width="1288" height="862" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="4" dy="4"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="-4" dy="-4"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="effect1_innerShadow" result="effect2_innerShadow"/>
            </filter>
            <linearGradient id="paint0_linear" x1="640" y1="0" x2="640" y2="854" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2B2B2B"/>
              <stop offset="1" stopColor="#1A1A1A"/>
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute top-[4%] left-[4.6%] right-[4.6%] bottom-[10.2%] overflow-hidden">
          <img 
            ref={imageRef}
            src="/image.png" 
            alt="Dashboard" 
            className="w-full h-auto"
            style={{
              transform: 'translateY(0)',
              transition: 'transform 0.1s ease-out',
            }}
          />
        </div>
      </div>
    );
  };
  
  // ... (rest of the code remains the same)
  
  const Header = ({ darkMode, setDarkMode, onCareerClick }) => (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <img src="/panda-logo.png" alt="Panda Logo" className="h-8 w-8 mr-2" />
            <span className="text-xl font-semibold dark:text-white">Panda</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#top" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Home</a>
            <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Features</a>
            <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Pricing</a>
            <button onClick={onCareerClick} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Careers</button>
          </nav>
          <div className="flex items-center space-x-4">
            <Button>Book a Demo →</Button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            >
              {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-700 dark:text-gray-300" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
  
  const FeatureCard = ({ icon, title, description, onClick }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 cursor-pointer" onClick={onClick}>
      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-300 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <Button variant="outline" size="sm">Learn More →</Button>
    </div>
  );
  
  const FeatureSection = ({ setSelectedFeature }) => (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold mb-12 text-center dark:text-white">Unleashing the Potential: Our Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<img src="/canvaslogo.png" alt="Canvas Logo" className="w-8 h-8" />}
            title="Canvas Integration"
            description="Give us access to your Token for full gamification of your academic progress"
            onClick={() => setSelectedFeature('dashboard')}
          />
          <FeatureCard
            icon={<FileText size={24} />}
            title="Degree Planner"
            description="Easy drag-and-drop interface to plan your degree"
            onClick={() => setSelectedFeature('degreePlanner')}
          />
          <FeatureCard
            icon={<Calendar size={24} />}
            title="Calendar"
            description="Plan and save multiple course schedules"
            onClick={() => setSelectedFeature('calendar')}
          />
          <FeatureCard
            icon={<Cloud size={24} />}
            title="Cloud"
            description="Organize and store your course files and notes"
            onClick={() => setSelectedFeature('cloud')}
          />
          <FeatureCard
            icon={<BarChart size={24} />}
            title="Progress"
            description="Track your academic progress and requirements"
            onClick={() => setSelectedFeature('progress')}
          />
          <FeatureCard
            icon={<Clock size={24} />}
            title="Study Zone"
            description="Pomodoro timer and AI-powered study suggestions"
            onClick={() => setSelectedFeature('studyZone')}
          />
          <FeatureCard
            icon={<Layout size={24} />}
            title="Academic Hub"
            description="View schedule, assignments, and performance analytics"
            onClick={() => setSelectedFeature('academicHub')}
          />
          <FeatureCard
            icon={<List size={24} />}
            title="Kanban To-Do"
            description="Drag-and-drop task management for assignments"
            onClick={() => setSelectedFeature('kanbanToDo')}
          />
        </div>
      </div>
    </section>
  );
  
  const FeatureDetails = ({ feature, onClose }) => {
    const features = {
      dashboard: {
        title: "Canvas Integration",
        description: "Get a comprehensive overview of your academic journey with our intuitive dashboard. Access all your important information at a glance.",
        image: ""
      },
      degreePlanner: {
        title: "Degree Planner",
        description: "Plan your degree with ease using our drag-and-drop interface. Visualize your academic path and ensure you're meeting all requirements."
      },
      calendar: {
        title: "Calendar",
        description: "Prepare for course registration by creating and saving multiple schedule scenarios. Be ready when it's time to enroll in your classes."
      },
      cloud: {
        title: "Cloud Storage",
        description: "Keep all your course files and notes organized by course. Access your study materials easily when preparing for exams or reviewing content."
      },
      progress: {
        title: "Progress Tracker",
        description: "Monitor your academic progress in real-time. See which requirements you've fulfilled and what's left to complete for your chosen major."
      },
      studyZone: {
        title: "Study Zone",
        description: "Boost your productivity with our Pomodoro timer. Track study time for each subject and receive AI-powered suggestions to improve your study habits."
      },
      academicHub: {
        title: "Academic Hub",
        description: "View your current schedule, upcoming assignments, and past grades. Analyze your performance with grade distribution graphs and academic trends."
      },
      kanbanToDo: {
        title: "Kanban To-Do Board",
        description: "Manage your tasks efficiently with our Kanban board. Automatically populated with assignments and deadlines, helping you stay organized and on top of your workload."
      }
    };
  
    const selectedFeature = features[feature];

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{selectedFeature.title}</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">{selectedFeature.description}</p>
                {selectedFeature.image && (
                  <img src={selectedFeature.image} alt={selectedFeature.title} className="mt-4 rounded-lg shadow-md" />
                )}
              </div>
              <div className="items-center px-4 py-3">
                <Button onClick={onClose}>Close</Button>
              </div>
            </div>
          </div>
        </div>
      );
    };
  
  
    const PricingCard = ({ title, monthlyPrice, yearlyPrice, features, isPopular, onGetStarted }) => {
      const [isYearly, setIsYearly] = useState(false);
      const price = isYearly ? yearlyPrice : monthlyPrice;
    
      return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${isPopular ? 'border-2 border-blue-500' : ''}`}>
          <h3 className="text-xl font-semibold mb-4 dark:text-white">{title}</h3>
          <p className="text-3xl font-bold mb-6 dark:text-white">
            ${price} {isYearly ? '/year' : '/month'}
          </p>
          {title !== "Free" && (
            <div className="flex mb-6">
              <button
                onClick={() => setIsYearly(false)}
                className={`mr-2 px-3 py-1 rounded-full ${!isYearly ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-3 py-1 rounded-full ${isYearly ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                Yearly
              </button>
            </div>
          )}
          <ul className="space-y-2 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
          <button
            onClick={() => onGetStarted(title, isYearly)}
            className={`w-full py-2 px-4 rounded-md ${isPopular ? 'bg-blue-500 text-white' : 'bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-blue-300'}`}
          >
            Get started for free →
          </button>
        </div>
      );
    };
    
    const PreCheckoutModal = ({ isOpen, onClose, plan, isYearly }) => {
      if (!isOpen) return null;
    
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Get Started with {plan}</h2>
            <p className="mb-4 dark:text-gray-300">You've selected the {plan} plan ({isYearly ? 'Yearly' : 'Monthly'}). Enter your details to start your free trial.</p>
            <form>
              <input type="text" placeholder="Full Name" className="w-full mb-4 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              <input type="email" placeholder="Email" className="w-full mb-4 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              <input type="password" placeholder="Password" className="w-full mb-4 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Start Free Trial</button>
            </form>
            <button onClick={onClose} className="mt-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">Close</button>
          </div>
        </div>
      );
    };
    
    const PricingSection = () => {
      const [modalOpen, setModalOpen] = useState(false);
      const [selectedPlan, setSelectedPlan] = useState(null);
      const [isYearly, setIsYearly] = useState(false);
    
      const handleGetStarted = (plan, yearly) => {
        setSelectedPlan(plan);
        setIsYearly(yearly);
        setModalOpen(true);
      };
    
      const pricingPlans = [
        {
          title: "Free",
          monthlyPrice: 0,
          yearlyPrice: 0,
          features: [
            "Unlimited access to Basic Degree Planner",
            "Unlimited access to Basic Calendar",
            "Up to 2mb in cloud storage",
            "5 messages to the actionable AI",
            "Access to Canvas Basic Analytics"
          ]
        },
        {
          title: "Premium",
          monthlyPrice: 2,
          yearlyPrice: 20,
          features: [
            "Import your transcript",
            "Access to Premium Degree Planner",
            "Access to Premium Calendar",
            "10 messages per day to the actionable AI",
            "Up to 20mb in cloud storage"
          ],
          isPopular: true
        },
        {
          title: "Gold",
          monthlyPrice: 5,
          yearlyPrice: 50,
          features: [
            "Unlimited AI",
            "Unlimited Cloud",
            "Access to all analytics",
            "Personalized dashboard",
            "Access to IOS widgets"
          ]
        }
      ];
    
      return (
        <section className="py-16 bg-gray-100 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Pricing Plans</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <PricingCard
                  key={index}
                  {...plan}
                  onGetStarted={handleGetStarted}
                />
              ))}
            </div>
          </div>
          <PreCheckoutModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            plan={selectedPlan}
            isYearly={isYearly}
          />
        </section>
      );
    };

  

    const App = () => {
      const [selectedFeature, setSelectedFeature] = useState(null);
      const [darkMode, setDarkMode] = useState(false);
      const [showCareerPage, setShowCareerPage] = useState(false);
    
      useEffect(() => {
        if (darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }, [darkMode]);
    
      const toggleCareerPage = () => {
        setShowCareerPage(!showCareerPage);
      };
    
      return (
        <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 ${darkMode ? 'dark' : ''}`}>
          <Header darkMode={darkMode} setDarkMode={setDarkMode} onCareerClick={toggleCareerPage} />
          {showCareerPage ? (
            <CareerPage onClose={toggleCareerPage} />
          ) : (
            <main className="pt-20" id="top">
              {/* Hero Section */}
              <section className="px-4 sm:px-6 lg:px-8 mb-20">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4 dark:text-white">
                      Get Ahead In College with Panda<br />The First AI Dashboard Built For Students By Students
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                      Embark on a journey of data exploration like never before with Panda, your<br />trusted navigator through the vast seas of academic information.
                    </p>
                    <div className="space-x-4">
                      <Button variant="outline">Read More →</Button>
                      <Button variant="default">Book a Demo →</Button>
                    </div>
                  </div>
                </div>
              </section>
        
              {/* Laptop Mockup Section */}
              <section className="relative mb-20">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-white dark:from-blue-900 dark:to-gray-900 rounded-3xl transform -skew-y-6"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <LaptopMockup />
                </div>
              </section>
    
              {/* Sponsors & Partners Section */}
              <SponsorsPartners darkMode={darkMode} />
        
              {/* Feature Section */}
              <section id="features">
                <FeatureSection setSelectedFeature={setSelectedFeature} />
              </section>
    
              <CalendarFeatures />
        
              {/* Pricing Section */}
              <section id="pricing">
                <PricingSection />
              </section>
        
              {/* Key Feature Section */}
              <section className="py-16 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="text-4xl font-bold mb-12 text-center dark:text-white">Plan out degree with our Planner</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                      <ul className="space-y-4">
                        <li className="flex items-center space-x-2">
                          <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-gray-700 dark:text-gray-300">Comprehensive degree planning</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-gray-700 dark:text-gray-300">Intuitive drag-and-drop interface</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-gray-700 dark:text-gray-300">Real-time requirement tracking</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Our degree planner offers a comprehensive solution for organizing your academic journey. With an intuitive interface and real-time updates, you can easily plan your courses, track your progress, and ensure you're meeting all your degree requirements.
                      </p>
                      <Button>Book a Demo →</Button>
                    </div>
                  </div>
                </div>
              </section>
        
              {/* Degree Planner Section */}
              <section className="py-16 bg-gray-100 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="text-4xl font-bold mb-12 text-center dark:text-white">Degree Planner</h2>
                  <DarkModeProvider initialDarkMode={darkMode}>
                    <DegreePlanning />
                  </DarkModeProvider>
                </div>
              </section>
    
              {/* Sliding Features Section */}
              <SlidingFeatures />
    
              {/* Student Life Features Section */}
              <StudentLifeFeatures />
    
              {/* FAQ Section */}
              <FAQ />
        
              {/* Feature Details Modal */}
              {selectedFeature && (
                <FeatureDetails feature={selectedFeature} onClose={() => setSelectedFeature(null)} />
              )}
            </main>
          )}
        </div>
      );
    };

export default App;
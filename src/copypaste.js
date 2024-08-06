import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';

const Header = () => (
  <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5C7.58172 5 4 8.58172 4 13C4 17.4183 7.58172 21 12 21C16.4183 21 20 17.4183 20 13" stroke="black" strokeWidth="2" strokeLinecap="round"/>
            <path d="M20 9C20 7.89543 19.1046 7 18 7C16.8954 7 16 7.89543 16 9C16 10.1046 16.8954 11 18 11C19.1046 11 20 10.1046 20 9Z" fill="black"/>
          </svg>
          <span className="ml-2 text-xl font-semibold">Sparo</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-500 hover:text-gray-900">Home</a>
          <a href="#" className="text-gray-500 hover:text-gray-900">About</a>
          <a href="#" className="text-gray-500 hover:text-gray-900">Features</a>
          <a href="#" className="text-gray-500 hover:text-gray-900">Pricing</a>
          <a href="#" className="text-gray-500 hover:text-gray-900">Contact</a>
        </nav>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Book a Demo →
        </button>
      </div>
    </div>
  </header>
);

const FeatureSection = () => (
  <section className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-12">
        <FeatureItem
          icon={<div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">+</div>}
          title="Seamlessly integrate Google Maps to provide"
        />
        <FeatureItem
          icon={<div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">⚡</div>}
          title="Integrate a secure payment gateway such as Stripe or PayPal"
        />
        <FeatureItem
          icon={<div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">🌵</div>}
          title="Allow users to schedule directly from their calendars."
        />
      </div>
    </div>
  </section>
);

const FeatureItem = ({ icon, title }) => (
  <div className="flex items-center space-x-4">
    {icon}
    <h3 className="text-2xl font-bold">{title}</h3>
  </div>
);

const PricingSection = () => (
  <section className="py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-12">Pricing Plans</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <PricingCard
          title="Free"
          price="Free for everyone"
          features={[
            "Unlimited Emails",
            "250 Templates",
            "Import and export",
            "All integrations, APIs, webhooks",
            "10000 Contacts"
          ]}
        />
        <PricingCard
          title="Standard"
          price="$8 per user/month"
          features={[
            "Unlimited Emails",
            "500 Templates",
            "Import and export",
            "All integrations, APIs, webhooks",
            "10000 Contacts"
          ]}
          isPopular={true}
        />
        <PricingCard
          title="Plus"
          price="$14 per user/month"
          features={[
            "Unlimited members",
            "1000 Templates",
            "Import and export",
            "All integrations, APIs, webhooks",
            "10000 Contacts"
          ]}
        />
      </div>
    </div>
  </section>
);

const PricingCard = ({ title, price, features, isPopular }) => (
  <div className={`bg-white rounded-lg shadow-lg p-6 ${isPopular ? 'border-2 border-blue-500' : ''}`}>
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <p className="text-3xl font-bold mb-6">{price}</p>
    {title !== "Free" && (
      <div className="flex mb-6">
        <button className={`mr-2 px-3 py-1 rounded-full ${isPopular ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
          Monthly
        </button>
        <button className="px-3 py-1 rounded-full bg-gray-200">
          Yearly
        </button>
      </div>
    )}
    <ul className="space-y-2 mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {feature}
        </li>
      ))}
    </ul>
    <button className={`w-full py-2 px-4 rounded-md ${isPopular ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-500'}`}>
      Get started for free →
    </button>
  </div>
);

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <header className="flex justify-between items-center mb-8">
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5C7.58172 5 4 8.58172 4 13C4 17.4183 7.58172 21 12 21C16.4183 21 20 17.4183 20 13" stroke="black" strokeWidth="2" strokeLinecap="round"/>
          <path d="M20 9C20 7.89543 19.1046 7 18 7C16.8954 7 16 7.89543 16 9C16 10.1046 16.8954 11 18 11C19.1046 11 20 10.1046 20 9Z" fill="black"/>
        </svg>
        
        <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
          Pre-Order Sparo Beta Today
        </button>
        
        <button className="flex items-center px-3 py-1 bg-white border border-gray-300 rounded-full text-sm">
          <img src="/api/placeholder/20/20" alt="Google logo" className="w-5 h-5 mr-2" />
          Coming Soon
        </button>
      </header>
      <Header />

      <main className="max-w-3xl mx-auto text-center">
        <div className="mb-8">
          <button className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
            Explore the Beta Program
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5C7.58172 5 4 8.58172 4 13C4 17.4183 7.58172 21 12 21C16.4183 21 20 17.4183 20 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M20 9C20 7.89543 19.1046 7 18 7C16.8954 7 16 7.89543 16 9C16 10.1046 16.8954 11 18 11C19.1046 11 20 10.1046 20 9Z" fill="currentColor"/>
            </svg>
          </button>
        </div>

        <p className="text-sm mb-12">
          By students at <a href="#" className="text-blue-600 font-medium">The University of Pennsylvania & The Wharton School</a>
          <img src="/api/placeholder/20/20" alt="University logo" className="inline-block w-5 h-5 ml-2" />
        </p>

        <h1 className="text-6xl font-bold mb-4">
          Tomorrow's approach to <span className="text-blue-600">Recruiting.</span>
        </h1>

        <p className="text-xl mb-8">
          AI-powered recruiting tools to get your name in the conversation.
        </p>

        <div className="flex items-center justify-center mb-8">
          <input
            type="email"
            placeholder="Enter your email here"
            className="w-96 px-4 py-3 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-6 py-3 bg-blue-600 text-white rounded-r-full font-medium">
            Join the waitlist
          </button>
        </div>

        <a href="#" className="text-blue-600 font-medium">
          Learn more ↓
        </a>

        <div className="flex justify-center space-x-4 mt-8">
          <a href="#" className="text-gray-400 hover:text-pink-500">
            <Instagram size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-700">
            <Linkedin size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-red-500">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.3 4.5H3.7C2.2 4.5 1 5.7 1 7.2v9.6c0 1.5 1.2 2.7 2.7 2.7h16.6c1.5 0 2.7-1.2 2.7-2.7V7.2c0-1.5-1.2-2.7-2.7-2.7zm-1.9 3.8l-6.5 4.1c-.2.1-.4.1-.6 0L4.8 8.3c-.4-.2-.5-.7-.3-1.1.2-.4.7-.5 1.1-.3l6.1 3.9 6.1-3.9c.4-.2.9-.1 1.1.3.2.4.1.9-.3 1.1z" />
            </svg>
          </a>
        </div>

        <h2 className="text-6xl font-bold mt-24 mb-4">
          <span className="text-blue-600">Define</span> your search.
        </h2>

        <p className="text-xl">
          Tell us who <span className="text-blue-600">you</span> are, <span className="text-blue-600">we'll</span> match you with pre-screened firms.
        </p>
        <FeatureSection />
        <PricingSection />
      </main>
    </div>
  );
};

export default App;
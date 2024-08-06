import React from 'react';
import { X, Lightbulb, Users, ArrowUpRight, Scale, Heart, Briefcase, Clock, Award, Coffee, ChevronDown } from 'lucide-react';

const CareerPage = ({ onClose }) => {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20 overflow-y-auto">
        <button
          onClick={onClose}
          className="fixed top-24 right-8 bg-blue-500 text-white p-2 rounded-full"
        >
          <X size={24} />
        </button>
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-8 dark:text-white">
            Join the Team and Make a Difference
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
            We are committed to empowering students with cutting-edge technology that streamlines their academic journey
            and enables them to achieve their full potential.
          </p>
          
          <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">Our Values</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
            Our values serve as the foundation of everything we do. They guide our decisions, actions, and
            interactions with clients, partners, and each other. Our values define who we are and how we
            strive to make a positive impact in the world of education.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ValueCard icon={<Lightbulb />} title="Innovation and Creativity" />
            <ValueCard icon={<Users />} title="Collaboration and Teamwork" />
            <ValueCard icon={<ArrowUpRight />} title="Growth and Development" />
            <ValueCard icon={<Scale />} title="Work-Life Balance" />
            <ValueCard icon={<Heart />} title="Diversity and Inclusion" />
            <ValueCard icon={<Briefcase />} title="Impactful Work" />
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">Job Openings</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
            Join our team and help shape the future of education technology.
          </p>
          
          <div className="space-y-4">
            <JobCategory title="Engineering" />
            <JobCategory title="Sales and Marketing" />
            <JobCategory title="Customer Support" />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">Perks</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
            We offer a range of benefits to support our team members' professional and personal growth.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PerkCard icon={<Briefcase />} title="Competitive Compensation" />
            <PerkCard icon={<Users />} title="Professional Development" />
            <PerkCard icon={<Clock />} title="Flexible Work Arrangements" />
            <PerkCard icon={<Heart />} title="Health and Wellness" />
            <PerkCard icon={<Award />} title="Employee Recognition" />
            <PerkCard icon={<Coffee />} title="Vibrant Company Culture" />
          </div>
        </div>
      </section>
    </div>
  );
};

const ValueCard = ({ icon, title }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
    <div className="text-blue-500 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
    </p>
  </div>
);

const JobCategory = ({ title }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold mb-2 dark:text-white flex justify-between items-center">
      {title}
      <ChevronDown className="text-gray-400" />
    </h3>
  </div>
);

const PerkCard = ({ icon, title }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
    <div className="text-blue-500 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
    </p>
  </div>
);

export default CareerPage;
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-900 dark:text-white">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
      </button>
      {isOpen && <p className="mt-2 text-gray-600 dark:text-gray-300">{answer}</p>}
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "What makes Panda stand out among other student planning tools?",
      answer: "Panda offers a unique combination of AI-powered insights, comprehensive degree planning, and integrated academic performance tracking, all tailored specifically for college students."
    },
    {
      question: "How does Panda help with course selection and degree planning?",
      answer: "Panda's Degree Planner feature allows you to easily drag and drop courses, visualize your academic path, and ensure you're meeting all degree requirements. It also provides AI-driven recommendations based on your academic goals and performance."
    },
    {
      question: "Can Panda integrate with my university's learning management system?",
      answer: "Yes, Panda can integrate with popular LMS platforms like Canvas to pull in your course schedules, assignments, and grades automatically, providing a seamless academic management experience."
    },
    {
      question: "How does Panda's AI assistant help with studying?",
      answer: "Panda's AI assistant analyzes your study habits, course performance, and upcoming deadlines to provide personalized study recommendations, helping you focus on areas that need the most attention."
    },
    {
      question: "Is my data secure with Panda?",
      answer: "Absolutely. We take data security and privacy very seriously. All your data is encrypted, and we comply with FERPA regulations to ensure your academic information remains confidential."
    },
    {
      question: "Can Panda help me manage my time better?",
      answer: "Yes, Panda includes a Kanban-style to-do list and a smart calendar that helps you organize tasks, plan your study sessions, and balance your academic and personal commitments effectively."
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">FAQ</h2>
        <p className="text-center mb-12 text-gray-600 dark:text-gray-300">
          Got questions about Panda? We've got you covered with answers to common queries about our
          features, capabilities, and how we can help you succeed in your academic journey.
        </p>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
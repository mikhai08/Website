import React, { useState, useEffect } from 'react';
import { useDarkMode } from './DarkModeContext';
import { Book, Brain, Globe, Calculator, Lightbulb, Microscope, User, PenTool, Smile, Rocket, Database, Languages } from 'lucide-react';

const genEdRequirements = {
  firstYearFoundations: {
    name: 'First Year Foundations',
    icon: Book,
    color: 'blue',
    requirements: [
      { id: 'writing', name: 'Writing At the Research University', icon: PenTool, courses: ['ENGL105', 'ENGL105i', 'ENGL105H'] },
      { id: 'collegeThriving', name: 'College Thriving', icon: Smile, courses: ['IDST101', 'IDST101i', 'IDST101H'] },
      { id: 'firstYearSeminar', name: 'First Year Seminar or Launch', icon: Rocket, courses: ['COMM88','HIST53', 'COMP50', 'DRAM79', 'ECON54', 'PSYC62'] },
      { id: 'tripleI', name: 'Triple I: Ideas, Information & Inquiry', icon: Brain, courses: ['IDST111', 'IDST112', 'IDST113', 'IDST114', 'IDST115','IDST12'] },
      { id: 'dataLiteracy', name: 'Data Literacy', icon: Database, courses: ['IDST111L', 'IDST112L', 'IDST113L', 'IDST114L', 'IDST115L','IDST126L'] },
      { id: 'globalLanguage', name: 'Global Language Level 3 or Higher', icon: Languages, courses: ['SPAN203', 'FREN203', 'CHIN203', 'GERM203', 'JAPN203'] },
    ]
  },
  focusCapacities: {
    name: 'Focus Capacities',
    icon: Brain,
    color: 'green',
    requirements: [
      { id: 'aestheticAnalysis', name: 'Aesthetic & Interpretive Analysis', icon: User, courses: ['ARTS101', 'ENGL121', 'MUSC143', 'DRAM115', 'COMM140'] },
      { id: 'creativeExpression', name: 'Creative Expression, Practice, & Production', icon: PenTool, courses: ['ARTS102', 'MUSC166', 'DRAM135', 'ENGL130', 'COMM230', 'ECON125'] },
      { id: 'humanPast', name: 'Engagement with the Human Past', icon: Book, courses: ['HIST127', 'CLAS131', 'HIST140', 'RELI103', 'HIST151'] },
      { id: 'ethicValues', name: 'Ethical & Civic Values', icon: User, courses: ['PHIL160', 'POLI150', 'RELI140', 'PHIL165', 'POLI203', 'PHIL101'] },
      { id: 'globalUnderstanding', name: 'Global Understanding & Engagement', icon: Globe, courses: ['ANTH102', 'GEOG120', 'POLI150', 'GLBL210', 'SOCI130'] },
      { id: 'naturalScience', name: 'Natural Scientific Investigation', icon: Microscope, courses: ['BIOL101', 'CHEM101', 'PHYS104', 'ENEC202', 'ASTR101'] },
      { id: 'powerDifference', name: 'Power, Difference, & Inequality', icon: User, courses: ['SOC101', 'WGST101', 'POLI100', 'HIST110', 'AFAM101', 'COMM348'] },
      { id: 'quantReasoning', name: 'Quantitative Reasoning', icon: Calculator, courses: ['MATH110', 'STOR151', 'ECON101', 'PHIL155', 'COMP110', 'STOR155'] },
      { id: 'waysKnowing', name: 'Ways of Knowing', icon: Lightbulb, courses: ['PHIL101', 'ANTH101', 'PSYC101', 'RELI101', 'LING101', 'ECON101'] },
    ]
  },
  empiricalInvestigativeLab: {
    name: 'Empirical Investigative Lab',
    icon: Calculator,
    color: 'purple',
    requirements: [
      { id: 'empiricalLab', name: 'Empirical Laboratory', icon: Calculator, courses: ['BIOL101L', 'CHEM101L', 'PHYS104L', 'ENEC202L', 'ASTR101L'] },
    ]
  },
  reflectionAndIntegration: {
    name: 'Reflection and Integration',
    icon: Lightbulb,
    color: 'orange',
    requirements: [
      { id: 'research', name: 'Research and Discovery', icon: Microscope, courses: ['BIOL395', 'CHEM395', 'PSYC395', 'HIST398', 'ENGL395'] },
      { id: 'highImpact', name: 'High Impact Experience', icon: Rocket, courses: ['BIOL293', 'ENGL293', 'POLI293', 'PSYC293', 'SOCI293', 'BUSI505'] },
      { id: 'communication', name: 'Communication Beyond Carolina', icon: Globe, courses: ['COMM113', 'ENGL313', 'BUSI401', 'JOMC153', 'SPAN300'] },
      { id: 'lifetimeFitness', name: 'Lifetime Fitness (LFIT)', icon: User, courses: ['LFIT101', 'LFIT102', 'LFIT103', 'LFIT104', 'LFIT105', 'LFIT111'] },
    ]
  },
};

const GenEdRequirements = ({ semesters, handleFindCourses, preloadedCourses, apCredits, genEdCourses }) => {
    const { isDarkMode } = useDarkMode();
    const [expandedCategories, setExpandedCategories] = useState({});
    const [satisfiedRequirements, setSatisfiedRequirements] = useState({});
    const [takenCourses, setTakenCourses] = useState([]);
    const flattenGenEdCourses = (genEdCourses) => {
      const flattened = {};
      Object.entries(genEdCourses).forEach(([category, subcategories]) => {
        if (Array.isArray(subcategories)) {
          flattened[category] = subcategories;
        } else {
          Object.entries(subcategories).forEach(([subcategory, courses]) => {
            flattened[subcategory] = courses;
          });
        }
      });
      return flattened;
    };
    
    const flattenedGenEdCourses = flattenGenEdCourses(genEdCourses);
  
    useEffect(() => {
      const getAllTakenCourses = () => [
        ...semesters.flatMap(semester => semester.courses.map(course => course.id)),
        ...preloadedCourses.map(course => course.id)
      ];
    
      const isRequirementSatisfied = (requirement, allTakenCourses) => {
        return requirement.courses.some(courseId => 
          allTakenCourses.includes(courseId) || apCredits.includes(courseId)
        );
      };
    
      const updateSatisfiedRequirements = (allTakenCourses) => {
        const newSatisfiedRequirements = {};
        Object.entries(genEdRequirements).forEach(([category, { requirements }]) => {
          requirements.forEach(req => {
            newSatisfiedRequirements[req.id] = isRequirementSatisfied(req, allTakenCourses);
          });
        });
        setSatisfiedRequirements(newSatisfiedRequirements);
      };
    
      const allTakenCourses = getAllTakenCourses();
      setTakenCourses(allTakenCourses);
      updateSatisfiedRequirements(allTakenCourses);
    }, [semesters, preloadedCourses, apCredits]);
    
  
    
  
    const toggleCategory = (category) => {
      setExpandedCategories(prev => ({
        ...prev,
        [category]: !prev[category]
      }));
    };
  
    const getColorClasses = (color, isMain = false) => {
        const baseColors = {
          blue: { bg: 'bg-blue-500', text: 'text-blue-100', hover: 'hover:bg-blue-600' },
          green: { bg: 'bg-green-500', text: 'text-green-100', hover: 'hover:bg-green-600' },
          purple: { bg: 'bg-purple-500', text: 'text-purple-100', hover: 'hover:bg-purple-600' },
          orange: { bg: 'bg-orange-500', text: 'text-orange-100', hover: 'hover:bg-orange-600' },
        };
      
        const lightColors = {
          blue: { bg: 'bg-blue-100', text: 'text-blue-800', hover: 'hover:bg-blue-200' },
          green: { bg: 'bg-green-100', text: 'text-green-800', hover: 'hover:bg-green-200' },
          purple: { bg: 'bg-purple-100', text: 'text-purple-800', hover: 'hover:bg-purple-200' },
          orange: { bg: 'bg-orange-100', text: 'text-orange-800', hover: 'hover:bg-orange-200' },
        };
      
        const colorSet = isDarkMode ? baseColors[color] : lightColors[color];
        const opacity = isMain ? '' : 'bg-opacity-60';
        
        return `${colorSet.bg} ${opacity} ${colorSet.text} ${colorSet.hover}`;
      };
  
    const renderRequirement = (req, categoryColor) => {
      const isSatisfied = satisfiedRequirements[req.id];
      return (
        <div
          key={req.id}
          className={`flex items-center p-2 mb-2 rounded cursor-pointer ${getColorClasses(categoryColor)} ${isSatisfied ? 'opacity-50' : ''}`}
          onClick={() => handleRequirementClick(req)}
        >
          <req.icon className="mr-2" size={16} />
          <span className="text-sm">{req.name}</span>
          {isSatisfied && <span className="ml-auto">✓</span>}
        </div>
      );
    };
  
    const handleRequirementClick = (requirement) => {
      const availableCourses = flattenedGenEdCourses[requirement.id] || [];
      
      const takenCoursesForRequirement = availableCourses.filter(
        course => takenCourses.includes(course.id)
      );
    
      handleFindCourses({
        ...requirement,
        availableCourses: availableCourses.filter(course => !takenCourses.includes(course.id)),
        takenCourses: takenCoursesForRequirement
      });
    };
  
    const renderRequirementCategory = (category, { name, icon: Icon, color, requirements }) => {
      const satisfiedCount = requirements.filter(req => satisfiedRequirements[req.id]).length;
      const progress = (satisfiedCount / requirements.length) * 100;
    
      return (
        <div key={category} className="mb-4">
          <div 
            className={`flex items-center cursor-pointer p-2 rounded ${getColorClasses(color, true)}`}
            onClick={() => toggleCategory(category)}
          >
            <Icon className="mr-2" size={20} />
            <h3 className="font-semibold">
              {name} ({satisfiedCount}/{requirements.length})
            </h3>
            <span className="ml-auto">{expandedCategories[category] ? '▲' : '▼'}</span>
          </div>
          <div className={`w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2.5 mt-2`}>
            <div
              className={`${getColorClasses(color, true)} h-2.5 rounded-full transition-all duration-300 ease-in-out`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          {expandedCategories[category] && (
            <div className="mt-2 ml-6">
              {requirements.map(req => renderRequirement(req, color))}
            </div>
          )}
        </div>
      );
    };
  
    return (
      <div>
        <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Gen-Ed Requirements
        </h2>
        {Object.entries(genEdRequirements).map(([category, data]) =>
          renderRequirementCategory(category, data)
        )}
      </div>
    );
  };
  
  export default GenEdRequirements;
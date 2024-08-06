import React, { useState, useEffect } from 'react';
import { useDarkMode } from './DarkModeContext';

const csCoreCourses = [
    { id: 'COMP110', name: 'Introduction to Programming and Data Science', credits: 3 },
    { id: 'COMP210', name: 'Data Structures and Analysis', credits: 3 },
    { id: 'COMP211', name: 'Systems Fundamentals', credits: 3 },
    { id: 'COMP301', name: 'Foundations of Programming', credits: 3 },
    { id: 'COMP311', name: 'Computer Organization', credits: 3 },
    { id: 'COMP283', name: 'Discrete Structures', credits: 3 },
  ];

  // Computer Science Electives (COMP courses numbered 420 or higher)
const csElectives = [
  { id: 'COMP420', name: 'Web Programming', credits: 3 },
  { id: 'COMP421', name: 'Files and Databases', credits: 3 },
  { id: 'COMP426', name: 'Modern Web Programming', credits: 3 },
  { id: 'COMP455', name: 'Models of Languages and Computation', credits: 3 },
  { id: 'COMP475', name: 'Introduction to Computer Graphics', credits: 3 },
  { id: 'COMP486', name: 'Applications of Natural Language Processing', credits: 3 },
  { id: 'COMP520', name: 'Compilers', credits: 3 },
  { id: 'COMP521', name: 'Files and Databases', credits: 3 },
  { id: 'COMP530', name: 'Operating Systems', credits: 3 },
  { id: 'COMP535', name: 'Introduction to Computer Security', credits: 3 },
  { id: 'COMP550', name: 'Algorithms and Analysis', credits: 3 },
  { id: 'COMP560', name: 'Artificial Intelligence', credits: 3 },
  { id: 'COMP562', name: 'Introduction to Machine Learning', credits: 3 },
  { id: 'COMP580', name: 'Enabling Technologies', credits: 3 },
  { id: 'COMP585', name: 'Serious Games', credits: 3 },
  ];

  // Additional Electives from other departments
const csAdditionalElectives = [
  { id: 'BIOL525', name: 'Analysis and Interpretation of Sequence-Based Functional Genomics Experiments', credits: 3 },
  { id: 'BIOL554', name: 'Introduction to Computational Neuroscience', credits: 3 },
  { id: 'BIOS512', name: 'Data Science Basics', credits: 3 },
  { id: 'BIOS611', name: 'Introduction to Data Science', credits: 3 },
  { id: 'BIOS635', name: 'Introduction to Machine Learning', credits: 3 },
  { id: 'ECON525', name: 'Advanced Financial Economics', credits: 3 },
  { id: 'ECON573', name: 'Machine Learning and Econometrics', credits: 3 },
  { id: 'INLS318', name: 'Human Computer Interaction', credits: 3 },
  { id: 'INLS418', name: 'Human Factors in System Design', credits: 3 },
  { id: 'INLS509', name: 'Information Retrieval', credits: 3 },
  { id: 'INLS512', name: 'Applications of Natural Language Processing', credits: 3 },
  { id: 'INLS523', name: 'Introduction to Database Concepts and Applications', credits: 3 },
  { id: 'INLS609', name: 'Experimental Information Retrieval', credits: 3 },
  { id: 'INLS613', name: 'Text Mining', credits: 3 },
  { id: 'INLS623', name: 'Database Systems II: Intermediate Databases', credits: 3 },
  { id: 'INLS672', name: 'Web Development II', credits: 3 },
  { id: 'INLS718', name: 'User Interface Design', credits: 3 },
  { id: 'LING401', name: 'Language and Computers', credits: 3 },
  { id: 'LING540', name: 'Mathematical Linguistics', credits: 3 },
  { id: 'MATH566', name: 'Introduction to Numerical Analysis', credits: 3 },
  { id: 'MATH661', name: 'Scientific Computation I', credits: 3 },
  { id: 'PHYS231', name: 'Physical Computing', credits: 3 },
  { id: 'PHYS331', name: 'Numerical Techniques for the Sciences I', credits: 3 },
  { id: 'PSYC559', name: 'Applied Machine Learning in Psychology', credits: 3 },
  { id: 'STOR520', name: 'Statistical Computing for Data Science', credits: 3 },
  { id: 'STOR565', name: 'Machine Learning', credits: 3 },
  { id: 'STOR566', name: 'Introduction to Deep Learning', credits: 3 },
  ];

  // Additional Requirements
const csAdditionalRequirements = [
  { id: 'MATH231', name: 'Calculus of Functions of One Variable I', credits: 4 },
  { id: 'STOR155', name: 'Introduction to Data Models and Inference', credits: 3 },
  ];

  // Combine all Computer Science courses
const allCsCourses = [...csCoreCourses, ...csElectives, ...csAdditionalElectives, ...csAdditionalRequirements];


  
const ComputerScienceMajorRequirements = ({ 
    semesters, 
    handleRequirementClick,
    handleFindCourses,
  }) => {
    const { isDarkMode } = useDarkMode();
    const [csMajorRequirements, setCsMajorRequirements] = useState({
      name: 'Computer Science',
      requirements: [
        {
          id: 'cs_core',
          name: 'Core Courses',
          courses: csCoreCourses.map(course => course.id),
          completed: 0,
          required: csCoreCourses.length
        },
        {
          id: 'cs_electives',
          name: 'COMP Electives (420 or higher)',
          courses: csElectives.map(course => course.id),
          completed: 0,
          required: 2,
          isElective: true
        },
        {
          id: 'cs_additional_electives',
          name: 'Additional Electives',
          courses: csAdditionalElectives.map(course => course.id),
          completed: 0,
          required: 4,
          isElective: true
        },
        {
          id: 'cs_additional_req',
          name: 'Additional Requirements',
          courses: csAdditionalRequirements.map(course => course.id),
          completed: 0,
          required: csAdditionalRequirements.length
        }
      ]
    });
  
    const [showRequirementDetails, setShowRequirementDetails] = useState(false);
    const [selectedRequirement, setSelectedRequirement] = useState(null);
  
    useEffect(() => {
      updateCsMajorRequirements();
    }, [semesters]);
  
    const updateCsMajorRequirements = () => {
      const allSelectedCourses = semesters.flatMap(semester => semester.courses);
      
      setCsMajorRequirements(prevRequirements => ({
        ...prevRequirements,
        requirements: prevRequirements.requirements.map(requirement => 
          updateRequirement(requirement, allSelectedCourses)
        )
      }));
    };
  
    const updateRequirement = (req, selectedCourses) => {
      if (req.isElective) {
        const completedCourses = selectedCourses.filter(course => 
          req.courses.includes(course.id)
        );
        return { ...req, completed: completedCourses.length };
      } else {
        const completed = req.courses.filter(courseId => 
          selectedCourses.some(c => c.id === courseId)
        ).length;
        return { ...req, completed: Math.min(completed, req.required) };
      }
    };
  
    const handleLocalRequirementClick = (requirement) => {
        handleRequirementClick(requirement);
      };
    
      const handleLocalFindCourses = () => {
        if (selectedRequirement) {
          handleFindCourses(selectedRequirement);
          setShowRequirementDetails(false);
        }
      };
  
    const RequirementItem = ({ requirement }) => (
      <div 
        className="cursor-pointer mb-4" 
        onClick={() => handleLocalRequirementClick(requirement)}
      >
        <h3 className={`font-semibold flex justify-between ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          <span>{requirement.name}</span>
          <span>{requirement.completed}/{requirement.required}</span>
        </h3>
        <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2.5 mt-1`}>
          <div 
            className={`${isDarkMode ? 'bg-blue-500' : 'bg-blue-600'} h-2.5 rounded-full`}
            style={{width: `${(requirement.completed / requirement.required) * 100}%`}}
          ></div>
        </div>
      </div>
    );
  
    return (
      <div className={`p-4 ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
        <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {csMajorRequirements.name}
        </h2>
        
        {csMajorRequirements.requirements.map(requirement => (
          <RequirementItem key={requirement.id} requirement={requirement} />
        ))}
  
        {showRequirementDetails && selectedRequirement && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className={`p-6 rounded-lg max-w-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
              <h2 className="text-xl font-bold mb-4">{selectedRequirement.name}</h2>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                {selectedRequirement.isElective 
                  ? "This requirement allows you to choose from a variety of courses to tailor your Computer Science degree to your interests."
                  : "This is a core requirement for your Computer Science degree. Make sure to complete all required courses."}
              </p>
              <button 
                onClick={handleLocalFindCourses}
                className={`mt-4 px-4 py-2 rounded ${isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              >
                Find Courses for this Requirement
              </button>
              <button 
                onClick={() => setShowRequirementDetails(false)}
                className={`mt-4 ml-2 px-4 py-2 rounded ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'}`}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
export default ComputerScienceMajorRequirements;
export { allCsCourses, csCoreCourses, csElectives, csAdditionalElectives, csAdditionalRequirements };
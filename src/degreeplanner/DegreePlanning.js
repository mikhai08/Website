import { useState, useEffect } from 'react';
import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor, MouseSensor, TouchSensor, rectIntersection } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDarkMode } from './DarkModeContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ComputerScienceMajorRequirements, { 
  csCoreCourses, 
  csElectives, 
  csAdditionalElectives, 
  csAdditionalRequirements 
} from './ComputerScienceMajorRequirements';
import { allCsCourses } from './ComputerScienceMajorRequirements';
import GenEdRequirements from './GenEdRequirements';

const DegreePlanning = () => {
  const { isDarkMode } = useDarkMode();
  
  
   // Computer Science Core Courses
  

  const coreCourses = [
    { id: 'BUSI401', name: 'Management Communication', credits: 3, category: 'core'  },
    { id: 'BUSI403', name: 'Operations Management', credits: 3, category: 'core'  },
    { id: 'BUSI404', name: 'Legal & Ethical Environment of Business', credits: 1.5 },
    { id: 'BUSI405', name: 'Leading and Managing', credits: 3, category: 'core'  },
    { id: 'BUSI406', name: 'Principles of Marketing', credits: 3, category: 'core'  },
    { id: 'BUSI407', name: 'Financial Accounting', credits: 3, category: 'core'  },
    { id: 'BUSI408', name: 'Corporate Finance', credits: 3, category: 'core'  },
    { id: 'BUSI410', name: 'Business Analytics', credits: 3, category: 'core'  },
    { id: 'BUSI411', name: 'Strategic Management', credits: 1.5, category: 'core'  },
    { id: 'BUSI412', name: 'Strategic Management in the Modern Corporation', credits: 1.5, category: 'core'  },
  ];

  const prerequisiteCourses = [
    { id: 'MATH152', name: 'Calculus for Business and Social Sciences', credits: 3, requirementId: 'calculus' },
    { id: 'MATH231', name: 'Calculus of Functions of One Variable I', credits: 3, requirementId: 'calculus' },
    { id: 'STOR113', name: 'Decision Models for Business and Economics', credits: 3, requirementId: 'calculus' },
    { id: 'STOR155', name: 'Introduction to Data Models and Inference', credits: 3, requirementId: 'statistics' },
    { id: 'ECON101', name: 'Introduction to Economics', credits: 3, requirementId: 'economics' },
    { id: 'ECON101H', name: 'Introduction to Economics (Honors)', credits: 3, requirementId: 'economics' },
    { id: 'BUSI100', name: 'Introduction to Business: People, Profits, Planet', credits: 3, requirementId: 'intro_business' },
  ];

  const electiveCourses = [
    { id: 'BUSI188', name: 'Foundations of Leadership: Discovering Your Strengths', credits: 1.5 },
    { id: 'BUSI211', name: 'Hodges Scholars Leadership course', credits: 1 },
    { id: 'BUSI350', name: 'Symposium Core Committee', credits: 1.5 },
    { id: 'BUSI409H', name: 'Advanced Corp Finance', credits: 1.5 },
    { id: 'BUSI470', name: 'Storytelling to Influence and Inspire', credits: 3 },
    { id: 'BUSI488', name: 'Data Science in the Business World', credits: 3 },
    { id: 'BUSI490', name: 'Business Topics: Thinking Creatively: Cognitive Tools for Individuals and Teams', credits: 3 },
    { id: 'BUSI490A', name: 'Business Topics: Artificial Intelligence and Business Writing', credits: 3 },
    { id: 'BUSI500H', name: 'Entrepreneurship & Business Planning', credits: 3 },
    { id: 'BUSI501', name: 'Professional Selling Strategies and Skills', credits: 3 },
    { id: 'BUSI502', name: 'Entrepreneurial Finance', credits: 3 },
    { id: 'BUSI505', name: 'Entrepreneurial Consulting', credits: 3 },
    { id: 'BUSI506', name: 'Venture Capital Strategy', credits: 3 },
    { id: 'BUSI507H', name: 'Sustainable Business and Social Enterprise', credits: 3 },
    { id: 'BUSI517', name: 'Private Equity and Debt Markets', credits: 3 },
    { id: 'BUSI518', name: 'Applied Private Equity', credits: 3 },
    { id: 'BUSI520', name: 'Advanced Spreadsheet Modeling', credits: 3 },
    { id: 'BUSI521', name: 'Design Thinking: The Innovation Process for Complex Problems', credits: 3 },
    { id: 'BUSI522', name: 'Personal Branding and Professional Relationships', credits: 3 },
    { id: 'BUSI523', name: 'Diversity and Inclusion at Work', credits: 3 },
    { id: 'BUSI524', name: 'Applied Improvisation', credits: 3 },
    { id: 'BUSI527', name: 'Gender at Work', credits: 3 },
    { id: 'BUSI528', name: 'Leadership Communication', credits: 1.5 },
    { id: 'BUSI529', name: 'Intercultural Communication in the Global Workplace', credits: 1.5 },
    { id: 'BUSI533H', name: 'Supply Chain Management', credits: 3 },
    { id: 'BUSI536', name: 'Project Management', credits: 1.5 },
    { id: 'BUSI537', name: 'Retail Operations', credits: 1.5 },
    { id: 'BUSI545', name: 'Negotiations', credits: 1.5 },
    { id: 'BUSI548', name: 'Financing Affordable Housing', credits: 1.5 },
    { id: 'BUSI554H', name: 'Consulting Skills and Framework', credits: 3 },
    { id: 'BUSI555', name: 'Groups & Teams in Organizations', credits: 1.5 },
    { id: 'BUSI562', name: 'Consumer Behavior', credits: 3 },
    { id: 'BUSI564', name: 'Product Development & Design Thinking', credits: 3 },
    { id: 'BUSI565', name: 'Marketing Research Design and Analysis', credits: 3 },
    { id: 'BUSI566', name: 'Marketing Strategy', credits: 3 },
    { id: 'BUSI567', name: 'Customer Journeys', credits: 3 },
    { id: 'BUSI571', name: 'Strategic Cost Analysis and Performance Management', credits: 1.5 },
    { id: 'BUSI583H', name: 'Applied Investment Management', credits: 3 },
    { id: 'BUSI584', name: 'Financial Modeling', credits: 3 },
    { id: 'BUSI585', name: 'Introduction to Real Estate', credits: 3 },
    { id: 'BUSI588H', name: 'Derivative Securities', credits: 1.5 },
    { id: 'BUSI592', name: 'Real Estate Fund', credits: 3 },
    { id: 'BUSI597', name: 'Sustainable Finance', credits: 1.5 },
    { id: 'BUSI601', name: 'Real Estate Finance', credits: 1.5 },
    { id: 'BUSI603', name: 'Real Estate Development', credits: 1.5 },
    { id: 'BUSI607', name: 'Inside the Capital Markets – Institutions, Players & Regulators', credits: 1.5 },
    { id: 'BUSI608', name: 'Introduction to FinTech – Blockchain Technologies and Cryptocurrencies', credits: 1.5 },
    { id: 'BUSI625', name: 'Global Healthcare Management', credits: 1.5 },
    { id: 'BUSI691H', name: 'Honors Research Proposal', credits: 3 }
  ];
  const preloadedSchedule = [
    {
      id: 'Fall2024',
      name: 'Fall 2024',
      courses: [
        { id: 'IDST101', name: 'College Thriving', credits: 1, isPreloaded: true },
        { id: 'POLI150', name: 'International Relations', credits: 3, isPreloaded: true, satisfies: 'globalUnderstanding' },
        { id: 'ENGL105', name: 'English Compositions and Rhetoric, writing in the natural sciences', credits: 3, isPreloaded: true, satisfies: 'writing' },
        { id: 'STOR155', name: 'Statistics', credits: 3, isPreloaded: true, satisfies: 'quantReasoning' },
        { id: 'ECON101', name: 'Economics', credits: 4, isPreloaded: true, satisfies: 'waysKnowing' },
        { id: 'HIST140', name: 'World After 1945', credits: 3, isPreloaded: true, satisfies: 'humanPast' },
      ],
      credits: 17,
    },
    {
      id: 'Spring2025',
      name: 'Spring 2025',
      courses: [
        { id: 'ECON310', name: 'Intermediate Microeconomics', credits: 3, isPreloaded: true },
        { id: 'PHIL101', name: 'Philosophy', credits: 3, isPreloaded: true, satisfies: 'ethicValues' },
        { id: 'IDST126L', name: 'Lab', credits: 1, isPreloaded: true, satisfies: 'dataLiteracy' },
        { id: 'IDST126', name: 'Values and Prices', credits: 3, isPreloaded: true, satisfies: 'tripleI' },
        { id: 'HIST53', name: 'Traveling to European Cities: American Writers/Cultural Identities, 1830-2000.', credits: 3, isPreloaded: true, satisfies: 'firstYearSeminar' },
        { id: 'ECON125', name: 'Entrepreneurship', credits: 3, isPreloaded: true, satisfies: 'creativeExpression' },
      ],
      credits: 16,
    },
    {
      id: 'Fall2025',
      name: 'Fall 2025',
      courses: [
        { id: 'ECON410', name: 'Intermediate Micro', credits: 4, isPreloaded: true },
        { id: 'LFIT111', name: 'Swimming', credits: 1, isPreloaded: true },
        { id: 'HIST364', name: 'History of American Business', credits: 3, isPreloaded: true },
        { id: 'BUSI100', name: 'Intro to Business', credits: 1.5, isPreloaded: true },
        { id: 'COMM348', name: 'Algorithms in Society', credits: 3, isPreloaded: true, satisfies: 'powerDifference' },
        { id: 'ECON325', name: 'Entrepreneurship', credits: 3, isPreloaded: true },
      ],
      credits: 15.5,
    },
    {
      id: 'Spring2026',
      name: 'Spring 2026',
      courses: [
        { id: 'BUSI488', name: 'Data Science in the Business World', credits: 3, isPreloaded: true },
        { id: 'COMP110', name: 'Intro to Programming', credits: 3, isPreloaded: true },
        { id: 'BUSI407', name: 'Accounting', credits: 3, isPreloaded: true },
        { id: 'ECON327', name: 'Branding', credits: 3, isPreloaded: true },
        { id: 'BUSI506', name: 'Venture Capital', credits: 3, isPreloaded: true },
        { id: 'BUSI505', name: 'Entrepreneurial Consulting', credits: 3, isPreloaded: true, satisfies: 'highImpact' },
      ],
      credits: 18,
    },
    {
      id: 'Fall2026',
      name: 'Fall 2026',
      courses: [
        { id: 'BUSI406', name: 'Marketing', credits: 3, isPreloaded: true },
        { id: 'COMP283', name: 'Discrete Structures', credits: 3, isPreloaded: true },
        { id: 'BUSI408', name: 'Corporate Finance', credits: 3, isPreloaded: true },
        { id: 'BUSI405', name: 'Organizational Behavior', credits: 3, isPreloaded: true },
        { id: 'BUSI403', name: 'Operations and Technology Management', credits: 3, isPreloaded: true },
      ],
      credits: 15,
    },
  ];

  
  
  const genEdCourses = {
    firstYearFoundations: {
      writingResearch: [
        { id: 'ENGL105', name: 'Writing at the Research University', credits: 3 },
        { id: 'ENGL105I', name: 'Writing at the Research University (Interdisciplinary)', credits: 3 },
        { id: 'ENGL105H', name: 'Writing at the Research University (Honors)', credits: 3 },
      ],
      collegeThriving: [
        { id: 'MUST101', name: 'College Thriving', credits: 1 },
        { id: 'IDST101i', name: 'College Thriving', credits: 1 },
      ],
      firstYearSeminar: [
        { id: 'COMM88', name: 'Technologies of Popular Culture', credits: 3 },
        { id: 'HIST53', name: 'Traveling to European Cities: American Writers/Cultural Identities, 1830-2000.', credits: 3 },
        { id: 'COMP50', name: 'Everyday Computing', credits: 3 },
        { id: 'DRAM79', name: 'The Heart of the Play', credits: 3 },
        { id: 'ECON54', name: 'Entrepreneurial Imagination', credits: 3 },
        { id: 'PSYC62', name: 'Positive Psychology', credits: 3 },
      ],
      tripleI: [
        { id: 'IDST111', name: 'Triple I: Ethics, Economics, and Public Policy', credits: 3 },
        { id: 'IDST112', name: 'Triple I: Death and Dying', credits: 3 },
        { id: 'IDST113', name: 'Triple I: The Idea of Race', credits: 3 },
        { id: 'IDST114', name: 'Triple I: Science Fiction and Environment', credits: 3 },
        { id: 'IDST115', name: 'Triple I: Understanding Health and Happiness', credits: 3 },
        { id: 'IDST126', name: 'Triple-I: Values and Prices', credits: 3 },
      ],
      dataLiteracy: [
        { id: 'IDST111L', name: 'Triple I: Ethics, Economics, and Public Policy Lab', credits: 1 },
        { id: 'IDST112L', name: 'Triple I: Death and Dying Lab', credits: 1 },
        { id: 'IDST113L', name: 'Triple I: The Idea of Race Lab', credits: 1 },
        { id: 'IDST114L', name: 'Triple I: Science Fiction and Environment Lab', credits: 1 },
        { id: 'IDST115L', name: 'Triple I: Understanding Health and Happiness Lab', credits: 1 },
        { id: 'IDST126L', name: 'Triple-I: Values and Prices Lab', credits: 1 },
      ],
      globalLanguage: [
        { id: 'SPAN203', name: 'Intermediate Spanish I', credits: 3 },
        { id: 'FREN203', name: 'Intermediate French I', credits: 3 },
        { id: 'CHIN203', name: 'Intermediate Chinese I', credits: 3 },
        { id: 'GERM203', name: 'Intermediate German I', credits: 3 },
        { id: 'JAPN203', name: 'Intermediate Japanese I', credits: 3 },
      ],
    },
    focusCapacities: {
      aestheticAnalysis: [
        { id: 'ARTS101', name: 'Introduction to Art', credits: 3 },
        { id: 'ENGL121', name: 'Introduction to Literature', credits: 3 },
        { id: 'MUSC143', name: 'Introduction to Rock Music', credits: 3 },
        { id: 'DRAM115', name: 'Perspectives in Drama', credits: 3 },
        { id: 'COMM140', name: 'Introduction to Media Studies', credits: 3 },
      ],
      creativeExpression: [
        { id: 'ARTS102', name: 'Basic Drawing', credits: 3 },
        { id: 'MUSC166', name: 'Introduction to Composition', credits: 3 },
        { id: 'DRAM135', name: 'Acting I', credits: 3 },
        { id: 'ENGL130', name: 'Introduction to Creative Writing', credits: 3 },
        { id: 'COMM230', name: 'Audio Production', credits: 3 },
        { id: 'ECON125', name: 'Entrepreneurship', credits: 3 },
      ],
      humanPast: [
        { id: 'HIST127', name: 'American History to 1865', credits: 3 },
        { id: 'CLAS131', name: 'Classical Mythology', credits: 3 },
        { id: 'HIST140', name: 'The World Since 1945', credits: 3 },
        { id: 'RELI103', name: 'Introduction to the Hebrew Bible/Old Testament', credits: 3 },
        { id: 'HIST151', name: 'European History to 1650', credits: 3 },
      ],
      ethicValues: [
        { id: 'PHIL160', name: 'Introduction to Ethics', credits: 3 },
        { id: 'POLI150', name: 'International Relations and World Politics', credits: 3 },
        { id: 'RELI140', name: 'Religion in America', credits: 3 },
        { id: 'PHIL165', name: 'Bioethics', credits: 3 },
        { id: 'POLI203', name: 'Race, Innocence, and the End of the Death Penalty', credits: 3 },
        { id: 'PHIL101', name: 'Introduction to Philosophy', credits: 3 },
      ],
      globalUnderstanding: [
        { id: 'ANTH102', name: 'Introduction to Cultural Anthropology', credits: 3 },
        { id: 'GEOG120', name: 'World Regional Geography', credits: 3 },
        { id: 'POLI150', name: 'International Relations and World Politics', credits: 3 },
        { id: 'GLBL210', name: 'Global Issues and Globalization', credits: 3 },
        { id: 'SOCI130', name: 'Family and Society', credits: 3 },
      ],
      naturalScience: [
        { id: 'BIOL101', name: 'Principles of Biology', credits: 4 },
        { id: 'CHEM101', name: 'General Descriptive Chemistry I', credits: 4 },
        { id: 'PHYS104', name: 'General Physics I', credits: 4 },
        { id: 'ENEC202', name: 'Environmental Science', credits: 4 },
        { id: 'ASTR101', name: 'Introduction to Astronomy', credits: 3 },
      ],
      powerDifference: [
        { id: 'SOC101', name: 'Introduction to Sociology', credits: 3 },
        { id: 'WGST101', name: 'Introduction to Womens and Gender Studies', credits: 3 },
        { id: 'POLI100', name: 'Introduction to Government in the United States', credits: 3 },
        { id: 'HIST110', name: 'Introduction to the Cultures and Histories of Native North America', credits: 3 },
        { id: 'AFAM101', name: 'Introduction to African American Studies', credits: 3 },
        { id: 'COMM348', name: 'Algorithms in Society', credits: 3 },
      ],
      quantReasoning: [
        { id: 'MATH110', name: 'Algebra', credits: 3 },
        { id: 'STOR151', name: 'Introduction to Data Analysis', credits: 3 },
        { id: 'ECON101', name: 'Introduction to Economics', credits: 3 },
        { id: 'PHIL155', name: 'Introduction to Mathematical Logic', credits: 3 },
        { id: 'COMP110', name: 'Introduction to Programming', credits: 3 },
        { id: 'STOR155', name: 'Statistics', credits: 3 },
      ],
      waysKnowing: [
        { id: 'PHIL101', name: 'Introduction to Philosophy', credits: 3 },
        { id: 'ANTH101', name: 'General Anthropology', credits: 3 },
        { id: 'PSYC101', name: 'General Psychology', credits: 3 },
        { id: 'RELI101', name: 'Introduction to Religion', credits: 3 },
        { id: 'LING101', name: 'Introduction to Language', credits: 3 },
        { id: 'ECON101', name: 'Introduction to Economics', credits: 3 },
      ],
    },
    empiricalInvestigativeLab: [
      { id: 'BIOL101L', name: 'Principles of Biology Laboratory', credits: 1 },
      { id: 'CHEM101L', name: 'General Descriptive Chemistry Laboratory I', credits: 1 },
      { id: 'PHYS104L', name: 'General Physics I Laboratory', credits: 1 },
      { id: 'ENEC202L', name: 'Environmental Science Laboratory', credits: 1 },
      { id: 'ASTR101L', name: 'Introduction to Astronomy Laboratory', credits: 1 },
    ],
    reflectionAndIntegration: {
      research: [
        { id: 'BIOL395', name: 'Undergraduate Research in Biology', credits: 3 },
        { id: 'CHEM395', name: 'Undergraduate Research in Chemistry', credits: 3 },
        { id: 'PSYC395', name: 'Research in Psychology', credits: 3 },
        { id: 'HIST398', name: 'Undergraduate Seminar in History', credits: 3 },
        { id: 'ENGL395', name: 'Undergraduate Research in English', credits: 3 },
      ],
      highImpact: [
        { id: 'BIOL293', name: 'Internship in Biology', credits: 3 },
        { id: 'ENGL293', name: 'Internship in English', credits: 3 },
        { id: 'POLI293', name: 'Internship in Political Science', credits: 3 },
        { id: 'PSYC293', name: 'Internship in Psychology', credits: 3 },
        { id: 'SOCI293', name: 'Internship in Sociology', credits: 3 },
        { id: 'BUSI505', name: 'Entrepreneurial Consulting', credits: 3 },
      ],
      communication: [
        { id: 'COMM113', name: 'Public Speaking', credits: 3 },
        { id: 'ENGL313', name: 'Writing in the Disciplines', credits: 3 },
        { id: 'BUSI401', name: 'Business Communication', credits: 3 },
        { id: 'JOMC153', name: 'News Writing', credits: 3 },
        { id: 'SPAN300', name: 'Advanced Spanish Communication', credits: 3 },
      ],
      lifetimeFitness: [
        { id: 'LFIT101', name: 'Lifetime Fitness: Aerobics', credits: 1 },
        { id: 'LFIT102', name: 'Lifetime Fitness: Weight Training', credits: 1 },
        { id: 'LFIT103', name: 'Lifetime Fitness: Yoga', credits: 1 },
        { id: 'LFIT104', name: 'Lifetime Fitness: Swimming', credits: 1 },
        { id: 'LFIT105', name: 'Lifetime Fitness: Running', credits: 1 },
        { id: 'LFIT111', name: 'Swimming', credits: 1 },
      ],
    },
  };

  // Update this line to include Gen-Ed courses
  const allCourses = [
    ...coreCourses,
    ...electiveCourses,
    ...prerequisiteCourses,
    ...allCsCourses,
    ...Object.values(genEdCourses.firstYearFoundations).flat(),
    ...Object.values(genEdCourses.focusCapacities).flat(),
    ...genEdCourses.empiricalInvestigativeLab,
    ...Object.values(genEdCourses.reflectionAndIntegration).flat()
  ];
  const [courses] = useState([
    ...coreCourses,
    ...prerequisiteCourses,
    ...electiveCourses,
    ...allCsCourses,
    ...Object.values(genEdCourses.firstYearFoundations).flat(),
    ...Object.values(genEdCourses.focusCapacities).flat(),
    ...genEdCourses.empiricalInvestigativeLab,
    ...Object.values(genEdCourses.reflectionAndIntegration).flat()
  ]);
  const [preloadedCourses, setPreloadedCourses] = useState([]);
  const [activeView, setActiveView] = useState('basic');
  const [activeMajor, setActiveMajor] = useState('business'); //what is this

  const fixedSemesters = [
    { id: 'Fall2024', name: 'Fall 2024', courses: [], credits: 0 },
    { id: 'Spring2025', name: 'Spring 2025', courses: [], credits: 0 },
    { id: 'Fall2025', name: 'Fall 2025', courses: [], credits: 0 },
    { id: 'Spring2026', name: 'Spring 2026', courses: [], credits: 0 },
    { id: 'Fall2026', name: 'Fall 2026', courses: [], credits: 0 },
    { id: 'Spring2027', name: 'Spring 2027', courses: [], credits: 0 },
    { id: 'Fall2027', name: 'Fall 2027', courses: [], credits: 0 },
    { id: 'Spring2028', name: 'Spring 2028', courses: [], credits: 0 },
  ];
  
  const [semesters, setSemesters] = useState(fixedSemesters);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeId, setActiveId] = useState(null);
  const [activeSemester, setActiveSemester] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showRequirementDetails, setShowRequirementDetails] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState(null);
  const [activeTab, setActiveTab] = useState('requirements'); // 'requirements' or 'apCredits'

  const [apCredits, setApCredits] = useState({
    calculus: false,
    statistics: false,
    microeconomics: false,
    macroeconomics: false,
  });

  const [majorRequirements, setMajorRequirements] = useState({
    name: 'Business Administration',
    requirements: [
      {
        id: 'prerequisites',
        name: 'Prerequisites',
        isCollapsible: true,
        subRequirements: [
          { id: 'calculus', name: 'Calculus', courses: ['MATH152', 'MATH231', 'STOR113'], completed: 0, required: 1 },
          { id: 'statistics', name: 'Statistics', courses: ['STOR155'], completed: 0, required: 1 },
          { id: 'economics', name: 'Economics', courses: ['ECON101', 'ECON101H'], completed: 0, required: 1 },
          { id: 'intro_business', name: 'Intro to Business', courses: ['BUSI100'], completed: 0, required: 1 },
        ],
      },
      { id: 'core', name: 'Core Courses', courses: ['BUSI401', 'BUSI403', 'BUSI404', 'BUSI405', 'BUSI406', 'BUSI407', 'BUSI408', 'BUSI410', 'BUSI411', 'BUSI412'], completed: 0, required: 10 },
      {
        id: 'electives',
        name: 'Electives',
        courses: [
          'BUSI188', 'BUSI211', 'BUSI350', 'BUSI409H','BUSI470','BUSI488', 'BUSI490', 'BUSI490A', 'BUSI500H', 'BUSI501', 'BUSI502', 'BUSI505', 'BUSI506', 'BUSI507H',
          'BUSI517', 'BUSI518', 'BUSI520', 'BUSI521', 'BUSI522', 'BUSI523', 'BUSI524', 'BUSI527',
          'BUSI528', 'BUSI529', 'BUSI533H', 'BUSI536', 'BUSI537', 'BUSI545', 'BUSI548', 'BUSI554H',
          'BUSI555', 'BUSI562', 'BUSI564', 'BUSI565', 'BUSI566', 'BUSI567', 'BUSI571', 'BUSI583H',
          'BUSI584', 'BUSI585', 'BUSI588H', 'BUSI592', 'BUSI597', 'BUSI601', 'BUSI603', 'BUSI607',
          'BUSI608', 'BUSI625', 'BUSI691H', 
        ],
        completed: 0,
        required: 15,
        isElective: true
      }
    ]
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );
// two use effect
  useEffect(() => {
    const updateRequirement = (req, selectedCourses) => {
      if (req.isElective) {
        const completedCredits = selectedCourses
          .filter(course => req.courses.includes(course.id))
          .reduce((sum, course) => sum + course.credits, 0);
        return { ...req, completed: completedCredits };
      } else {
        let completed = req.courses.filter(courseId => 
          selectedCourses.some(c => c.id === courseId)
        ).length;
  
        // Check for AP credits
        if (req.id === 'calculus' && apCredits.calculus) completed = 1;
        if (req.id === 'statistics' && apCredits.statistics) completed = 1;
        if (req.id === 'economics' && (apCredits.microeconomics || apCredits.macroeconomics)) completed = 1;
  
        return { ...req, completed: Math.min(completed, req.required) };
      }
    };


    const updateMajorRequirements = () => {
      const allSelectedCourses = semesters.flatMap(semester => semester.courses);
      
      setMajorRequirements(prevRequirements => ({
        ...prevRequirements,
        requirements: prevRequirements.requirements.map(requirement => {
          if (requirement.isCollapsible) {
            return {
              ...requirement,
              subRequirements: requirement.subRequirements.map(subReq => updateRequirement(subReq, allSelectedCourses))
            };
          } else {
            return updateRequirement(requirement, allSelectedCourses);
          }
        })
      }));
    };
    updateMajorRequirements();
  }, [semesters, apCredits]);

  useEffect(() => {
    const preloadedSchedule = [
      {
        id: 'Fall2024',
        name: 'Fall 2024',
        courses: [
          { id: 'IDST101', name: 'College Thriving', credits: 1, isPreloaded: true },
          { id: 'POLI150', name: 'International Relations', credits: 3, isPreloaded: true, satisfies: 'globalUnderstanding' },
          { id: 'ENGL105', name: 'English Compositions and Rhetoric, writing in the natural sciences', credits: 3, isPreloaded: true, satisfies: 'writing' },
          { id: 'STOR155', name: 'Statistics', credits: 3, isPreloaded: true, satisfies: 'quantReasoning' },
          { id: 'ECON101', name: 'Economics', credits: 4, isPreloaded: true, satisfies: 'waysKnowing' },
          { id: 'HIST140', name: 'World After 1945', credits: 3, isPreloaded: true, satisfies: 'humanPast' },
        ],
        credits: 17,
      },
      {
        id: 'Spring2025',
        name: 'Spring 2025',
        courses: [
          { id: 'ECON310', name: 'Intermediate Microeconomics', credits: 3, isPreloaded: true },
          { id: 'PHIL101', name: 'Philosophy', credits: 3, isPreloaded: true, satisfies: 'ethicValues' },
          { id: 'IDST126L', name: 'Lab', credits: 1, isPreloaded: true, satisfies: 'dataLiteracy' },
          { id: 'IDST126', name: 'Values and Prices', credits: 3, isPreloaded: true, satisfies: 'tripleI' },
          { id: 'HIST53', name: 'Traveling to European Cities: American Writers/Cultural Identities, 1830-2000.', credits: 3, isPreloaded: true, satisfies: 'firstYearSeminar' },
          { id: 'ECON125', name: 'Entrepreneurship', credits: 3, isPreloaded: true, satisfies: 'creativeExpression' },
        ],
        credits: 16,
      },
      {
        id: 'Fall2025',
        name: 'Fall 2025',
        courses: [
          { id: 'ECON410', name: 'Intermediate Micro', credits: 4, isPreloaded: true },
          { id: 'LFIT111', name: 'Swimming', credits: 1, isPreloaded: true },
          { id: 'HIST364', name: 'History of American Business', credits: 3, isPreloaded: true },
          { id: 'BUSI100', name: 'Intro to Business', credits: 1.5, isPreloaded: true },
          { id: 'COMM348', name: 'Algorithms in Society', credits: 3, isPreloaded: true, satisfies: 'powerDifference' },
          { id: 'ECON325', name: 'Entrepreneurship', credits: 3, isPreloaded: true },
        ],
        credits: 15.5,
      },
      {
        id: 'Spring2026',
        name: 'Spring 2026',
        courses: [
          { id: 'BUSI488', name: 'Data Science in the Business World', credits: 3, isPreloaded: true },
          { id: 'COMP110', name: 'Intro to Programming', credits: 3, isPreloaded: true },
          { id: 'BUSI407', name: 'Accounting', credits: 3, isPreloaded: true },
          { id: 'ECON327', name: 'Branding', credits: 3, isPreloaded: true },
          { id: 'BUSI506', name: 'Venture Capital', credits: 3, isPreloaded: true },
          { id: 'BUSI505', name: 'Entrepreneurial Consulting', credits: 3, isPreloaded: true, satisfies: 'highImpact' },
        ],
        credits: 18,
      },
      {
        id: 'Fall2026',
        name: 'Fall 2026',
        courses: [
          { id: 'BUSI406', name: 'Marketing', credits: 3, isPreloaded: true },
          { id: 'COMP283', name: 'Discrete Structures', credits: 3, isPreloaded: true },
          { id: 'BUSI408', name: 'Corporate Finance', credits: 3, isPreloaded: true },
          { id: 'BUSI405', name: 'Organizational Behavior', credits: 3, isPreloaded: true },
          { id: 'BUSI403', name: 'Operations and Technology Management', credits: 3, isPreloaded: true },
        ],
        credits: 15,
      },
    ];


    if (activeView === 'premium') {
      setSemesters(prevSemesters => {
        const updatedSemesters = [...prevSemesters];
        preloadedSchedule.forEach(preloadedSemester => {
          const index = updatedSemesters.findIndex(sem => sem.id === preloadedSemester.id);
          if (index !== -1) {
            updatedSemesters[index] = {
              ...updatedSemesters[index],
              courses: [...preloadedSemester.courses, ...updatedSemesters[index].courses],
              credits: preloadedSemester.credits + updatedSemesters[index].credits,
            };
          }
        });
        return updatedSemesters;
      });
    } else {
      setSemesters(prevSemesters => 
        prevSemesters.map(semester => ({
          ...semester,
          courses: semester.courses.filter(course => !course.isPreloaded),
          credits: semester.courses.filter(course => !course.isPreloaded).reduce((sum, course) => sum + course.credits, 0),
        }))
      );
    }
  }, [activeView]);
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };
  const handleDragOver = (event) => {
    const { over } = event;
    if (over && over.data.current.type === 'semester') {
      setActiveSemester(over.id);
    } else {
      setActiveSemester(null);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
  
    if (!over || !over.data.current) {
      setActiveId(null);
      setActiveSemester(null);
      return;
    }
  
    const course = semesters.flatMap(sem => sem.courses).find(c => c.id === active.id);
    if (course && course.isPreloaded) {
      toast.error("Preloaded courses cannot be moved.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setActiveId(null);
      setActiveSemester(null);
      return;
    }
  
    if (over.data.current.type === 'semester') {
      handleDropIntoSemester(active.id, over.id);
    } else {
      handleReorderWithinSemester(active.id, over.id, over.data.current.semesterId);
    }
  
    setActiveId(null);
    setActiveSemester(null);
  };
  
  const handleDropIntoSemester = (courseId, semesterId) => {
    const course = courses.find(c => c.id === courseId);
    const semesterIndex = semesters.findIndex(s => s.id === semesterId);
  
    if (!course || semesterIndex === -1) return;
  
    setSemesters(prevSemesters => {
      const newSemesters = [...prevSemesters];
      const targetSemester = newSemesters[semesterIndex];
  
      if (targetSemester.credits + course.credits > 18) {
        toast.error("Cannot add course. It would exceed the 18 credit limit.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return prevSemesters;
      }
  
      // Remove course from other semesters
      newSemesters.forEach(sem => {
        const removedCourse = sem.courses.find(c => c.id === course.id);
        if (removedCourse) {
          sem.courses = sem.courses.filter(c => c.id !== course.id);
          sem.credits -= removedCourse.credits;
        }
      });
  
      // Add course to target semester
      if (!targetSemester.courses.some(c => c.id === course.id)) {
        targetSemester.courses.push({...course});
        targetSemester.credits += course.credits;
        toast.success(`Added ${course.id} to ${targetSemester.name}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
  
      return newSemesters;
    });
  };
  
  const removeCourseFromSemester = (semesterId, courseId) => {
    setSemesters(prevSemesters => 
      prevSemesters.map(semester => {
        if (semester.id === semesterId) {
          const courseToRemove = semester.courses.find(c => c.id === courseId);
          return {
            ...semester,
            courses: semester.courses.filter(course => course.id !== courseId),
            credits: semester.credits - (courseToRemove ? courseToRemove.credits : 0)
          };
        }
        return semester;
      })
    );
  };

  const handleSearch = (e) => {
  const term = e.target.value.toLowerCase();
  setSearchTerm(term);
  if (term) {
    setSearchResults(
      courses.filter(course => 
        (course.id.toLowerCase().includes(term) || 
        course.name.toLowerCase().includes(term)) &&
        !isCourseTaken(course.id)
      )
    );
  } else {
    setSearchResults([]);
  }
  };

  const handleReorderWithinSemester = (activeId, overId, semesterId) => {
    setSemesters(prevSemesters => 
      prevSemesters.map(semester => 
        semester.id === semesterId
          ? {
              ...semester,
              courses: arrayMove(
                semester.courses,
                semester.courses.findIndex(c => c.id === activeId),
                semester.courses.findIndex(c => c.id === overId)
              )
            }
          : semester
      )
    );
  };
  const isCourseTaken = (courseId) => {
    return semesters.some(sem => 
      sem.courses.some(c => c.id === courseId)
    ) || preloadedSchedule.some(sem => 
      sem.courses.some(c => c.id === courseId)
    );
  };
  
  const handleFindCourses = (requirement) => {
    if (!requirement || !requirement.courses) {
      console.error('Invalid requirement object:', requirement);
      return;
    }
    const filteredCourses = allCourses.filter(course => 
      requirement.courses.includes(course.id) &&
      !isCourseTaken(course.id)
    );
    
    // Deduplicate the filtered courses
    const uniqueFilteredCourses = filteredCourses.reduce((acc, current) => {
      const x = acc.find(item => item.id === current.id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
  
    setSearchResults(uniqueFilteredCourses);
    setShowRequirementDetails(false);
  };

  

  

  const handleRequirementClick = (requirement) => {
    console.log('Clicked requirement:', requirement); // Add this for debugging
    setSelectedRequirement(requirement);
    setShowRequirementDetails(true);
  };

  
  const getCourseColor = (course) => {
    if (!course) return '';

    switch (course.id) {
      case 'IDST101':
        return isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-200 text-blue-800';
      case 'ECON310':
        return isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-800';
      case 'ECON410':
        return isDarkMode ? 'bg-blue-500 text-white' : 'bg-blue-300 text-blue-900';
      case 'LFIT111':
        return isDarkMode ? 'bg-orange-600 text-white' : 'bg-orange-300 text-orange-800';
      case 'BUSI505':
        return 'bg-gradient-to-r from-blue-500 to-orange-500 text-white';
      default:
        // Handle the default case here
        break;
    }
  
    // Helper function to get color based on category
    const getColorForCategory = (category) => {
      const colors = {
        // Business colors
        businessPrerequisite: isDarkMode ? 'bg-blue-300 text-blue-900' : 'bg-blue-100 text-blue-800',
        businessCore: isDarkMode ? 'bg-blue-500 text-white' : 'bg-blue-300 text-blue-900',
        businessElective: isDarkMode ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white',
        
        // Computer Science colors
        csCore: isDarkMode ? 'bg-pink-200 text-pink-900' : 'bg-pink-100 text-pink-800',
        csElective: isDarkMode ? 'bg-pink-400 text-white' : 'bg-pink-300 text-pink-900',
        csAdditionalElective: isDarkMode ? 'bg-pink-600 text-white' : 'bg-pink-500 text-white',
        csAdditionalRequirement: isDarkMode ? 'bg-red-300 text-red-900' : 'bg-red-200 text-red-800',
        
        // Gen Ed colors
        firstYearFoundations: isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-200 text-blue-800',
        focusCapacities: isDarkMode ? 'bg-green-600 text-white' : 'bg-green-200 text-green-800',
        empiricalInvestigativeLab: isDarkMode ? 'bg-purple-600 text-white' : 'bg-purple-200 text-purple-800',
        reflectionAndIntegration: isDarkMode ? 'bg-orange-600 text-white' : 'bg-orange-200 text-orange-800',
      };
      return colors[category] || (isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-800');
    };
  
    const safeArrayCheck = (arr, id) => Array.isArray(arr) && arr.some(item => item.id === id);

  // Business courses
  if (safeArrayCheck(prerequisiteCourses, course.id)) {
    return getColorForCategory('businessPrerequisite');
  } else if (safeArrayCheck(coreCourses, course.id)) {
    return getColorForCategory('businessCore');
  } else if (safeArrayCheck(electiveCourses, course.id)) {
    return getColorForCategory('businessElective');
  }

  // Computer Science courses
  if (safeArrayCheck(csCoreCourses, course.id)) {
    return getColorForCategory('csCore');
  } else if (safeArrayCheck(csElectives, course.id)) {
    return getColorForCategory('csElective');
  } else if (safeArrayCheck(csAdditionalElectives, course.id)) {
    return getColorForCategory('csAdditionalElective');
  } else if (safeArrayCheck(csAdditionalRequirements, course.id)) {
    return getColorForCategory('csAdditionalRequirement');
  }

  // Gen Ed courses
  if (genEdCourses) {
    for (const [category, subcategories] of Object.entries(genEdCourses)) {
      if (Array.isArray(subcategories)) {
        if (subcategories.some(c => c.id === course.id)) {
          return getColorForCategory(category);
        }
      } else {
        for (const courses of Object.values(subcategories)) {
          if (courses.some(c => c.id === course.id)) {
            return getColorForCategory(category);
          }
        }
      }
    }
  }

  // Fallback color if the course is not found in any list
  return getColorForCategory('default');
};
  
  const SortableCourse = ({ course, semesterId, removeCourseFromSemester, semesters }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition
    } = useSortable({ 
      id: course.id,
      disabled: course.isPreloaded,
    });
  
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
  
    const handleRemove = (e) => {
      e.preventDefault();
      e.stopPropagation();
      removeCourseFromSemester(semesterId, course.id);
    };
  
    const courseColor = getCourseColor(course);
  
    const getScheduleInfo = () => {
      for (const semester of semesters) {
        if (semester.courses.some(c => c.id === course.id)) {
          return `Already added to ${semester.name}`;
        }
      }
      return null;
    };
  
    const scheduleInfo = getScheduleInfo();
  
    if (semesterId) {
      // Compact version for semester tab
      return (
        <div className={`mb-1 rounded shadow-sm ${courseColor} flex items-center`}>
          <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="flex-grow p-1 cursor-move text-xs"
          >
            <span className="font-bold">{course.id}</span>
          </div>
          <div className="flex-shrink-0">
            <button 
              onClick={handleRemove}
              className="px-1 text-red-600 hover:text-red-800"
            >
              ×
            </button>
          </div>
        </div>
      );
    }
  
    // Full version for search results
    return (
      <div className={`mb-2 rounded-lg overflow-hidden shadow-md`}>
        <div
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          style={style}
          className={`p-2 cursor-move ${courseColor}`}
        >
          <span className="font-bold">{course.id}</span>
        </div>
        <div className={`p-2 ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'}`}>
          <div className="text-sm font-semibold mb-1">{course.name}</div>
          <div className="text-xs text-blue-600">
            Previously offered in Fall 2024
          </div>
          {course.isTaken && (
            <div className="text-xs text-green-500 mt-1">
              Credit Earned
            </div>
          )}
          {scheduleInfo && (
            <div className="text-xs text-yellow-500 mt-1">
              {scheduleInfo}
            </div>
          )}
        </div>
      </div>
    );
  };

  const DroppableSemester = ({ semester, children }) => {
    const { setNodeRef } = useSortable({
      id: semester.id,
      data: {
        type: 'semester',
        semester: semester
      }
    });
  
    const isActive = activeSemester === semester.id;
    const isOverCreditLimit = semester.credits > 18;
  
    return (
      <div 
        ref={setNodeRef} 
        className={`p-3 rounded-lg min-h-[320px] overflow-y-auto flex flex-col transition-colors duration-200 ${
          isDarkMode
            ? isActive ? 'bg-blue-900 ring-2 ring-blue-500' : 'bg-blue-950'
            : isActive ? 'bg-blue-100 ring-2 ring-blue-300' : 'bg-white'
        } ${isDarkMode ? 'border-blue-800' : 'border border-blue-200'}`}
      >
        <h3 className={`mb-2 font-bold text-center text-sm py-2 rounded ${
          isDarkMode ? 'bg-blue-800 text-blue-100' : 'bg-blue-200 text-blue-900'
        }`}>
          {semester.name}
        </h3>
        <p className={`text-center text-xs mb-2 ${
          isOverCreditLimit 
            ? 'text-red-500 font-bold' 
            : isDarkMode ? 'text-blue-300' : 'text-blue-600'
        }`}>
          Credits: {semester.credits}
        </p>
        {isOverCreditLimit && (
          <p className="text-red-500 text-xs text-center mb-2">
            Maximum credits (18) exceeded!
          </p>
        )}
        <div className="flex-grow space-y-2">
          {children}
        </div>
      </div>
    );
  };

  const CollapsibleRequirement = ({ requirement, onRequirementClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <h3 
          className={`font-semibold flex justify-between items-center cursor-pointer ${
            isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-700'
          }`} 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{requirement.name}</span>
          <span>{isOpen ? '▲' : '▼'}</span>
        </h3>
        {isOpen && (
          <div className="ml-4 mt-2">
            {requirement.subRequirements.map(subReq => (
              <RequirementItem key={subReq.id} requirement={subReq} onRequirementClick={onRequirementClick} />
            ))}
          </div>
        )}
      </>
    );
  };
  
  const RequirementItem = ({ requirement, onRequirementClick }) => (
    <div className="cursor-pointer mb-2" onClick={() => onRequirementClick(requirement)}>
      <h3 className={`font-semibold flex justify-between ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        <span>{requirement.name}</span>
        <span>{requirement.isElective ? `${requirement.completed}/${requirement.required} credits` : `${requirement.completed}/${requirement.required}`}</span>
      </h3>
      <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2.5 mt-1`}>
        <div 
          className={`${isDarkMode ? 'bg-blue-500' : 'bg-blue-600'} h-2.5 rounded-full`}
          style={{width: `${(requirement.completed / requirement.required) * 100}%`}}
        ></div>
      </div>
    </div>
  );
  const [planners, setPlanners] = useState([]);
  const [activePlanner, setActivePlanner] = useState(null);
  const [showNewPlannerModal, setShowNewPlannerModal] = useState(false);
  const [newPlannerName, setNewPlannerName] = useState('');

  // Function to create a new planner
  const createNewPlanner = () => {
    if (newPlannerName.trim() === '') {
      toast.error('Please enter a name for your planner.');
      return;
    }
    const newPlanner = {
      id: Date.now(),
      name: newPlannerName,
      semesters: [...semesters] // Copy current semesters
    };
    setPlanners([...planners, newPlanner]);
    setActivePlanner(newPlanner);
    setShowNewPlannerModal(false);
    setNewPlannerName('');
    toast.success(`Created new planner: ${newPlannerName}`);
  };

  // Function to save the current planner
  const saveCurrentPlanner = () => {
    if (!activePlanner) {
      toast.error('No active planner to save.');
      return;
    }
    const updatedPlanners = planners.map(planner => 
      planner.id === activePlanner.id ? {...planner, semesters} : planner
    );
    setPlanners(updatedPlanners);
    toast.success('Planner saved successfully.');
  };

  // Function to load a saved planner
  const loadPlanner = (planner) => {
    setActivePlanner(planner);
    setSemesters(planner.semesters);
    toast.info(`Loaded planner: ${planner.name}`);
  };

  // Update the existing useEffect to handle premium features
  useEffect(() => {
    const preloadedSchedule = [
      {
        id: 'Fall2024',
        name: 'Fall 2024',
        courses: [
          { id: 'IDST101', name: 'College Thriving', credits: 1, isPreloaded: true },
          { id: 'POLI150', name: 'International Relations', credits: 3, isPreloaded: true, satisfies: 'globalUnderstanding' },
          { id: 'ENGL105', name: 'English Compositions and Rhetoric, writing in the natural sciences', credits: 3, isPreloaded: true, satisfies: 'writing' },
          { id: 'STOR155', name: 'Statistics', credits: 3, isPreloaded: true, satisfies: 'quantReasoning' },
          { id: 'ECON101', name: 'Economics', credits: 4, isPreloaded: true, satisfies: 'waysKnowing' },
          { id: 'HIST140', name: 'World After 1945', credits: 3, isPreloaded: true, satisfies: 'humanPast' },
        ],
        credits: 17,
      },
      {
        id: 'Spring2025',
        name: 'Spring 2025',
        courses: [
          { id: 'ECON310', name: 'Intermediate Microeconomics', credits: 3, isPreloaded: true },
          { id: 'PHIL101', name: 'Philosophy', credits: 3, isPreloaded: true, satisfies: 'ethicValues' },
          { id: 'IDST126L', name: 'Lab', credits: 1, isPreloaded: true, satisfies: 'dataLiteracy' },
          { id: 'IDST126', name: 'Values and Prices', credits: 3, isPreloaded: true, satisfies: 'tripleI' },
          { id: 'HIST53', name: 'Traveling to European Cities: American Writers/Cultural Identities, 1830-2000.', credits: 3, isPreloaded: true, satisfies: 'firstYearSeminar' },
          { id: 'ECON125', name: 'Entrepreneurship', credits: 3, isPreloaded: true, satisfies: 'creativeExpression' },
        ],
        credits: 16,
      },
      {
        id: 'Fall2025',
        name: 'Fall 2025',
        courses: [
          { id: 'ECON410', name: 'Intermediate Micro', credits: 4, isPreloaded: true },
          { id: 'LFIT111', name: 'Swimming', credits: 1, isPreloaded: true },
          { id: 'HIST364', name: 'History of American Business', credits: 3, isPreloaded: true },
          { id: 'BUSI100', name: 'Intro to Business', credits: 1.5, isPreloaded: true },
          { id: 'COMM348', name: 'Algorithms in Society', credits: 3, isPreloaded: true, satisfies: 'powerDifference' },
          { id: 'ECON325', name: 'Entrepreneurship', credits: 3, isPreloaded: true },
        ],
        credits: 15.5,
      },
      {
        id: 'Spring2026',
        name: 'Spring 2026',
        courses: [
          { id: 'BUSI488', name: 'Data Science in the Business World', credits: 3, isPreloaded: true },
          { id: 'COMP110', name: 'Intro to Programming', credits: 3, isPreloaded: true },
          { id: 'BUSI407', name: 'Accounting', credits: 3, isPreloaded: true },
          { id: 'ECON327', name: 'Branding', credits: 3, isPreloaded: true },
          { id: 'BUSI506', name: 'Venture Capital', credits: 3, isPreloaded: true },
          { id: 'BUSI505', name: 'Entrepreneurial Consulting', credits: 3, isPreloaded: true, satisfies: 'highImpact' },
        ],
        credits: 18,
      },
      {
        id: 'Fall2026',
        name: 'Fall 2026',
        courses: [
          { id: 'BUSI406', name: 'Marketing', credits: 3, isPreloaded: true },
          { id: 'COMP283', name: 'Discrete Structures', credits: 3, isPreloaded: true },
          { id: 'BUSI408', name: 'Corporate Finance', credits: 3, isPreloaded: true },
          { id: 'BUSI405', name: 'Organizational Behavior', credits: 3, isPreloaded: true },
          { id: 'BUSI403', name: 'Operations and Technology Management', credits: 3, isPreloaded: true },
        ],
        credits: 15,
      },
    ];


    if (activeView === 'premium') {
      setSemesters(prevSemesters => {
        return prevSemesters.map(semester => {
          const preloadedSemester = preloadedSchedule.find(ps => ps.id === semester.id);
          if (preloadedSemester) {
            return {
              ...semester,
              courses: [...preloadedSemester.courses],
              credits: preloadedSemester.credits
            };
          }
          return semester;
        });
      });
    } else {
      setSemesters(prevSemesters => 
        prevSemesters.map(semester => ({
          ...semester,
          courses: [],
          credits: 0,
        }))
      );
    }
  }, [activeView]);

  // New component for the planner selection dropdown
  const PlannerSelector = () => (
    <select 
      value={activePlanner ? activePlanner.id : ''}
      onChange={(e) => {
        const selectedPlanner = planners.find(p => p.id.toString() === e.target.value);
        if (selectedPlanner) {
          loadPlanner(selectedPlanner);
        }
      }}
      className={`ml-2 p-1 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
    >
      <option value="">Select a planner</option>
      {planners.map(planner => (
        <option key={planner.id} value={planner.id}>{planner.name}</option>
      ))}
    </select>
  );

 

  const [graduationSemester, setGraduationSemester] = useState('Spring2028');

  const GraduationSemesterDropdown = () => {
  const options = ['Spring2027', 'Fall2027', 'Spring2028'];
  
  return (
    <select
      value={graduationSemester}
      onChange={(e) => setGraduationSemester(e.target.value)}
      className={`ml-2 p-1 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
    >
      {options.map(semester => (
        <option key={semester} value={semester}>Graduate {semester.replace(/(\d{4})/, ' $1')}</option>
      ))}
    </select>
  );
  };
  const filterSemesters = (allSemesters, gradSemester) => {
  const semesterOrder = [
    'Fall2024', 'Spring2025', 'Fall2025', 'Spring2026', 
    'Fall2026', 'Spring2027', 'Fall2027', 'Spring2028'
  ];
  const gradIndex = semesterOrder.indexOf(gradSemester);
  return allSemesters.filter(semester => 
    semesterOrder.indexOf(semester.id) <= gradIndex
  );
  };
  useEffect(() => {
    const fixedSemesters = [
      { id: 'Fall2024', name: 'Fall 2024', courses: [], credits: 0 },
      { id: 'Spring2025', name: 'Spring 2025', courses: [], credits: 0 },
      { id: 'Fall2025', name: 'Fall 2025', courses: [], credits: 0 },
      { id: 'Spring2026', name: 'Spring 2026', courses: [], credits: 0 },
      { id: 'Fall2026', name: 'Fall 2026', courses: [], credits: 0 },
      { id: 'Spring2027', name: 'Spring 2027', courses: [], credits: 0 },
      { id: 'Fall2027', name: 'Fall 2027', courses: [], credits: 0 },
      { id: 'Spring2028', name: 'Spring 2028', courses: [], credits: 0 },
    ];
    const preloadedSchedule = [
      {
        id: 'Fall2024',
        name: 'Fall 2024',
        courses: [
          { id: 'IDST101', name: 'College Thriving', credits: 1, isPreloaded: true },
          { id: 'POLI150', name: 'International Relations', credits: 3, isPreloaded: true, satisfies: 'globalUnderstanding' },
          { id: 'ENGL105', name: 'English Compositions and Rhetoric, writing in the natural sciences', credits: 3, isPreloaded: true, satisfies: 'writing' },
          { id: 'STOR155', name: 'Statistics', credits: 3, isPreloaded: true, satisfies: 'quantReasoning' },
          { id: 'ECON101', name: 'Economics', credits: 4, isPreloaded: true, satisfies: 'waysKnowing' },
          { id: 'HIST140', name: 'World After 1945', credits: 3, isPreloaded: true, satisfies: 'humanPast' },
        ],
        credits: 17,
      },
      {
        id: 'Spring2025',
        name: 'Spring 2025',
        courses: [
          { id: 'ECON310', name: 'Intermediate Microeconomics', credits: 3, isPreloaded: true },
          { id: 'PHIL101', name: 'Philosophy', credits: 3, isPreloaded: true, satisfies: 'ethicValues' },
          { id: 'IDST126L', name: 'Lab', credits: 1, isPreloaded: true, satisfies: 'dataLiteracy' },
          { id: 'IDST126', name: 'Values and Prices', credits: 3, isPreloaded: true, satisfies: 'tripleI' },
          { id: 'HIST53', name: 'Traveling to European Cities: American Writers/Cultural Identities, 1830-2000.', credits: 3, isPreloaded: true, satisfies: 'firstYearSeminar' },
          { id: 'ECON125', name: 'Entrepreneurship', credits: 3, isPreloaded: true, satisfies: 'creativeExpression' },
        ],
        credits: 16,
      },
      {
        id: 'Fall2025',
        name: 'Fall 2025',
        courses: [
          { id: 'ECON410', name: 'Intermediate Micro', credits: 4, isPreloaded: true },
          { id: 'LFIT111', name: 'Swimming', credits: 1, isPreloaded: true },
          { id: 'HIST364', name: 'History of American Business', credits: 3, isPreloaded: true },
          { id: 'BUSI100', name: 'Intro to Business', credits: 1.5, isPreloaded: true },
          { id: 'COMM348', name: 'Algorithms in Society', credits: 3, isPreloaded: true, satisfies: 'powerDifference' },
          { id: 'ECON325', name: 'Entrepreneurship', credits: 3, isPreloaded: true },
        ],
        credits: 15.5,
      },
      {
        id: 'Spring2026',
        name: 'Spring 2026',
        courses: [
          { id: 'BUSI488', name: 'Data Science in the Business World', credits: 3, isPreloaded: true },
          { id: 'COMP110', name: 'Intro to Programming', credits: 3, isPreloaded: true },
          { id: 'BUSI407', name: 'Accounting', credits: 3, isPreloaded: true },
          { id: 'ECON327', name: 'Branding', credits: 3, isPreloaded: true },
          { id: 'BUSI506', name: 'Venture Capital', credits: 3, isPreloaded: true },
          { id: 'BUSI505', name: 'Entrepreneurial Consulting', credits: 3, isPreloaded: true, satisfies: 'highImpact' },
        ],
        credits: 18,
      },
      {
        id: 'Fall2026',
        name: 'Fall 2026',
        courses: [
          { id: 'BUSI406', name: 'Marketing', credits: 3, isPreloaded: true },
          { id: 'COMP283', name: 'Discrete Structures', credits: 3, isPreloaded: true },
          { id: 'BUSI408', name: 'Corporate Finance', credits: 3, isPreloaded: true },
          { id: 'BUSI405', name: 'Organizational Behavior', credits: 3, isPreloaded: true },
          { id: 'BUSI403', name: 'Operations and Technology Management', credits: 3, isPreloaded: true },
        ],
        credits: 15,
      },
    ];

  let filteredSemesters = filterSemesters(fixedSemesters, graduationSemester);
  
  if (activeView === 'premium') {
    setSemesters(filteredSemesters.map(semester => {
      const preloadedSemester = preloadedSchedule.find(ps => ps.id === semester.id);
      if (preloadedSemester) {
        return {
          ...semester,
          courses: [...preloadedSemester.courses],
          credits: preloadedSemester.credits
        };
      }
      return semester;
    }));
  } else {
    setSemesters(filteredSemesters);
  }
  }, [activeView, graduationSemester]);

  const [showAIPlanModal, setShowAIPlanModal] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState('');

  useEffect(() => {
    const preloadedSchedule = [
      {
        id: 'Fall2024',
        name: 'Fall 2024',
        courses: [
          { id: 'IDST101', name: 'College Thriving', credits: 1, isPreloaded: true },
          { id: 'POLI150', name: 'International Relations', credits: 3, isPreloaded: true, satisfies: 'globalUnderstanding' },
          { id: 'ENGL105', name: 'English Compositions and Rhetoric, writing in the natural sciences', credits: 3, isPreloaded: true, satisfies: 'writing' },
          { id: 'STOR155', name: 'Statistics', credits: 3, isPreloaded: true, satisfies: 'quantReasoning' },
          { id: 'ECON101', name: 'Economics', credits: 4, isPreloaded: true, satisfies: 'waysKnowing' },
          { id: 'HIST140', name: 'World After 1945', credits: 3, isPreloaded: true, satisfies: 'humanPast' },
        ],
        credits: 17,
      },
      {
        id: 'Spring2025',
        name: 'Spring 2025',
        courses: [
          { id: 'ECON310', name: 'Intermediate Microeconomics', credits: 3, isPreloaded: true },
          { id: 'PHIL101', name: 'Philosophy', credits: 3, isPreloaded: true, satisfies: 'ethicValues' },
          { id: 'IDST126L', name: 'Lab', credits: 1, isPreloaded: true, satisfies: 'dataLiteracy' },
          { id: 'IDST126', name: 'Values and Prices', credits: 3, isPreloaded: true, satisfies: 'tripleI' },
          { id: 'HIST53', name: 'Traveling to European Cities: American Writers/Cultural Identities, 1830-2000.', credits: 3, isPreloaded: true, satisfies: 'firstYearSeminar' },
          { id: 'ECON125', name: 'Entrepreneurship', credits: 3, isPreloaded: true, satisfies: 'creativeExpression' },
        ],
        credits: 16,
      },
      {
        id: 'Fall2025',
        name: 'Fall 2025',
        courses: [
          { id: 'ECON410', name: 'Intermediate Micro', credits: 4, isPreloaded: true },
          { id: 'LFIT111', name: 'Swimming', credits: 1, isPreloaded: true },
          { id: 'HIST364', name: 'History of American Business', credits: 3, isPreloaded: true },
          { id: 'BUSI100', name: 'Intro to Business', credits: 1.5, isPreloaded: true },
          { id: 'COMM348', name: 'Algorithms in Society', credits: 3, isPreloaded: true, satisfies: 'powerDifference' },
          { id: 'ECON325', name: 'Entrepreneurship', credits: 3, isPreloaded: true },
        ],
        credits: 15.5,
      },
      {
        id: 'Spring2026',
        name: 'Spring 2026',
        courses: [
          { id: 'BUSI488', name: 'Data Science in the Business World', credits: 3, isPreloaded: true },
          { id: 'COMP110', name: 'Intro to Programming', credits: 3, isPreloaded: true },
          { id: 'BUSI407', name: 'Accounting', credits: 3, isPreloaded: true },
          { id: 'ECON327', name: 'Branding', credits: 3, isPreloaded: true },
          { id: 'BUSI506', name: 'Venture Capital', credits: 3, isPreloaded: true },
          { id: 'BUSI505', name: 'Entrepreneurial Consulting', credits: 3, isPreloaded: true, satisfies: 'highImpact' },
        ],
        credits: 18,
      },
      {
        id: 'Fall2026',
        name: 'Fall 2026',
        courses: [
          { id: 'BUSI406', name: 'Marketing', credits: 3, isPreloaded: true },
          { id: 'COMP283', name: 'Discrete Structures', credits: 3, isPreloaded: true },
          { id: 'BUSI408', name: 'Corporate Finance', credits: 3, isPreloaded: true },
          { id: 'BUSI405', name: 'Organizational Behavior', credits: 3, isPreloaded: true },
          { id: 'BUSI403', name: 'Operations and Technology Management', credits: 3, isPreloaded: true },
        ],
        credits: 15,
      },
    ];
    if (activeView === 'premium') {
      setSemesters(prevSemesters => {
        return prevSemesters.map(semester => {
          const preloadedSemester = preloadedSchedule.find(ps => ps.id === semester.id);
          if (preloadedSemester) {
            return {
              ...semester,
              courses: [...preloadedSemester.courses],
              credits: preloadedSemester.credits
            };
          }
          return semester;
        });
      });
  
      // Automatically set AP credit for calculus in premium view
      setApCredits(prevCredits => ({
        ...prevCredits,
        calculus: true
      }));
    } else {
      setSemesters(prevSemesters => 
        prevSemesters.map(semester => ({
          ...semester,
          courses: [],
          credits: 0,
        }))
      );
  
      // Reset AP credits in basic view
      setApCredits({
        calculus: false,
        statistics: false,
        microeconomics: false,
        macroeconomics: false,
      });
    }
  }, [activeView]);

  const generateAIPlan = () => {
    if (!selectedMajor) {
      toast.error("Please select a major.");
      return;
    }
  
    // Helper function to check if a requirement is fulfilled
    const isRequirementFulfilled = (requirement) => {
      if (requirement.isElective) {
        return requirement.completed >= requirement.required;
      }
      return requirement.completed === requirement.required;
    };
  
    // Get unfulfilled requirements
    let unfulfilledRequirements = [];
    if (selectedMajor === 'business') {
      majorRequirements.requirements.forEach(requirement => {
        if (requirement.isCollapsible) {
          requirement.subRequirements.forEach(subReq => {
            if (!isRequirementFulfilled(subReq)) {
              unfulfilledRequirements.push(subReq);
            }
          });
        } else if (!isRequirementFulfilled(requirement)) {
          unfulfilledRequirements.push(requirement);
        }
      });
    } else if (selectedMajor === 'cs') {
      const csRequirements = [
        { courses: csCoreCourses, required: csCoreCourses.length, isElective: false },
        { courses: csElectives, required: 2, isElective: true },
        { courses: csAdditionalElectives, required: 5, isElective: true },
        { courses: csAdditionalRequirements, required: csAdditionalRequirements.length, isElective: false }
      ];
  
      csRequirements.forEach(req => {
        const completedCourses = semesters.flatMap(sem => sem.courses)
          .filter(course => req.courses.some(reqCourse => reqCourse.id === course.id));
        const completed = completedCourses.length;
        if (completed < req.required) {
          unfulfilledRequirements.push({
            ...req,
            completed: completed,
            courses: req.courses.map(course => course.id)
          });
        }
      });
    }
  
    // Get courses to suggest
    let coursesToSuggest = [];
    unfulfilledRequirements.forEach(req => {
      const remainingCount = req.isElective ? 
        Math.ceil((req.required - req.completed) / 1.5) : // Assuming most electives are 3 credit hours
        req.required - req.completed;
      
      const availableCourses = req.courses
        .filter(courseId => !isCourseTaken(courseId))
        .map(courseId => courses.find(c => c.id === courseId))
        .filter(course => course !== undefined);
      
      // For electives, prefer 500+ level courses
      if (req.isElective) {
        availableCourses.sort((a, b) => {
          const levelA = parseInt(a.id.match(/\d+/)[0]);
          const levelB = parseInt(b.id.match(/\d+/)[0]);
          return levelB - levelA;
        });
      }
      
      coursesToSuggest = coursesToSuggest.concat(availableCourses.slice(0, remainingCount));
    });
  
    // Add courses to semesters
    const newSemesters = [...semesters];
    let courseIndex = 0;
  
    for (let i = newSemesters.findIndex(sem => sem.id === 'Fall2026'); i < newSemesters.length; i++) {
      let semester = newSemesters[i];
      const semesterCourses = [...semester.courses];
      let semesterCredits = semester.credits;
  
      while (semesterCredits < 18 && courseIndex < coursesToSuggest.length) {
        const course = coursesToSuggest[courseIndex];
        
        if (course && semesterCredits + course.credits <= 18) {
          semesterCourses.push(course);
          semesterCredits += course.credits;
          courseIndex++;
        } else {
          break;
        }
      }
  
      newSemesters[i] = {
        ...semester,
        courses: semesterCourses,
        credits: semesterCredits
      };
  
      if (courseIndex >= coursesToSuggest.length) break;
    }
  
    if (courseIndex < coursesToSuggest.length) {
      toast.warning(`Not all suggested courses could be added. ${coursesToSuggest.length - courseIndex} courses remaining.`);
    } else {
      toast.success("All suggested courses have been added to the plan.");
    }
  
    setSemesters(newSemesters);
    setShowAIPlanModal(false);
  };
  const resetPlanner = () => {
    const confirmReset = window.confirm("Are you sure you want to reset the planner? This will remove all manually added courses.");
    
    if (confirmReset) {
      setSemesters(prevSemesters => 
        prevSemesters.map(semester => ({
          ...semester,
          courses: semester.courses.filter(course => course.isPreloaded),
          credits: semester.courses.filter(course => course.isPreloaded)
                    .reduce((sum, course) => sum + course.credits, 0)
        }))
      );
      toast.info("Planner has been reset. All manually added courses have been removed.");
    }
  };

  const handleGenEdFindCourses = (requirement) => {
    setSearchResults([...requirement.availableCourses, ...requirement.takenCourses.map(course => ({
      ...course,
      isTaken: true
    }))]);
  };

  

  useEffect(() => {
    const preloadedSchedule = [
      {
        id: 'Fall2024',
        name: 'Fall 2024',
        courses: [
          { id: 'IDST101', name: 'College Thriving', credits: 1, isPreloaded: true },
          { id: 'POLI150', name: 'International Relations', credits: 3, isPreloaded: true, satisfies: 'globalUnderstanding' },
          { id: 'ENGL105', name: 'English Compositions and Rhetoric, writing in the natural sciences', credits: 3, isPreloaded: true, satisfies: 'writing' },
          { id: 'STOR155', name: 'Statistics', credits: 3, isPreloaded: true, satisfies: 'quantReasoning' },
          { id: 'ECON101', name: 'Economics', credits: 4, isPreloaded: true, satisfies: 'waysKnowing' },
          { id: 'HIST140', name: 'World After 1945', credits: 3, isPreloaded: true, satisfies: 'humanPast' },
        ],
        credits: 17,
      },
      {
        id: 'Spring2025',
        name: 'Spring 2025',
        courses: [
          { id: 'ECON310', name: 'Intermediate Microeconomics', credits: 3, isPreloaded: true },
          { id: 'PHIL101', name: 'Philosophy', credits: 3, isPreloaded: true, satisfies: 'ethicValues' },
          { id: 'IDST126L', name: 'Lab', credits: 1, isPreloaded: true, satisfies: 'dataLiteracy' },
          { id: 'IDST126', name: 'Values and Prices', credits: 3, isPreloaded: true, satisfies: 'tripleI' },
          { id: 'HIST53', name: 'Traveling to European Cities: American Writers/Cultural Identities, 1830-2000.', credits: 3, isPreloaded: true, satisfies: 'firstYearSeminar' },
          { id: 'ECON125', name: 'Entrepreneurship', credits: 3, isPreloaded: true, satisfies: 'creativeExpression' },
        ],
        credits: 16,
      },
      {
        id: 'Fall2025',
        name: 'Fall 2025',
        courses: [
          { id: 'ECON410', name: 'Intermediate Micro', credits: 4, isPreloaded: true },
          { id: 'LFIT111', name: 'Swimming', credits: 1, isPreloaded: true },
          { id: 'HIST364', name: 'History of American Business', credits: 3, isPreloaded: true },
          { id: 'BUSI100', name: 'Intro to Business', credits: 1.5, isPreloaded: true },
          { id: 'COMM348', name: 'Algorithms in Society', credits: 3, isPreloaded: true, satisfies: 'powerDifference' },
          { id: 'ECON325', name: 'Entrepreneurship', credits: 3, isPreloaded: true },
        ],
        credits: 15.5,
      },
      {
        id: 'Spring2026',
        name: 'Spring 2026',
        courses: [
          { id: 'BUSI488', name: 'Data Science in the Business World', credits: 3, isPreloaded: true },
          { id: 'COMP110', name: 'Intro to Programming', credits: 3, isPreloaded: true },
          { id: 'BUSI407', name: 'Accounting', credits: 3, isPreloaded: true },
          { id: 'ECON327', name: 'Branding', credits: 3, isPreloaded: true },
          { id: 'BUSI506', name: 'Venture Capital', credits: 3, isPreloaded: true },
          { id: 'BUSI505', name: 'Entrepreneurial Consulting', credits: 3, isPreloaded: true, satisfies: 'highImpact' },
        ],
        credits: 18,
      },
      {
        id: 'Fall2026',
        name: 'Fall 2026',
        courses: [
          { id: 'BUSI406', name: 'Marketing', credits: 3, isPreloaded: true },
          { id: 'COMP283', name: 'Discrete Structures', credits: 3, isPreloaded: true },
          { id: 'BUSI408', name: 'Corporate Finance', credits: 3, isPreloaded: true },
          { id: 'BUSI405', name: 'Organizational Behavior', credits: 3, isPreloaded: true },
          { id: 'BUSI403', name: 'Operations and Technology Management', credits: 3, isPreloaded: true },
        ],
        credits: 15,
      },
    ];
  const allPreloadedCourses = preloadedSchedule.flatMap(semester => semester.courses);
  setPreloadedCourses(allPreloadedCourses);
  }, []);

 

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={rectIntersection}
    >
      
      <div className={`flex flex-col h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        {/* Header with tabs and Premium info */}
        <div className={`flex justify-between items-center p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                activeView === 'basic'
                  ? isDarkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-700 text-white'
                  : isDarkMode
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-white text-gray-900 hover:bg-gray-100'
              }`}
              onClick={() => setActiveView('basic')}
            >
              Basic
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                activeView === 'premium'
                  ? isDarkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-700 text-white'
                  : isDarkMode
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-white text-gray-900 hover:bg-gray-100'
              }`}
              onClick={() => setActiveView('premium')}
            >
              Premium
            </button>
          </div>
          {activeView === 'premium' && (
            <div className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'} flex items-center`}>
              <button
                onClick={() => setShowNewPlannerModal(true)}
                className={`mr-2 px-3 py-1 rounded ${isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              >
                New Planner
              </button>
              <button
                onClick={saveCurrentPlanner}
                className={`mr-2 px-3 py-1 rounded ${isDarkMode ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-green-500 text-white hover:bg-green-600'}`}
              >
                Save Planner
              </button>
              <button
                onClick={() => setShowAIPlanModal(true)}
                className={`mr-2 px-3 py-1 rounded ${isDarkMode ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-purple-500 text-white hover:bg-purple-600'}`}
              >
                AI Plan
              </button>
              <button
                onClick={resetPlanner}
                className={`mr-2 px-3 py-1 rounded ${isDarkMode ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-red-500 text-white hover:bg-red-600'}`}
              >
                Reset
              </button>
              <PlannerSelector />
              <GraduationSemesterDropdown />
            </div>
          )}
        </div>
  
        {/* Main content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Search section */}
          <div className={`w-1/5 p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} overflow-y-auto border-r ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <input
              type="text"
              placeholder="Search courses"
              value={searchTerm}
              onChange={handleSearch}
              className={`w-full p-2 mb-4 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            />
            <div className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total items: {searchResults.length}</div>
            <div className="space-y-2">
              {searchResults.map(course => (
                <SortableCourse 
                  key={course.id} 
                  course={course} 
                  removeCourseFromSemester={removeCourseFromSemester}
                  semesters={semesters}
                />
              ))}
            </div>
          </div>
  
          {/* Semester grid */}
          <div className={`w-3/5 p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} overflow-y-auto`}>
            <div className="grid grid-cols-4 gap-4 auto-rows-fr">
              {semesters.map((semester) => (
                <DroppableSemester key={semester.id} semester={semester}>
                  <SortableContext items={semester.courses.map(course => course.id)} strategy={verticalListSortingStrategy}>
                    {semester.courses.map((course) => (
                      <SortableCourse 
                        key={course.id} 
                        course={course} 
                        semesterId={semester.id}
                        removeCourseFromSemester={removeCourseFromSemester}
                        semesters={semesters}
                      />
                    ))}
                  </SortableContext>
                </DroppableSemester>
              ))}
            </div>
          </div>
  
          {/* Major Requirements Sidebar */}
          <div className={`w-1/5 p-4 ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} overflow-y-auto border-l ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            {/* Major toggle buttons */}
            <div className="flex mb-4">
              <button
                className={`mr-2 px-3 py-1 rounded transition-colors ${
                  activeMajor === 'business' 
                    ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                    : (isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
                }`}
                onClick={() => setActiveMajor('business')}
              >
                Business
              </button>
              <button
                className={`mr-2 px-3 py-1 rounded transition-colors ${
                  activeMajor === 'cs' 
                    ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                    : (isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
                }`}
                onClick={() => setActiveMajor('cs')}
              >
                CS
              </button>
              <button
                className={`px-3 py-1 rounded transition-colors ${
                  activeMajor === 'genEd' 
                    ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                    : (isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
                }`}
                onClick={() => setActiveMajor('genEd')}
              >
                Gen-Ed
              </button>
            </div>
  
            {activeMajor === 'business' ? (
              // Business Administration requirements
              <div>
                <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{majorRequirements.name}</h2>
                
                {/* Tab buttons */}
                <div className="flex mb-4">
                  <button
                    className={`mr-2 px-3 py-1 rounded transition-colors ${
                      activeTab === 'requirements' 
                        ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                        : (isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
                    }`}
                    onClick={() => setActiveTab('requirements')}
                  >
                    Requirements
                  </button>
                  <button
                    className={`px-3 py-1 rounded transition-colors ${
                      activeTab === 'apCredits' 
                        ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                        : (isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
                    }`}
                    onClick={() => setActiveTab('apCredits')}
                  >
                    AP Credits
                  </button>
                </div>
  
                {/* Tab content */}
                {activeTab === 'requirements' ? (
                  <div>
                    {majorRequirements.requirements.map(requirement => (
                      <div key={requirement.id} className="mb-4">
                        {requirement.isCollapsible ? (
                          <CollapsibleRequirement requirement={requirement} onRequirementClick={handleRequirementClick} />
                        ) : (
                          <RequirementItem requirement={requirement} onRequirementClick={handleRequirementClick} />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Pre-College Credits</h3>
                    <div className="flex flex-col">
                      {Object.entries(apCredits).map(([credit, value]) => (
                        <label key={credit} className={`flex items-center mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={() => setApCredits(prev => ({ ...prev, [credit]: !prev[credit] }))}
                            className={`mr-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                          />
                          {credit.charAt(0).toUpperCase() + credit.slice(1)}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : activeMajor === 'cs' ? (
              // Computer Science requirements
              <ComputerScienceMajorRequirements 
                semesters={semesters}
                handleRequirementClick={handleRequirementClick}
                handleFindCourses={handleFindCourses}
              />
            ) : (
              // Gen-Ed requirements
              <GenEdRequirements 
              semesters={semesters}
              handleFindCourses={handleGenEdFindCourses}
              preloadedCourses={preloadedCourses}
              apCredits={apCredits}
              genEdCourses={genEdCourses}
              
              
            />
            )}
          </div>
        </div>
        {/* Requirement Details Popup */}
      {showRequirementDetails && selectedRequirement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className={`p-6 rounded-lg max-w-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            <h2 className="text-xl font-bold mb-4">{selectedRequirement.name}</h2>
            {selectedRequirement.isElective ? (
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                Kenan-Flagler Business School requires 15 credit hours of electives to provide students with the flexibility to explore various aspects of business and tailor their education to their specific interests and career goals. These electives allow students to gain deeper knowledge in specific areas, complement their core business education, and develop a well-rounded skill set that is highly valued in the business world.
              </p>
            ) : (
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>This requirement is essential for your degree. Make sure to complete all required courses.</p>
            )}
            <button 
              onClick={() => handleFindCourses(selectedRequirement)}
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

      {/* New Planner Modal */}
      {showNewPlannerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            <h2 className="text-xl font-bold mb-4">Create New Planner</h2>
            <input
              type="text"
              value={newPlannerName}
              onChange={(e) => setNewPlannerName(e.target.value)}
              placeholder="Enter planner name"
              className={`w-full p-2 mb-4 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowNewPlannerModal(false)}
                className={`mr-2 px-4 py-2 rounded ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'}`}
              >
                Cancel
              </button>
              <button
                onClick={createNewPlanner}
                className={`px-4 py-2 rounded ${isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Plan Modal */}
      {showAIPlanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            <h2 className="text-xl font-bold mb-4">Generate AI Plan</h2>
            <select
              value={selectedMajor}
              onChange={(e) => setSelectedMajor(e.target.value)}
              className={`w-full p-2 mb-4 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            >
              <option value="">Select a major</option>
              <option value="business">Business Administration</option>
              <option value="cs">Computer Science</option>
            </select>
            <div className="flex justify-end">
              <button
                onClick={() => setShowAIPlanModal(false)}
                className={`mr-2 px-4 py-2 rounded ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'}`}
              >
                Cancel
              </button>
              <button
                onClick={generateAIPlan}
                className={`px-4 py-2 rounded ${isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              >
                Generate Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

    <DragOverlay>
      {activeId ? (
        <div className={`p-2 rounded shadow ${getCourseColor(courses.find(c => c.id === activeId))}`}>
          <span className="font-bold">{activeId}</span>
        </div>
      ) : null}
    </DragOverlay>
    <ToastContainer />
  </DndContext>
);}

export default DegreePlanning;
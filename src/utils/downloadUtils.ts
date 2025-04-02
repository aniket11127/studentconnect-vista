
import { toast } from "sonner";

// Function to simulate file download
export const downloadResource = (fileName: string, fileType = 'pdf') => {
  if (!fileName) {
    toast.error("Resource not available", {
      description: "The file you're trying to download is not available.",
    });
    return;
  }
  
  // In a real application, this would fetch the file from a server
  // For this simulation, we'll create a dummy download process
  
  toast.info("Preparing download...", {
    description: `${fileName} is being prepared for download.`,
    duration: 2000,
  });
  
  // Simulate network delay
  setTimeout(() => {
    try {
      // In a real application, you would use something like:
      // const response = await fetch(`/api/resources/${fileName}`);
      // const blob = await response.blob();
      // const url = window.URL.createObjectURL(blob);
      
      // For simulation purposes, we'll create a dummy content
      const dummyContent = createDummyContent(fileName, fileType);
      
      // Create a blob with the dummy content
      const blob = new Blob([dummyContent], { type: `application/${fileType}` });
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${fileName}.${fileType}`);
      
      // Append to body, click and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      window.URL.revokeObjectURL(url);
      
      toast.success("Download started!", {
        description: `${fileName} should download shortly.`,
      });
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Download failed", {
        description: "There was an error downloading the file. Please try again later.",
      });
    }
  }, 1500);
};

// Enhanced function to create dummy content based on file type and course information
const createDummyContent = (fileName: string, fileType: string) => {
  const courseTopics: Record<string, string[]> = {
    'ms-excel': [
      'Introduction to Excel Interface',
      'Basic Formulas and Functions',
      'Data Formatting and Visualization',
      'Advanced Functions (VLOOKUP, INDEX/MATCH)',
      'PivotTables and PivotCharts',
      'Data Analysis Tools',
      'Macros and VBA Basics'
    ],
    'ms-word': [
      'Word Interface and Navigation',
      'Document Formatting Techniques',
      'Working with Tables and Images',
      'Mail Merge',
      'Styles and Templates',
      'Collaborative Editing Features',
      'Advanced Document Elements'
    ],
    'python-programming': [
      'Python Syntax and Data Types',
      'Control Flow (if statements, loops)',
      'Functions and Modules',
      'Data Structures (lists, dictionaries)',
      'File Handling',
      'Object-Oriented Programming',
      'Error Handling',
      'Libraries (NumPy, Pandas)'
    ],
    'web-development': [
      'HTML Fundamentals',
      'CSS Styling and Layout',
      'JavaScript Basics',
      'DOM Manipulation',
      'Responsive Design Principles',
      'Frontend Frameworks Introduction',
      'API Integration',
      'Web Performance Optimization'
    ],
    'sql-database': [
      'Database Concepts and Design',
      'SQL Query Basics',
      'Data Retrieval with SELECT',
      'Data Manipulation (INSERT, UPDATE, DELETE)',
      'Joins and Relationships',
      'Indexing and Performance',
      'Stored Procedures and Functions',
      'Database Security'
    ],
    'prompt-engineering': [
      'Introduction to Large Language Models',
      'Prompt Structure and Elements',
      'Context Setting Techniques',
      'Few-shot Learning Examples',
      'Chain of Thought Prompting',
      'Output Format Control',
      'Prompt Iteration and Refinement',
      'Multi-modal Prompting'
    ]
  };
  
  // Get course name from file name
  let courseName = 'general';
  Object.keys(courseTopics).forEach(key => {
    if (fileName.toLowerCase().includes(key)) {
      courseName = key;
    }
  });

  const topics = courseTopics[courseName] || [
    'Course Introduction',
    'Key Concepts and Terminology',
    'Practical Applications',
    'Advanced Techniques',
    'Case Studies',
    'Best Practices',
    'Future Trends'
  ];

  // Enhanced PDF content with better structure and details
  if (fileType === 'pdf') {
    // Generate a more structured PDF content
    return `
==================================
${formatTitle(fileName)} - COURSE OVERVIEW
==================================

COURSE OUTLINE:
${topics.map((topic, index) => `${index + 1}. ${topic}`).join('\n')}

LEARNING OBJECTIVES:
${generateLearningObjectives(courseName)}

MODULES:
${generateModules(courseName)}

PROJECTS:
${generateProjects(courseName)}

EXERCISES:
${generateExercises(courseName)}

RESOURCES:
- Comprehensive course slides
- Hands-on practice exercises
- Real-world project templates
- Reference materials and cheat sheets
- Video tutorials for key concepts

==================================
This is a simulated PDF file for learning purposes.
In a real application, this would contain actual course materials.
==================================
`;
  } else if (fileType === 'zip') {
    return `
[SIMULATED ZIP ARCHIVE]
Contains the following files:
- ${fileName}_lecture_notes.pdf
- ${fileName}_exercises.pdf
- ${fileName}_project_templates.pdf
- ${fileName}_resources.pdf
- ${fileName}_solutions.pdf
- ${fileName}_supplementary_materials.pdf

This is a simulated ZIP file for learning purposes.
In a real application, this would contain actual course materials.
`;
  } else {
    return `This is a simulated ${fileType.toUpperCase()} file for ${formatTitle(fileName)}.\n\n` +
      `This would be the actual course content in a real application.`;
  }
};

// Helper function to format title nicely
const formatTitle = (fileName: string): string => {
  return fileName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Generate learning objectives based on course type
const generateLearningObjectives = (courseType: string): string => {
  const objectives: Record<string, string[]> = {
    'ms-excel': [
      'Master Excel interface and navigation',
      'Create and manipulate formulas and functions',
      'Design professional spreadsheets and data visualizations',
      'Perform data analysis using PivotTables and charts',
      'Build automated workflows using macros'
    ],
    'ms-word': [
      'Navigate Word's interface efficiently',
      'Apply professional document formatting techniques',
      'Create and manage templates for consistent documents',
      'Implement advanced features like mail merge',
      'Use collaborative editing tools effectively'
    ],
    'python-programming': [
      'Understand Python syntax and data structures',
      'Write efficient and readable Python code',
      'Implement object-oriented programming concepts',
      'Create practical applications using Python libraries',
      'Debug and optimize Python programs'
    ],
    'web-development': [
      'Build responsive websites using HTML, CSS, and JavaScript',
      'Implement modern web design principles',
      'Create interactive user interfaces',
      'Connect frontend applications to APIs',
      'Optimize web applications for performance'
    ],
    'sql-database': [
      'Design efficient database schemas',
      'Write complex SQL queries for data retrieval',
      'Implement database security best practices',
      'Optimize database performance',
      'Manage database relationships effectively'
    ],
    'prompt-engineering': [
      'Understand how large language models process prompts',
      'Craft effective prompts for different AI applications',
      'Implement advanced prompting techniques',
      'Troubleshoot and refine prompts for better results',
      'Apply prompt engineering in practical scenarios'
    ],
    'general': [
      'Understand core concepts and terminology',
      'Apply learned techniques to practical scenarios',
      'Develop problem-solving skills in the subject area',
      'Create professional-quality projects',
      'Prepare for advanced learning in the field'
    ]
  };

  return (objectives[courseType] || objectives['general']).map((obj, i) => `${i + 1}. ${obj}`).join('\n');
};

// Generate modules content
const generateModules = (courseType: string): string => {
  const modules: Record<string, string[]> = {
    'ms-excel': [
      'Module 1: Excel Fundamentals - Interface, navigation, basic operations',
      'Module 2: Working with Data - Formulas, functions, cell references',
      'Module 3: Data Visualization - Charts, conditional formatting, sparklines',
      'Module 4: Data Analysis - PivotTables, data validation, what-if analysis',
      'Module 5: Advanced Excel - Macros, VBA introduction, automation'
    ],
    'ms-word': [
      'Module 1: Word Basics - Interface, navigation, document creation',
      'Module 2: Text Formatting - Styles, themes, formatting techniques',
      'Module 3: Document Elements - Tables, images, headers/footers',
      'Module 4: Advanced Features - Mail merge, forms, collaboration tools',
      'Module 5: Professional Documents - Templates, long document management'
    ],
    'python-programming': [
      'Module 1: Python Fundamentals - Syntax, data types, control structures',
      'Module 2: Functions and Modules - Creating reusable code',
      'Module 3: Data Structures - Lists, dictionaries, sets, tuples',
      'Module 4: Object-Oriented Programming - Classes, inheritance, polymorphism',
      'Module 5: Practical Python - Working with files, APIs, and libraries'
    ],
    'web-development': [
      'Module 1: HTML Fundamentals - Structure, elements, semantic markup',
      'Module 2: CSS Styling - Selectors, properties, layouts',
      'Module 3: JavaScript Basics - Syntax, DOM manipulation, events',
      'Module 4: Responsive Design - Media queries, flexbox, grid',
      'Module 5: Web Applications - APIs, forms, state management'
    ],
    'sql-database': [
      'Module 1: Database Fundamentals - Concepts, design principles',
      'Module 2: SQL Queries - SELECT, filtering, sorting, aggregation',
      'Module 3: Data Manipulation - INSERT, UPDATE, DELETE statements',
      'Module 4: Relationships - Joins, foreign keys, normalization',
      'Module 5: Advanced Database Topics - Indexing, optimization, security'
    ],
    'prompt-engineering': [
      'Module 1: AI Models Introduction - Understanding foundation models',
      'Module 2: Prompt Basics - Structure, clarity, context setting',
      'Module 3: Advanced Techniques - Chain-of-thought, few-shot learning',
      'Module 4: Domain-Specific Prompting - Code, creative, analytical tasks',
      'Module 5: Prompt Optimization - Testing, iteration, versioning'
    ],
    'general': [
      'Module 1: Fundamentals - Core concepts and principles',
      'Module 2: Intermediate Techniques - Building on the basics',
      'Module 3: Practical Applications - Real-world usage scenarios',
      'Module 4: Advanced Topics - Complex techniques and specialized knowledge',
      'Module 5: Mastery and Integration - Bringing it all together'
    ]
  };

  return (modules[courseType] || modules['general']).join('\n');
};

// Generate projects content
const generateProjects = (courseType: string): string => {
  const projects: Record<string, string[]> = {
    'ms-excel': [
      'Project 1: Personal Budget Tracker - Create a comprehensive budget spreadsheet with formulas and charts',
      'Project 2: Business Dashboard - Design an interactive sales dashboard with PivotTables and slicers',
      'Project 3: Automated Inventory System - Build an inventory management tool with macros and data validation'
    ],
    'ms-word': [
      'Project 1: Professional Resume - Create a professionally formatted resume with advanced layout features',
      'Project 2: Company Newsletter - Design a multi-page newsletter with various content elements',
      'Project 3: Automated Report Template - Build a report template with fields and automated elements'
    ],
    'python-programming': [
      'Project 1: Data Analysis Tool - Create a program to analyze and visualize datasets',
      'Project 2: Task Management System - Build a command-line application for managing tasks',
      'Project 3: Web Scraper - Develop a tool to extract and process information from websites'
    ],
    'web-development': [
      'Project 1: Personal Portfolio - Create a responsive personal portfolio website',
      'Project 2: Product Landing Page - Design an interactive product showcase page',
      'Project 3: Interactive Dashboard - Build a data visualization dashboard with API integration'
    ],
    'sql-database': [
      'Project 1: E-commerce Database - Design and implement a database for an online store',
      'Project 2: Reporting System - Create complex queries for business intelligence reporting',
      'Project 3: Data Migration Tool - Develop a strategy for safely migrating between database systems'
    ],
    'prompt-engineering': [
      'Project 1: AI Assistant Design - Create a functioning AI assistant with effective prompts',
      'Project 2: Creative Writing Partner - Design prompts for generating quality creative content',
      'Project 3: Technical Documentation Generator - Build a system for producing technical documentation'
    ],
    'general': [
      'Project 1: Fundamentals Application - Apply basic concepts to solve a real-world problem',
      'Project 2: Intermediate Challenge - Create a more complex solution using multiple techniques',
      'Project 3: Capstone Project - Demonstrate mastery by building a comprehensive final project'
    ]
  };

  return (projects[courseType] || projects['general']).join('\n\n');
};

// Generate exercises content
const generateExercises = (courseType: string): string => {
  const exercises: Record<string, string[]> = {
    'ms-excel': [
      'Exercise 1: Basic Formulas - Practice with SUM, AVERAGE, MAX, MIN functions',
      'Exercise 2: Data Formatting - Apply conditional formatting and custom number formats',
      'Exercise 3: Chart Creation - Create various chart types from sample data',
      'Exercise 4: PivotTable Analysis - Analyze sales data using PivotTables',
      'Exercise 5: Function Mastery - Work with VLOOKUP, INDEX/MATCH, and other advanced functions'
    ],
    'ms-word': [
      'Exercise 1: Text Formatting - Practice with fonts, styles, and paragraph formatting',
      'Exercise 2: Page Layout - Work with margins, columns, and section breaks',
      'Exercise 3: Tables and Graphics - Insert and format tables, images, and shapes',
      'Exercise 4: Mail Merge - Create personalized letters using data sources',
      'Exercise 5: Document Automation - Use fields, cross-references, and other automation features'
    ],
    'python-programming': [
      'Exercise 1: Basic Syntax - Practice with variables, operators, and control flow',
      'Exercise 2: Data Structures - Work with lists, dictionaries, and string manipulation',
      'Exercise 3: Functions - Create reusable functions with parameters and return values',
      'Exercise 4: File Operations - Read from and write to files in various formats',
      'Exercise 5: API Integration - Connect to and process data from web APIs'
    ],
    'web-development': [
      'Exercise 1: HTML Structure - Create properly structured HTML documents',
      'Exercise 2: CSS Styling - Apply various styling techniques to web pages',
      'Exercise 3: JavaScript Basics - Write scripts for DOM manipulation and events',
      'Exercise 4: Responsive Design - Make web pages adapt to different screen sizes',
      'Exercise 5: Form Validation - Implement client-side form validation'
    ],
    'sql-database': [
      'Exercise 1: Basic Queries - Write SELECT statements with various clauses',
      'Exercise 2: Data Manipulation - Practice INSERT, UPDATE, and DELETE operations',
      'Exercise 3: Join Operations - Work with different join types to combine tables',
      'Exercise 4: Aggregation - Use GROUP BY and aggregate functions for data analysis',
      'Exercise 5: Subqueries - Implement nested queries and Common Table Expressions'
    ],
    'prompt-engineering': [
      'Exercise 1: Basic Prompting - Write clear and effective simple prompts',
      'Exercise 2: Context Setting - Practice providing relevant context in prompts',
      'Exercise 3: Few-Shot Learning - Create prompts with examples for better results',
      'Exercise 4: Chain of Thought - Implement step-by-step reasoning in prompts',
      'Exercise 5: Specialized Tasks - Design prompts for specific domains like code or creative writing'
    ],
    'general': [
      'Exercise 1: Fundamentals - Practice basic concepts and techniques',
      'Exercise 2: Problem Solving - Apply knowledge to solve specific challenges',
      'Exercise 3: Critical Thinking - Analyze scenarios and develop appropriate solutions',
      'Exercise 4: Practical Application - Use tools and techniques in realistic contexts',
      'Exercise 5: Advanced Skills - Work with complex requirements and constraints'
    ]
  };

  return (exercises[courseType] || exercises['general']).join('\n');
};

// Function to download all resources for a course as a ZIP file
export const downloadAllResources = (courseId: string, courseTitle: string) => {
  if (!courseId || !courseTitle) {
    toast.error("Course information missing", {
      description: "Unable to download resources due to missing course information.",
    });
    return;
  }
  
  const courseName = courseTitle.replace(/\s+/g, '-').toLowerCase();
  
  toast.info("Preparing course resources...", {
    description: `All resources for ${courseTitle} are being prepared for download.`,
    duration: 2500,
  });
  
  // Simulate network delay
  setTimeout(() => {
    try {
      // In a real application, you would package all files into a zip here
      const dummyContent = createDummyContent(courseName, 'zip');
      
      const blob = new Blob([dummyContent], { type: 'application/zip' });
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${courseName}-complete-resources.zip`);
      
      // Append to body, click and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      window.URL.revokeObjectURL(url);
      
      toast.success("Resources downloaded!", {
        description: `All resources for ${courseTitle} have been downloaded successfully.`,
      });
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Download failed", {
        description: "There was an error downloading the resources. Please try again later.",
      });
    }
  }, 2000);
};

// Function specifically for downloading curriculum resources from the Curriculum page
export const downloadCurriculumResource = (subjectName: string) => {
  if (!subjectName) {
    toast.error("Subject information missing", {
      description: "Unable to download resources due to missing subject information.",
    });
    return;
  }
  
  const formattedName = subjectName.toLowerCase().replace(/\s+/g, '-');
  
  toast.info("Preparing curriculum resources...", {
    description: `The curriculum for ${subjectName} is being prepared for download.`,
    duration: 2000,
  });
  
  // Simulate network delay
  setTimeout(() => {
    try {
      // Create content specifically formatted for curriculum overviews
      const dummyContent = createDummyContent(`${formattedName}-curriculum`, 'pdf');
      
      const blob = new Blob([dummyContent], { type: 'application/pdf' });
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${formattedName}-curriculum-overview.pdf`);
      
      // Append to body, click and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      window.URL.revokeObjectURL(url);
      
      toast.success("Curriculum downloaded!", {
        description: `${subjectName} curriculum overview has been downloaded successfully.`,
      });
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Download failed", {
        description: "There was an error downloading the curriculum. Please try again later.",
      });
    }
  }, 1500);
};


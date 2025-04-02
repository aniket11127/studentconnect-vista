
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
      const blob = new Blob([dummyContent], { type: `text/plain` }); // Using text/plain ensures it can be opened
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Course_Overview_${fileName}.${fileType}`);
      
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

COURSE DESCRIPTION:
${generateCourseDescription(courseName)}

==================================
TOPICS & SUBTOPICS:
==================================
${generateDetailedTopics(courseName)}

==================================
LEARNING OBJECTIVES:
==================================
${generateLearningObjectives(courseName)}

==================================
MODULES & CURRICULUM:
==================================
${generateModules(courseName)}

==================================
PROJECTS & ASSIGNMENTS:
==================================
${generateProjects(courseName)}

==================================
PRACTICAL EXERCISES:
==================================
${generateExercises(courseName)}

==================================
ESTIMATED DURATION:
==================================
${generateCourseDuration(courseName)}

==================================
RESOURCES:
==================================
- Comprehensive course slides
- Hands-on practice exercises
- Real-world project templates
- Reference materials and cheat sheets
- Video tutorials for key concepts
- Community forum for discussion
- Expert instructor support
- Downloadable code samples

==================================
Course_Overview_${fileName}.pdf
Copyright © ${new Date().getFullYear()} Learning Platform
This is a simulated text file for learning purposes.
In a real application, this would be a properly formatted PDF file.
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
- ${fileName}_code_samples.zip
- ${fileName}_presentation_slides.pptx

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

// Generate course description based on course type
const generateCourseDescription = (courseType: string): string => {
  const descriptions: Record<string, string> = {
    'ms-excel': 
      'This comprehensive Microsoft Excel course takes you from beginner to advanced user. You\'ll learn essential spreadsheet skills, powerful formulas and functions, data visualization techniques, and automation tools that will transform your productivity and data analysis capabilities. Whether you\'re looking to enhance your career prospects or improve your efficiency at work, this course provides practical skills that you can apply immediately.',
    'ms-word': 
      'Master Microsoft Word with this in-depth course designed for all skill levels. Learn to create professional documents, automate repetitive tasks, and leverage Word\'s powerful formatting and collaboration features. From basic document creation to advanced templates and automation, this course covers everything you need to become proficient in Microsoft\'s industry-standard word processing software.',
    'python-programming': 
      'This Python programming course offers a comprehensive journey from programming fundamentals to advanced Python concepts. You\'ll develop strong coding skills through hands-on projects and exercises, learning data manipulation, algorithmic thinking, and software design principles. By the end of the course, you\'ll be able to build functional applications and have the foundation needed for specialized paths like data science, web development, or automation.',
    'web-development': 
      'Dive into modern web development with this comprehensive course covering frontend and backend technologies. Learn to build responsive, interactive websites using HTML, CSS, and JavaScript, and understand how to connect them to backend services. Through practical projects and real-world examples, you\'ll develop the skills needed to create professional web applications from scratch.',
    'sql-database': 
      'This SQL and database management course provides a thorough understanding of relational databases and the SQL language. From basic queries to advanced database design concepts, you\'ll learn how to effectively store, retrieve, and manipulate data. Practical exercises with real-world scenarios will help you master database optimization, security, and integration with applications.',
    'prompt-engineering': 
      'Explore the cutting-edge field of prompt engineering for large language models in this specialized course. Learn the principles and techniques for crafting effective prompts that yield precise and useful AI responses. Through practical examples and hands-on exercises, you\'ll develop skills to harness the power of AI language models for various applications, from content creation to specialized technical tasks.',
    'general': 
      'This comprehensive course provides a thorough introduction to key concepts and practical applications in the field. Designed for both beginners and those looking to enhance their existing skills, the curriculum covers fundamental principles, industry best practices, and advanced techniques through a combination of theoretical knowledge and hands-on exercises.'
  };

  return descriptions[courseType] || descriptions['general'];
};

// Generate detailed topics with subtopics
const generateDetailedTopics = (courseType: string): string => {
  const detailedTopics: Record<string, string> = {
    'ms-excel': 
`1. Excel Fundamentals
   - Understanding the Excel interface and ribbon
   - Cell navigation and selection techniques
   - Basic data entry and formatting
   - Workbook management and organization

2. Working with Formulas and Functions
   - Creating basic formulas with operators
   - Understanding cell references (relative, absolute, mixed)
   - Using common functions (SUM, AVERAGE, COUNT, MAX, MIN)
   - Logical functions (IF, AND, OR, NOT)
   - Lookup functions (VLOOKUP, HLOOKUP, INDEX/MATCH)
   - Text and date manipulation functions

3. Data Analysis and Visualization
   - Sorting and filtering data
   - Creating and formatting charts and graphs
   - Using conditional formatting for data visualization
   - Creating and using PivotTables and PivotCharts
   - Data validation and error checking

4. Advanced Excel Features
   - What-if analysis tools (Goal Seek, Scenario Manager)
   - Data analysis with PowerPivot
   - Creating and using macros for automation
   - Introduction to VBA
   - Excel for business intelligence`,

    'ms-word': 
`1. Word Essentials
   - Interface overview and document navigation
   - Text entry, editing, and basic formatting
   - Document views and display options
   - Saving and managing document files

2. Document Formatting and Structure
   - Paragraph and character formatting
   - Working with styles and themes
   - Page layout and section formatting
   - Headers, footers, and page numbering
   - Creating and using templates

3. Advanced Document Elements
   - Working with tables and formatting options
   - Inserting and modifying images and graphics
   - Creating and customizing charts and diagrams
   - Using SmartArt and drawing tools
   - Working with equations and symbols

4. Collaborative Features and Automation
   - Track changes and document review
   - Document protection and security
   - Mail merge for personalized documents
   - Creating and using macros
   - Integration with other Office applications`,

    'python-programming': 
`1. Python Fundamentals
   - Setting up the Python environment
   - Variables, data types, and operators
   - Control flow: conditionals and loops
   - Functions and modules
   - Error handling with try/except

2. Data Structures and Collections
   - Lists, tuples, and sets
   - Dictionaries and their applications
   - List comprehensions
   - Working with strings and string methods
   - File handling and I/O operations

3. Object-Oriented Programming
   - Classes and objects
   - Inheritance and polymorphism
   - Encapsulation and abstraction
   - Special methods and operator overloading
   - Custom data structures

4. Python Libraries and Applications
   - Working with NumPy for numerical computing
   - Data analysis using Pandas
   - Data visualization with Matplotlib and Seaborn
   - Web scraping fundamentals
   - Introduction to web applications with Flask`,

    'web-development': 
`1. HTML Fundamentals
   - Document structure and semantic markup
   - Text formatting and hyperlinking
   - Lists, tables, and forms
   - Media embedding (images, audio, video)
   - HTML5 features and APIs

2. CSS Styling and Layout
   - Selectors and the cascade
   - Box model and sizing
   - Typography and color styling
   - Flexbox and Grid layout systems
   - Responsive design and media queries
   - CSS animations and transitions

3. JavaScript Programming
   - Syntax fundamentals and data types
   - Functions, scope, and closures
   - DOM manipulation and events
   - Asynchronous JavaScript (Promises, async/await)
   - Fetch API and working with JSON
   - Modern ES6+ features

4. Frontend Frameworks and Tools
   - Introduction to React components and props
   - State management concepts
   - Build tools and module bundlers
   - Version control with Git
   - Performance optimization techniques`,

    'sql-database': 
`1. Relational Database Fundamentals
   - Database concepts and terminology
   - Entity-Relationship modeling
   - Normalization and database design
   - DBMS architecture and components
   - SQL language overview

2. Data Retrieval with SQL
   - SELECT statement syntax and clauses
   - Filtering with WHERE conditions
   - Sorting with ORDER BY
   - Aggregation with GROUP BY
   - Joining tables (INNER, LEFT, RIGHT, FULL)

3. Data Manipulation and Management
   - INSERT, UPDATE, and DELETE operations
   - Transaction management
   - Constraints and data integrity
   - Indexes and performance optimization
   - Views and stored procedures

4. Advanced SQL and Database Topics
   - Subqueries and Common Table Expressions
   - Window functions
   - Triggers and events
   - Database security principles
   - Performance tuning and query optimization`,

    'prompt-engineering': 
`1. Understanding Language Models
   - How large language models work
   - Tokenization and embeddings
   - Context windows and limitations
   - Model capabilities and constraints
   - Comparing different AI models

2. Prompt Design Fundamentals
   - Components of effective prompts
   - Clarity and specificity techniques
   - Context setting and priming
   - Output formatting control
   - Handling ambiguity and edge cases

3. Advanced Prompting Techniques
   - Few-shot learning and examples
   - Chain-of-thought reasoning
   - Self-consistency and verification
   - Retrieval-augmented generation
   - Prompt chaining and composition

4. Domain-Specific Applications
   - Prompting for code generation
   - Creative writing and content creation
   - Data analysis and extraction
   - Conversation design for AI assistants
   - Ethical considerations in prompt engineering`,

    'general': 
`1. Foundational Concepts
   - Field terminology and basic principles
   - Historical development and context
   - Core theoretical frameworks
   - Industry standards and best practices
   - Essential tools and resources

2. Intermediate Techniques
   - Problem-solving methodologies
   - Data collection and analysis
   - Project planning and management
   - Quality assurance and testing
   - Optimization strategies

3. Practical Applications
   - Real-world case studies
   - Industry-specific implementations
   - Integration with existing systems
   - Troubleshooting common issues
   - Customization and adaptation

4. Advanced Topics
   - Emerging trends and technologies
   - Research and development approaches
   - Specialized techniques for complex scenarios
   - Performance enhancement methods
   - Future directions and innovations`
  };

  return detailedTopics[courseType] || detailedTopics['general'];
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
      'Navigate Word\'s interface efficiently',
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

// Generate course duration information
const generateCourseDuration = (courseType: string): string => {
  const durations: Record<string, string> = {
    'ms-excel': 
      'Total Duration: 30 hours\n\n' +
      '- Core Modules: 20 hours of video content\n' +
      '- Practical Exercises: 8 hours\n' +
      '- Projects: 10-15 hours depending on complexity\n' +
      '- Suggested Pace: 4-6 weeks (5-7 hours per week)',
    'ms-word': 
      'Total Duration: 25 hours\n\n' +
      '- Core Modules: 16 hours of video content\n' +
      '- Practical Exercises: 6 hours\n' +
      '- Projects: 8-12 hours depending on complexity\n' +
      '- Suggested Pace: 3-5 weeks (5-7 hours per week)',
    'python-programming': 
      'Total Duration: 45 hours\n\n' +
      '- Core Modules: 28 hours of video content\n' +
      '- Coding Exercises: 12 hours\n' +
      '- Projects: 15-20 hours depending on complexity\n' +
      '- Suggested Pace: 6-8 weeks (6-8 hours per week)',
    'web-development': 
      'Total Duration: 50 hours\n\n' +
      '- Core Modules: 30 hours of video content\n' +
      '- Coding Exercises: 15 hours\n' +
      '- Projects: 15-25 hours depending on complexity\n' +
      '- Suggested Pace: 8-10 weeks (5-7 hours per week)',
    'sql-database': 
      'Total Duration: 28 hours\n\n' +
      '- Core Modules: 18 hours of video content\n' +
      '- Practice Queries: 7 hours\n' +
      '- Database Projects: 10-15 hours depending on complexity\n' +
      '- Suggested Pace: 4-6 weeks (5-6 hours per week)',
    'prompt-engineering': 
      'Total Duration: 20 hours\n\n' +
      '- Core Modules: 12 hours of video content\n' +
      '- Practical Exercises: 5 hours\n' +
      '- Applied Projects: 8-10 hours depending on complexity\n' +
      '- Suggested Pace: 3-4 weeks (5-6 hours per week)',
    'general': 
      'Total Duration: 35 hours\n\n' +
      '- Core Modules: 20 hours of video content\n' +
      '- Practical Exercises: 10 hours\n' +
      '- Applied Projects: 10-15 hours depending on complexity\n' +
      '- Suggested Pace: 5-7 weeks (5-7 hours per week)'
  };

  return durations[courseType] || durations['general'];
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
      
      const blob = new Blob([dummyContent], { type: 'text/plain' });
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Course_Overview_${courseName}-complete-resources.zip`);
      
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
      const dummyContent = createDummyContent(`${formattedName}`, 'pdf');
      
      const blob = new Blob([dummyContent], { type: 'text/plain' });
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Course_Overview_${formattedName}.pdf`);
      
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

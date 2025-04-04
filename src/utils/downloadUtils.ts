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
      // For simulation purposes, we'll create a dummy content
      const dummyContent = createDummyContent(fileName, fileType);
      
      // Create a blob with the correct MIME type
      let mimeType;
      let extension;
      
      switch(fileType.toLowerCase()) {
        case 'pdf':
          // Use text/html to ensure browser can open it properly
          mimeType = 'text/html';
          extension = 'html';
          break;
        case 'docx':
          mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          extension = 'docx';
          break;
        case 'zip':
          mimeType = 'application/zip';
          extension = 'zip';
          break;
        default:
          mimeType = 'text/plain';
          extension = 'txt';
      }
      
      // Create HTML content for better browser compatibility
      const htmlContent = createHtmlDocument(fileName, dummyContent, fileType);
      
      const blob = new Blob([htmlContent], { type: mimeType });
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Use the correct extension but keep the PDF in the filename for user experience
      if (fileType.toLowerCase() === 'pdf') {
        link.setAttribute('download', `${formatTitle(fileName)}_Course_Material.html`);
      } else {
        link.setAttribute('download', `${formatTitle(fileName)}.${extension}`);
      }
      
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

// Create an HTML document with professional styling
const createHtmlDocument = (fileName: string, content: string, fileType: string) => {
  // For PDF-type content, use a nicely formatted HTML document
  if (fileType.toLowerCase() === 'pdf') {
    return `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Course Overview: ${formatTitle(fileName)}</title>
      <style>
        body { 
          font-family: Arial, Helvetica, sans-serif;
          line-height: 1.6;
          max-width: 800px;
          margin: 20px auto;
          padding: 20px;
          background: #f9f9f9;
          color: #333;
        }
        h1 { 
          font-size: 28px;
          color: #1a365d;
          text-align: center;
          border-bottom: 2px solid #3182ce;
          padding-bottom: 10px;
          margin-bottom: 25px;
        }
        h2 {
          font-size: 22px;
          color: #2c5282;
          margin-top: 25px;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 5px;
        }
        h3 {
          font-size: 18px;
          color: #2c5282;
          margin-top: 20px;
        }
        .section {
          margin-bottom: 25px;
          background: #fff;
          border-radius: 5px;
          padding: 15px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        ul { padding-left: 25px; }
        li { margin-bottom: 5px; }
        p { margin-bottom: 10px; }
        .footer {
          margin-top: 50px;
          text-align: center;
          font-size: 0.9em;
          color: #718096;
          border-top: 1px solid #e2e8f0;
          padding-top: 20px;
        }
        .highlight {
          background-color: #ebf8ff;
          padding: 2px 4px;
          border-radius: 3px;
        }
        .page-break {
          page-break-after: always;
        }
        .module-list {
          list-style-type: none;
          padding: 0;
        }
        .module-list li {
          background: #edf2f7;
          margin-bottom: 10px;
          padding: 10px;
          border-radius: 4px;
          border-left: 4px solid #3182ce;
        }
        .project-box {
          background: #e6fffa;
          border-left: 4px solid #38b2ac;
          padding: 10px;
          margin-bottom: 15px;
          border-radius: 4px;
        }
      </style>
    </head>
    <body>
      ${content}
      <div class="footer">
        <p>Course Overview: ${formatTitle(fileName)}</p>
        <p>Copyright © ${new Date().getFullYear()} Learning Platform</p>
      </div>
    </body>
    </html>`;
  } 
  
  // For other file types, just return the content
  return content;
};

// Helper function to format title nicely
const formatTitle = (fileName: string): string => {
  return fileName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Create course-specific content for different subjects
const createDummyContent = (fileName: string, fileType: string) => {
  // Determine the course type based on the filename
  let courseType = 'general';
  
  if (fileName.includes('excel')) courseType = 'ms-excel';
  else if (fileName.includes('word')) courseType = 'ms-word';
  else if (fileName.includes('python')) courseType = 'python-programming';
  else if (fileName.includes('web')) courseType = 'web-development';
  else if (fileName.includes('sql')) courseType = 'sql-database';
  else if (fileName.includes('prompt')) courseType = 'prompt-engineering';
  else if (fileName.includes('ai')) courseType = 'prompt-engineering';
  
  // Enhanced PDF content with better structure and details
  if (fileType === 'pdf') {
    // Generate a more structured HTML content that looks like a PDF
    return `
    <h1>${formatTitle(fileName)} - COURSE OVERVIEW</h1>
    
    <div class="section">
      <h2>COURSE DESCRIPTION</h2>
      <p>${generateCourseDescription(courseType)}</p>
    </div>
    
    <div class="section">
      <h2>TOPICS & SUBTOPICS</h2>
      <ul>
        ${generateTopicsList(courseType)}
      </ul>
    </div>
    
    <div class="section">
      <h2>LEARNING OBJECTIVES</h2>
      <ul>
        ${generateLearningObjectives(courseType)}
      </ul>
    </div>
    
    <div class="section">
      <h2>MODULES & CURRICULUM</h2>
      <ul class="module-list">
        ${generateModules(courseType)}
      </ul>
    </div>
    
    <div class="section">
      <h2>PROJECTS & ASSIGNMENTS</h2>
      ${generateProjects(courseType)}
    </div>
    
    <div class="section">
      <h2>PRACTICAL EXERCISES</h2>
      <ul>
        ${generateExercises(courseType)}
      </ul>
    </div>
    
    <div class="section">
      <h2>ESTIMATED DURATION</h2>
      <p>${generateCourseDuration(courseType)}</p>
    </div>
    
    <div class="section">
      <h2>RESOURCES</h2>
      <ul>
        <li>Comprehensive course slides</li>
        <li>Hands-on practice exercises</li>
        <li>Real-world project templates</li>
        <li>Reference materials and cheat sheets</li>
        <li>Video tutorials for key concepts</li>
        <li>Community forum for discussion</li>
        <li>Expert instructor support</li>
        <li>Downloadable code samples</li>
      </ul>
    </div>`;
  } else if (fileType === 'zip') {
    return `[SIMULATED ZIP ARCHIVE]
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
In a real application, this would contain actual course materials.`;
  } else {
    return `This is a simulated ${fileType.toUpperCase()} file for ${formatTitle(fileName)}.\n\n` +
      `This would be the actual course content in a real application.`;
  }
};

// Generate course description based on course type
const generateCourseDescription = (courseType: string): string => {
  const descriptions = {
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

// Generate topics list based on course type
const generateTopicsList = (courseType: string): string => {
  const topicsByType = {
    'ms-excel': [
      'Excel Interface and Navigation',
      'Cell Formatting and Styles',
      'Formulas and Functions',
      'Data Analysis with PivotTables',
      'Charts and Data Visualization',
      'Data Validation and Protection',
      'Macros and VBA Basics'
    ],
    'ms-word': [
      'Word Interface and Navigation',
      'Document Formatting and Styles',
      'Tables, Graphics and Multimedia',
      'Mail Merge and Document Automation',
      'Templates and Form Creation',
      'Review and Collaboration Tools',
      'Document Security and Protection'
    ],
    'python-programming': [
      'Python Syntax and Data Types',
      'Control Flow (Conditionals and Loops)',
      'Functions and Modules',
      'Data Structures and Collections',
      'File I/O and Exception Handling',
      'Object-Oriented Programming',
      'Libraries and Web APIs'
    ],
    'web-development': [
      'HTML Structure and Semantics',
      'CSS Styling and Layouts',
      'JavaScript Fundamentals',
      'Responsive Design Principles',
      'Frontend Frameworks Introduction',
      'Web API Integration',
      'Performance Optimization'
    ],
    'sql-database': [
      'Database Design Principles',
      'SQL Query Fundamentals',
      'Data Retrieval and Filtering',
      'Data Manipulation (INSERT/UPDATE/DELETE)',
      'Joins and Relationships',
      'Indexes and Performance',
      'Database Security'
    ],
    'prompt-engineering': [
      'AI Model Capabilities and Limitations',
      'Prompt Structure and Components',
      'Context Setting and Priming',
      'Chain-of-Thought Prompting',
      'Few-Shot Learning Examples',
      'Output Format Control',
      'Domain-Specific Prompting'
    ],
    'general': [
      'Fundamentals and Core Concepts',
      'Key Terminology and Principles',
      'Industry Best Practices',
      'Practical Application Methods',
      'Problem-Solving Techniques',
      'Advanced Strategies',
      'Future Trends and Developments'
    ]
  };
  
  const topics = topicsByType[courseType] || topicsByType['general'];
  return topics.map(topic => `<li>${topic}</li>`).join('');
};

// Generate learning objectives based on course type
const generateLearningObjectives = (courseType: string): string => {
  const objectives = {
    'ms-excel': [
      'Navigate the Excel interface efficiently and understand its components',
      'Create and manipulate formulas and functions for data analysis',
      'Design professional spreadsheets with proper formatting and data validation',
      'Build dynamic charts and dashboards to visualize data effectively',
      'Implement PivotTables and PivotCharts for complex data analysis',
      'Automate repetitive tasks using basic macros and VBA concepts'
    ],
    'ms-word': [
      'Master the Word interface and document navigation techniques',
      'Apply professional formatting using styles, themes, and templates',
      'Create and format complex document elements including tables and graphics',
      'Implement document automation using mail merge and fields',
      'Use collaboration tools for team document editing and review',
      'Secure documents with appropriate protection methods'
    ],
    'python-programming': [
      'Write clean, efficient Python code using proper syntax and conventions',
      'Implement control structures and functions to solve programming problems',
      'Create and manipulate data structures for effective data management',
      'Apply object-oriented programming principles to build maintainable code',
      'Develop practical applications using Python libraries and frameworks',
      'Debug and optimize Python programs for better performance'
    ],
    'web-development': [
      'Create well-structured web pages using semantic HTML elements',
      'Style web content using CSS for attractive, responsive layouts',
      'Implement interactive features using JavaScript and DOM manipulation',
      'Build responsive designs that work across various device sizes',
      'Integrate data from APIs into web applications',
      'Optimize web pages for performance and accessibility'
    ],
    'sql-database': [
      'Design efficient database schemas using normalization principles',
      'Write complex SQL queries to retrieve and manipulate data',
      'Implement proper relationships between tables for data integrity',
      'Optimize query performance using indexes and execution plans',
      'Apply database security best practices to protect data',
      'Create views and stored procedures for data access abstraction'
    ],
    'prompt-engineering': [
      'Understand how large language models interpret and respond to prompts',
      'Create well-structured prompts that generate targeted, useful responses',
      'Apply advanced techniques like chain-of-thought and few-shot learning',
      'Troubleshoot and refine prompts to overcome model limitations',
      'Design specialized prompts for different domains and applications',
      'Implement systematic prompt testing and improvement methods'
    ],
    'general': [
      'Understand foundational concepts and principles of the subject area',
      'Apply theoretical knowledge to practical, real-world scenarios',
      'Analyze problems and develop effective solutions using learned techniques',
      'Create professional-quality projects demonstrating mastery of key skills',
      'Evaluate and improve implementations using best practices',
      'Develop a framework for continued learning and skill advancement'
    ]
  };

  return (objectives[courseType] || objectives['general']).map(obj => `<li>${obj}</li>`).join('');
};

// Generate modules content
const generateModules = (courseType: string): string => {
  const modules = {
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

  return (modules[courseType] || modules['general']).map(module => `<li>${module}</li>`).join('');
};

// Generate projects content
const generateProjects = (courseType: string): string => {
  const projects = {
    'ms-excel': [
      '<div class="project-box"><strong>Project 1: Personal Budget Tracker</strong><p>Create a comprehensive budget spreadsheet with formulas, conditional formatting and charts to track personal finances.</p></div>',
      '<div class="project-box"><strong>Project 2: Business Dashboard</strong><p>Design an interactive sales dashboard with PivotTables, slicers, and dynamic charts for business analytics.</p></div>',
      '<div class="project-box"><strong>Project 3: Automated Inventory System</strong><p>Build an inventory management tool with data validation, lookup functions, and basic macros for automation.</p></div>'
    ],
    'ms-word': [
      '<div class="project-box"><strong>Project 1: Professional Resume</strong><p>Create a professionally formatted resume with advanced layout features, styles, and graphics.</p></div>',
      '<div class="project-box"><strong>Project 2: Company Newsletter</strong><p>Design a multi-page newsletter with various content elements, styles, and automated table of contents.</p></div>',
      '<div class="project-box"><strong>Project 3: Automated Report Template</strong><p>Build a report template with fields, automated elements, and protection features.</p></div>'
    ],
    'python-programming': [
      '<div class="project-box"><strong>Project 1: Data Analysis Tool</strong><p>Create a program to analyze and visualize datasets using Python libraries like Pandas and Matplotlib.</p></div>',
      '<div class="project-box"><strong>Project 2: Task Management System</strong><p>Build a command-line application for managing tasks with file storage and user interaction.</p></div>',
      '<div class="project-box"><strong>Project 3: Web Scraper</strong><p>Develop a tool to extract and process information from websites using libraries like Beautiful Soup.</p></div>'
    ],
    'web-development': [
      '<div class="project-box"><strong>Project 1: Personal Portfolio</strong><p>Create a responsive personal portfolio website showcasing your skills and projects.</p></div>',
      '<div class="project-box"><strong>Project 2: Product Landing Page</strong><p>Design an interactive product showcase page with features like image galleries and contact forms.</p></div>',
      '<div class="project-box"><strong>Project 3: Interactive Dashboard</strong><p>Build a data visualization dashboard with API integration and interactive elements.</p></div>'
    ],
    'sql-database': [
      '<div class="project-box"><strong>Project 1: E-commerce Database</strong><p>Design and implement a normalized database for an online store with products, customers, and orders.</p></div>',
      '<div class="project-box"><strong>Project 2: Reporting System</strong><p>Create complex queries for business intelligence reporting using joins, subqueries, and aggregations.</p></div>',
      '<div class="project-box"><strong>Project 3: Data Migration Tool</strong><p>Develop a strategy for safely migrating between database systems while maintaining data integrity.</p></div>'
    ],
    'prompt-engineering': [
      '<div class="project-box"><strong>Project 1: AI Assistant Design</strong><p>Create a functioning AI assistant with effective prompts for specific tasks and domains.</p></div>',
      '<div class="project-box"><strong>Project 2: Creative Writing Partner</strong><p>Design prompts for generating quality creative content like stories, articles, or marketing copy.</p></div>',
      '<div class="project-box"><strong>Project 3: Technical Documentation Generator</strong><p>Build a system for producing technical documentation from specifications using AI prompts.</p></div>'
    ],
    'general': [
      '<div class="project-box"><strong>Project 1: Fundamentals Application</strong><p>Apply basic concepts to solve a real-world problem in the subject domain.</p></div>',
      '<div class="project-box"><strong>Project 2: Intermediate Challenge</strong><p>Create a more complex solution using multiple techniques learned throughout the course.</p></div>',
      '<div class="project-box"><strong>Project 3: Capstone Project</strong><p>Demonstrate mastery by building a comprehensive final project that integrates all major concepts.</p></div>'
    ]
  };

  return (projects[courseType] || projects['general']).join('');
};

// Generate exercises content
const generateExercises = (courseType: string): string => {
  const exercises = {
    'ms-excel': [
      '<li><strong>Exercise 1: Basic Formulas</strong> - Practice with SUM, AVERAGE, MAX, MIN functions</li>',
      '<li><strong>Exercise 2: Data Formatting</strong> - Apply conditional formatting and custom number formats</li>',
      '<li><strong>Exercise 3: Chart Creation</strong> - Create various chart types from sample data</li>',
      '<li><strong>Exercise 4: PivotTable Analysis</strong> - Analyze sales data using PivotTables</li>',
      '<li><strong>Exercise 5: Function Mastery</strong> - Work with VLOOKUP, INDEX/MATCH, and other advanced functions</li>'
    ],
    'ms-word': [
      '<li><strong>Exercise 1: Text Formatting</strong> - Practice with fonts, styles, and paragraph formatting</li>',
      '<li><strong>Exercise 2: Page Layout</strong> - Work with margins, columns, and section breaks</li>',
      '<li><strong>Exercise 3: Tables and Graphics</strong> - Insert and format tables, images, and shapes</li>',
      '<li><strong>Exercise 4: Mail Merge</strong> - Create personalized letters using data sources</li>',
      '<li><strong>Exercise 5: Document Automation</strong> - Use fields, cross-references, and other automation features</li>'
    ],
    'python-programming': [
      '<li><strong>Exercise 1: Basic Syntax</strong> - Practice with variables, operators, and control flow</li>',
      '<li><strong>Exercise 2: Data Structures</strong> - Work with lists, dictionaries, and string manipulation</li>',
      '<li><strong>Exercise 3: Functions</strong> - Create reusable functions with parameters and return values</li>',
      '<li><strong>Exercise 4: File Operations</strong> - Read from and write to files in various formats</li>',
      '<li><strong>Exercise 5: API Integration</strong> - Connect to and process data from web APIs</li>'
    ],
    'web-development': [
      '<li><strong>Exercise 1: HTML Structure</strong> - Create properly structured HTML documents</li>',
      '<li><strong>Exercise 2: CSS Styling</strong> - Apply various styling techniques to web pages</li>',
      '<li><strong>Exercise 3: JavaScript Basics</strong> - Write scripts for DOM manipulation and events</li>',
      '<li><strong>Exercise 4: Responsive Design</strong> - Make web pages adapt to different screen sizes</li>',
      '<li><strong>Exercise 5: Form Validation</strong> - Implement client-side form validation</li>'
    ],
    'sql-database': [
      '<li><strong>Exercise 1: Basic Queries</strong> - Write SELECT statements with various clauses</li>',
      '<li><strong>Exercise 2: Data Manipulation</strong> - Practice INSERT, UPDATE, and DELETE operations</li>',
      '<li><strong>Exercise 3: Join Operations</strong> - Work with different join types to combine tables</li>',
      '<li><strong>Exercise 4: Aggregation</strong> - Use GROUP BY and aggregate functions for data analysis</li>',
      '<li><strong>Exercise 5: Subqueries</strong> - Implement nested queries and Common Table Expressions</li>'
    ],
    'prompt-engineering': [
      '<li><strong>Exercise 1: Basic Prompting</strong> - Write clear and effective simple prompts</li>',
      '<li><strong>Exercise 2: Context Setting</strong> - Practice providing relevant context in prompts</li>',
      '<li><strong>Exercise 3: Few-Shot Learning</strong> - Create prompts with examples for better results</li>',
      '<li><strong>Exercise 4: Chain of Thought</strong> - Implement step-by-step reasoning in prompts</li>',
      '<li><strong>Exercise 5: Specialized Tasks</strong> - Design prompts for specific domains like code or creative writing</li>'
    ],
    'general': [
      '<li><strong>Exercise 1: Fundamentals</strong> - Practice basic concepts and techniques</li>',
      '<li><strong>Exercise 2: Problem Solving</strong> - Apply knowledge to solve specific challenges</li>',
      '<li><strong>Exercise 3: Critical Thinking</strong> - Analyze scenarios and develop appropriate solutions</li>',
      '<li><strong>Exercise 4: Practical Application</strong> - Use tools and techniques in realistic contexts</li>',
      '<li><strong>Exercise 5: Advanced Skills</strong> - Work with complex requirements and constraints</li>'
    ]
  };

  return (exercises[courseType] || exercises['general']).join('');
};

// Generate course duration information
const generateCourseDuration = (courseType: string): string => {
  const durations = {
    'ms-excel': 
      'Total Duration: 30 hours<br><br>' +
      '• Core Modules: 20 hours of video content<br>' +
      '• Practical Exercises: 8 hours<br>' +
      '• Projects: 10-15 hours depending on complexity<br>' +
      '• Suggested Pace: 4-6 weeks (5-7 hours per week)',
    'ms-word': 
      'Total Duration: 25 hours<br><br>' +
      '• Core Modules: 16 hours of video content<br>' +
      '• Practical Exercises: 6 hours<br>' +
      '• Projects: 8-12 hours depending on complexity<br>' +
      '• Suggested Pace: 3-5 weeks (5-7 hours per week)',
    'python-programming': 
      'Total Duration: 45 hours<br><br>' +
      '• Core Modules: 28 hours of video content<br>' +
      '• Coding Exercises: 12 hours<br>' +
      '• Projects: 15-20 hours depending on complexity<br>' +
      '• Suggested Pace: 6-8 weeks (6-8 hours per week)',
    'web-development': 
      'Total Duration: 50 hours<br><br>' +
      '• Core Modules: 30 hours of video content<br>' +
      '• Coding Exercises: 15 hours<br>' +
      '• Projects: 15-25 hours depending on complexity<br>' +
      '• Suggested Pace: 8-10 weeks (5-7 hours per week)',
    'sql-database': 
      'Total Duration: 28 hours<br><br>' +
      '• Core Modules: 18 hours of video content<br>' +
      '• Practice Queries: 7 hours<br>' +
      '• Database Projects: 10-15 hours depending on complexity<br>' +
      '• Suggested Pace: 4-6 weeks (5-6 hours per week)',
    'prompt-engineering': 
      'Total Duration: 20 hours<br><br>' +
      '• Core Modules: 12 hours of video content<br>' +
      '• Practical Exercises: 5 hours<br>' +
      '• Applied Projects: 8-10 hours depending on complexity<br>' +
      '• Suggested Pace: 3-4 weeks (5-6 hours per week)',
    'general': 
      'Total Duration: 35 hours<br><br>' +
      '• Core Modules: 20 hours of video content<br>' +
      '• Practical Exercises: 10 hours<br>' +
      '• Applied Projects: 10-15 hours depending on complexity<br>' +
      '• Suggested Pace: 5-7 weeks (5-7 hours per week)'
  };

  return durations[courseType] || durations['general'];
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
      const dummyContent = createDummyContent(formattedName, 'pdf');
      
      // Create HTML document with the content
      const htmlContent = createHtmlDocument(subjectName, dummyContent, 'pdf');
      
      // Use text/html MIME type for better browser compatibility
      const blob = new Blob([htmlContent], { type: 'text/html' });
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${subjectName}_Curriculum_Overview.html`);
      
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

// For backward compatibility - redirect to the new function
export const downloadAllResources = (courseId: string, courseTitle: string) => {
  downloadCurriculumResource(courseTitle);
};

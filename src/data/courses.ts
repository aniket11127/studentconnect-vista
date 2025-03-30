// Course type definitions
export type Exercise = {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'task' | 'coding';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  skills: string[];
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
};

export type Course = {
  id: string;
  title: string;
  description: string;
  introduction?: string;
  learningObjectives?: string[];
  image: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  students: number;
  lessons: number;
  featured?: boolean;
  price?: string;
  modules?: {
    title: string;
    duration: string;
    lessons: { title: string; duration: string; id: string }[];
    exercises?: Exercise[];
  }[];
  projects?: Project[];
  outcomes?: string[];
};

// Export all courses
export const allCourses: Course[] = [
  {
    id: '1',
    title: 'Complete MS Office Suite Mastery',
    description: 'Learn Word, Excel, PowerPoint, and Access with practical exercises designed for school assignments and projects.',
    introduction: 'This comprehensive course will take you from beginner to proficient in Microsoft Office applications. You\'ll learn how to create professional documents, analyze data efficiently, design engaging presentations, and manage databases effectively. Perfect for students and professionals looking to enhance their productivity and technical skills.',
    learningObjectives: [
      'Create professional documents with advanced formatting in Word',
      'Analyze and visualize data using Excel formulas and charts',
      'Design compelling presentations with PowerPoint',
      'Understand the basics of database management with Access'
    ],
    image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    category: 'Office Skills',
    level: 'Beginner',
    duration: '48 hours',
    students: 3240,
    lessons: 56,
    featured: true,
    price: '₹499',
    modules: [
      {
        title: 'Introduction to MS Word',
        duration: '4 hours',
        lessons: [
          { title: 'Creating Your First Document', duration: '30 mins', id: 'word-1' },
          { title: 'Formatting Text and Paragraphs', duration: '45 mins', id: 'word-2' },
          { title: 'Working with Styles', duration: '30 mins', id: 'word-3' },
          { title: 'Inserting Images and Tables', duration: '45 mins', id: 'word-4' },
        ],
        exercises: [
          {
            id: 'ex-word-1',
            title: 'Create a Professional Resume',
            description: 'Build a well-formatted resume using the techniques learned in this module.',
            type: 'task',
            difficulty: 'easy',
            estimatedTime: '45 mins',
          },
          {
            id: 'ex-word-2',
            title: 'Format a Research Paper',
            description: 'Apply various formatting styles to create a properly structured research paper with citations.',
            type: 'task',
            difficulty: 'medium',
            estimatedTime: '60 mins',
          }
        ]
      },
      {
        title: 'Excel Fundamentals',
        duration: '6 hours',
        lessons: [
          { title: 'Understanding the Excel Interface', duration: '30 mins', id: 'excel-1' },
          { title: 'Entering and Formatting Data', duration: '45 mins', id: 'excel-2' },
          { title: 'Basic Formulas and Functions', duration: '45 mins', id: 'excel-3' },
          { title: 'Creating Charts and Graphs', duration: '60 mins', id: 'excel-4' },
        ],
        exercises: [
          {
            id: 'ex-excel-1',
            title: 'Budget Calculator',
            description: 'Create a monthly budget calculator using formulas and basic functions.',
            type: 'task',
            difficulty: 'easy',
            estimatedTime: '45 mins',
          },
          {
            id: 'ex-excel-2',
            title: 'Data Analysis Quiz',
            description: 'Test your knowledge of Excel formulas and functions with this interactive quiz.',
            type: 'quiz',
            difficulty: 'medium',
            estimatedTime: '30 mins',
          }
        ]
      },
      {
        title: 'PowerPoint Presentations',
        duration: '5 hours',
        lessons: [
          { title: 'Creating a New Presentation', duration: '30 mins', id: 'ppt-1' },
          { title: 'Adding and Formatting Slides', duration: '45 mins', id: 'ppt-2' },
          { title: 'Working with Themes and Templates', duration: '30 mins', id: 'ppt-3' },
          { title: 'Adding Animations and Transitions', duration: '60 mins', id: 'ppt-4' },
        ],
        exercises: [
          {
            id: 'ex-ppt-1',
            title: 'Create an Engaging Presentation',
            description: 'Design a 5-slide presentation on a topic of your choice using themes and animations.',
            type: 'task',
            difficulty: 'easy',
            estimatedTime: '60 mins',
          }
        ]
      },
    ],
    projects: [
      {
        id: 'proj-office-1',
        title: 'School Event Planning Suite',
        description: 'Create a complete event planning package including a budget spreadsheet, promotional flyer, and presentation for a school event.',
        skills: ['Word', 'Excel', 'PowerPoint'],
        estimatedTime: '3 hours',
        difficulty: 'beginner',
      },
      {
        id: 'proj-office-2',
        title: 'Business Proposal Package',
        description: 'Develop a comprehensive business proposal with a formal document, financial projections, and a pitch presentation.',
        skills: ['Word', 'Excel', 'PowerPoint'],
        estimatedTime: '4 hours',
        difficulty: 'intermediate',
      }
    ],
    outcomes: [
      'Master the core features of MS Word, Excel, and PowerPoint',
      'Create professional-looking documents, spreadsheets, and presentations',
      'Automate tasks and analyze data efficiently with Excel formulas',
      'Design engaging and effective PowerPoint presentations',
    ],
  },
  {
    id: '2',
    title: 'Introduction to Python Programming',
    description: 'Start your programming journey with Python fundamentals, data structures, and basic algorithms.',
    introduction: 'Python is one of the most versatile and beginner-friendly programming languages. This course provides a solid foundation in Python programming, covering everything from basic syntax to working with data structures and implementing simple algorithms. You\'ll learn through hands-on coding exercises and practical examples that reinforce core programming concepts.',
    learningObjectives: [
      'Understand fundamental programming concepts using Python',
      'Work with variables, data types, and control structures',
      'Create and use functions to organize and reuse code',
      'Implement and manipulate common data structures',
      'Apply object-oriented programming principles'
    ],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    category: 'Programming',
    level: 'Beginner',
    duration: '36 hours',
    students: 2850,
    lessons: 42,
    featured: true,
    price: '₹799',
    modules: [
      {
        title: 'Python Basics',
        duration: '8 hours',
        lessons: [
          { title: 'Setting up the Development Environment', duration: '45 mins', id: 'py-1' },
          { title: 'Variables, Data Types, and Operators', duration: '60 mins', id: 'py-2' },
          { title: 'Control Flow Statements', duration: '90 mins', id: 'py-3' },
          { title: 'Functions and Modules', duration: '60 mins', id: 'py-4' },
        ],
        exercises: [
          {
            id: 'ex-py-1',
            title: 'Temperature Converter',
            description: 'Create a simple program that converts temperatures between Celsius and Fahrenheit.',
            type: 'coding',
            difficulty: 'easy',
            estimatedTime: '30 mins',
          },
          {
            id: 'ex-py-2',
            title: 'Number Guessing Game',
            description: 'Build a game where the computer generates a random number and the user has to guess it.',
            type: 'coding',
            difficulty: 'easy',
            estimatedTime: '45 mins',
          }
        ]
      },
      {
        title: 'Data Structures',
        duration: '10 hours',
        lessons: [
          { title: 'Lists and Tuples', duration: '60 mins', id: 'py-5' },
          { title: 'Dictionaries and Sets', duration: '90 mins', id: 'py-6' },
          { title: 'List Comprehensions', duration: '45 mins', id: 'py-7' },
          { title: 'Working with Strings', duration: '60 mins', id: 'py-8' },
        ],
        exercises: [
          {
            id: 'ex-py-3',
            title: 'Contact Book Application',
            description: 'Create a simple contact book that allows adding, viewing, and deleting contacts using dictionaries.',
            type: 'coding',
            difficulty: 'medium',
            estimatedTime: '60 mins',
          },
          {
            id: 'ex-py-4',
            title: 'Text Analyzer',
            description: 'Build a program that analyzes text to count words, characters, and find the most common words.',
            type: 'coding',
            difficulty: 'medium',
            estimatedTime: '60 mins',
          }
        ]
      },
      {
        title: 'Object-Oriented Programming',
        duration: '12 hours',
        lessons: [
          { title: 'Classes and Objects', duration: '90 mins', id: 'py-9' },
          { title: 'Inheritance and Polymorphism', duration: '120 mins', id: 'py-10' },
          { title: 'Encapsulation and Abstraction', duration: '90 mins', id: 'py-11' },
          { title: 'Working with Modules and Packages', duration: '60 mins', id: 'py-12' },
        ],
        exercises: [
          {
            id: 'ex-py-5',
            title: 'Banking System',
            description: 'Design a simple banking system with classes for accounts, transactions, and customers.',
            type: 'coding',
            difficulty: 'hard',
            estimatedTime: '90 mins',
          }
        ]
      },
    ],
    projects: [
      {
        id: 'proj-py-1',
        title: 'Personal Task Manager',
        description: 'Create a command-line task manager application that allows users to add, view, update, and delete tasks.',
        skills: ['Python Basics', 'Data Structures', 'File Handling'],
        estimatedTime: '4 hours',
        difficulty: 'beginner',
      },
      {
        id: 'proj-py-2',
        title: 'Simple Quiz Application',
        description: 'Build an interactive quiz application that loads questions from a file, presents them to users, and tracks scores.',
        skills: ['Python Basics', 'OOP', 'File Handling'],
        estimatedTime: '5 hours',
        difficulty: 'intermediate',
      }
    ],
    outcomes: [
      'Understand the fundamentals of Python programming',
      'Write clean and efficient Python code',
      'Work with data structures and algorithms',
      'Apply object-oriented programming principles',
    ],
  },
  {
    id: '3',
    title: 'Web Development Fundamentals',
    description: 'Master HTML and CSS to create visually appealing, responsive websites from scratch.',
    introduction: 'This foundational course will teach you the core technologies that power the web. You\'ll learn HTML for structure, CSS for styling, and the basics of responsive design to ensure your websites look great on all devices. By the end of this course, you\'ll have the skills to build professional, responsive websites from scratch.',
    learningObjectives: [
      'Understand the structure and purpose of HTML documents',
      'Create and style web pages using modern CSS techniques',
      'Build responsive layouts that work on desktop and mobile devices',
      'Implement best practices for web accessibility and SEO',
      'Deploy your completed websites to live servers'
    ],
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    category: 'Web Development',
    level: 'Beginner',
    duration: '32 hours',
    students: 2180,
    lessons: 38,
    featured: false,
    price: '₹699',
    modules: [
      {
        title: 'HTML Fundamentals',
        duration: '10 hours',
        lessons: [
          { title: 'Introduction to HTML', duration: '45 mins', id: 'html-1' },
          { title: 'HTML Document Structure', duration: '60 mins', id: 'html-2' },
          { title: 'Working with Text Elements', duration: '60 mins', id: 'html-3' },
          { title: 'Creating Links and Navigation', duration: '60 mins', id: 'html-4' },
        ],
        exercises: [
          {
            id: 'ex-html-1',
            title: 'Build a Personal Profile Page',
            description: 'Create a simple personal profile page using core HTML elements.',
            type: 'task',
            difficulty: 'easy',
            estimatedTime: '45 mins',
          }
        ]
      },
      {
        title: 'CSS Styling',
        duration: '12 hours',
        lessons: [
          { title: 'Introduction to CSS', duration: '45 mins', id: 'css-1' },
          { title: 'Selectors and Properties', duration: '60 mins', id: 'css-2' },
          { title: 'Box Model and Layout', duration: '75 mins', id: 'css-3' },
          { title: 'Colors, Typography, and Backgrounds', duration: '60 mins', id: 'css-4' },
        ],
        exercises: [
          {
            id: 'ex-css-1',
            title: 'Style Your Profile Page',
            description: 'Apply CSS styling to the personal profile page you created in the HTML section.',
            type: 'task',
            difficulty: 'medium',
            estimatedTime: '60 mins',
          }
        ]
      }
    ],
    projects: [
      {
        id: 'proj-web-1',
        title: 'Portfolio Website',
        description: 'Build a complete portfolio website to showcase your skills and projects.',
        skills: ['HTML', 'CSS', 'Responsive Design'],
        estimatedTime: '5 hours',
        difficulty: 'beginner',
      }
    ],
    outcomes: [
      'Build complete, standards-compliant websites from scratch',
      'Create responsive layouts that work on all devices',
      'Implement modern CSS techniques for styling',
      'Understand web accessibility principles',
    ],
  },
  {
    id: '4',
    title: 'Public Speaking Essentials',
    description: 'Build confidence and develop effective communication skills for presentations and interviews.',
    introduction: 'This practical course will help you overcome the fear of public speaking and develop the confidence to speak in front of any audience. You\'ll learn techniques for structuring talks, engaging audiences, and handling questions effectively, whether for classroom presentations, job interviews, or professional events.',
    learningObjectives: [
      'Overcome nervousness and build confidence when speaking in public',
      'Structure presentations for maximum impact and audience engagement',
      'Develop a compelling speaking voice and effective body language',
      'Create impactful visual aids that enhance your message',
      'Answer questions confidently and handle difficult situations'
    ],
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    category: 'Soft Skills',
    level: 'Intermediate',
    duration: '24 hours',
    students: 1950,
    lessons: 28,
    featured: false,
    price: '₹599',
    modules: [
      {
        title: 'Building Confidence',
        duration: '6 hours',
        lessons: [
          { title: 'Understanding and Overcoming Fear', duration: '45 mins', id: 'speak-1' },
          { title: 'Vocal Exercises and Breath Control', duration: '60 mins', id: 'speak-2' },
          { title: 'Body Language Essentials', duration: '60 mins', id: 'speak-3' },
          { title: 'Practice Techniques', duration: '45 mins', id: 'speak-4' },
        ],
        exercises: [
          {
            id: 'ex-speak-1',
            title: 'One-Minute Introduction',
            description: 'Prepare and deliver a confident one-minute introduction about yourself.',
            type: 'task',
            difficulty: 'easy',
            estimatedTime: '30 mins',
          }
        ]
      }
    ],
    projects: [
      {
        id: 'proj-speak-1',
        title: 'Persuasive Presentation',
        description: 'Develop and deliver a 5-minute persuasive talk on a topic you care about.',
        skills: ['Speech Structure', 'Delivery Techniques', 'Visual Aids'],
        estimatedTime: '4 hours',
        difficulty: 'intermediate',
      }
    ],
    outcomes: [
      'Deliver presentations with confidence and impact',
      'Structure talks for clarity and audience engagement',
      'Handle nervousness and speak with authority',
      'Create compelling visual aids that enhance your message',
    ],
  },
  {
    id: '5',
    title: 'SQL Database Management',
    description: 'Learn how to create, query, and manage databases using SQL with practical exercises for data handling.',
    introduction: 'This course provides a comprehensive introduction to SQL and database management. You\'ll learn how to design databases, write efficient queries, and manage data effectively. Whether you\'re aiming to become a database administrator or just need database skills for your development or analysis work, this course will give you the practical knowledge you need.',
    learningObjectives: [
      'Design efficient database schemas',
      'Write complex SQL queries to retrieve and manipulate data',
      'Understand database normalization principles',
      'Implement security and performance best practices',
      'Work with transactions and manage concurrent access'
    ],
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    category: 'Database',
    level: 'Intermediate',
    duration: '30 hours',
    students: 1760,
    lessons: 35,
    featured: true,
    price: '₹999',
    modules: [
      {
        title: 'Introduction to SQL',
        duration: '6 hours',
        lessons: [
          { title: 'Setting up the Database Environment', duration: '45 mins', id: 'sql-1' },
          { title: 'Creating and Managing Databases', duration: '60 mins', id: 'sql-2' },
          { title: 'Understanding Data Types', duration: '45 mins', id: 'sql-3' },
          { title: 'Basic SQL Queries', duration: '60 mins', id: 'sql-4' },
        ],
        exercises: [
          {
            id: 'ex-sql-1',
            title: 'Create a Student Database',
            description: 'Design and create a simple database schema for a school with tables for students, classes, and grades.',
            type: 'task',
            difficulty: 'easy',
            estimatedTime: '45 mins',
          },
          {
            id: 'ex-sql-2',
            title: 'Basic Queries Quiz',
            description: 'Test your knowledge of SELECT, INSERT, UPDATE, and DELETE operations.',
            type: 'quiz',
            difficulty: 'easy',
            estimatedTime: '30 mins',
          }
        ]
      },
      {
        title: 'Advanced SQL Queries',
        duration: '8 hours',
        lessons: [
          { title: 'Joining Tables', duration: '60 mins', id: 'sql-5' },
          { title: 'Using Subqueries', duration: '90 mins', id: 'sql-6' },
          { title: 'Aggregate Functions', duration: '45 mins', id: 'sql-7' },
          { title: 'Working with Views', duration: '60 mins', id: 'sql-8' },
        ],
        exercises: [
          {
            id: 'ex-sql-3',
            title: 'Complex Joins Practice',
            description: 'Write queries that use different types of joins to retrieve data from multiple related tables.',
            type: 'coding',
            difficulty: 'medium',
            estimatedTime: '60 mins',
          },
          {
            id: 'ex-sql-4',
            title: 'Data Analysis with SQL',
            description: 'Use aggregate functions and GROUP BY to analyze sales data and generate reports.',
            type: 'coding',
            difficulty: 'medium',
            estimatedTime: '60 mins',
          }
        ]
      },
      {
        title: 'Database Management',
        duration: '10 hours',
        lessons: [
          { title: 'Transactions and Locking', duration: '90 mins', id: 'sql-9' },
          { title: 'Backup and Recovery', duration: '120 mins', id: 'sql-10' },
          { title: 'Performance Tuning', duration: '90 mins', id: 'sql-11' },
          { title: 'Security and Permissions', duration: '60 mins', id: 'sql-12' },
        ],
        exercises: [
          {
            id: 'ex-sql-5',
            title: 'Transaction Management',
            description: 'Implement a series of operations within transactions, including handling errors and rollbacks.',
            type: 'coding',
            difficulty: 'hard',
            estimatedTime: '75 mins',
          }
        ]
      },
    ],
    projects: [
      {
        id: 'proj-sql-1',
        title: 'E-commerce Database',
        description: 'Design and implement a complete database for an e-commerce platform, including products, customers, orders, and reviews.',
        skills: ['Database Design', 'SQL Queries', 'Normalization'],
        estimatedTime: '6 hours',
        difficulty: 'intermediate',
      },
      {
        id: 'proj-sql-2',
        title: 'Data Migration Tool',
        description: 'Create a tool that extracts data from a CSV file and imports it into a properly structured SQL database.',
        skills: ['SQL', 'Data Processing', 'Error Handling'],
        estimatedTime: '5 hours',
        difficulty: 'intermediate',
      }
    ],
    outcomes: [
      'Create and manage databases using SQL',
      'Write complex SQL queries to retrieve and manipulate data',
      'Understand database management principles',
      'Optimize database performance',
    ],
  },
  {
    id: '6',
    title: 'Advanced Excel for Data Analysis',
    description: 'Master Excel functions, pivot tables, and data visualization for effective data analysis.',
    introduction: 'Take your Excel skills to the next level with this advanced course focused on data analysis. You\'ll learn powerful functions, pivot tables, data modeling techniques, and visualization tools that will transform how you work with data. This course is designed for those who already have basic Excel knowledge and want to leverage it for more complex analytical tasks.',
    learningObjectives: [
      'Master advanced Excel functions for data manipulation and analysis',
      'Create powerful pivot tables and dashboards',
      'Implement data models and relationships between tables',
      'Automate repetitive tasks with macros',
      'Create compelling visualizations to communicate insights'
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    category: 'Data Analysis',
    level: 'Advanced',
    duration: '28 hours',
    students: 2100,
    lessons: 32,
    featured: false,
    price: '₹899',
    modules: [
      {
        title: 'Advanced Excel Functions',
        duration: '8 hours',
        lessons: [
          { title: 'Lookup and Reference Functions', duration: '60 mins', id: 'excel-adv-1' },
          { title: 'Statistical and Mathematical Functions', duration: '75 mins', id: 'excel-adv-2' },
          { title: 'Text and Date Functions', duration: '60 mins', id: 'excel-adv-3' },
          { title: 'Array Formulas and Dynamic Arrays', duration: '90 mins', id: 'excel-adv-4' },
        ],
        exercises: [
          {
            id: 'ex-excel-adv-1',
            title: 'Sales Data Analysis',
            description: 'Apply advanced functions to analyze a complex sales dataset.',
            type: 'task',
            difficulty: 'medium',
            estimatedTime: '60 mins',
          }
        ]
      }
    ],
    projects: [
      {
        id: 'proj-excel-1',
        title: 'Interactive Sales Dashboard',
        description: 'Create a comprehensive interactive dashboard that analyzes sales data across regions and product categories.',
        skills: ['Pivot Tables', 'Charts', 'Conditional Formatting', 'Data Modeling'],
        estimatedTime: '5 hours',
        difficulty: 'advanced',
      }
    ],
    outcomes: [
      'Perform complex data analysis tasks efficiently in Excel',
      'Create interactive dashboards for data visualization',
      'Automate repetitive tasks using macros',
      'Build data models for more effective analysis',
    ],
  },
  {
    id: '7',
    title: 'Resume Building Workshop',
    description: 'Learn how to create an impressive resume that stands out to potential employers.',
    introduction: 'This practical workshop will teach you how to craft a resume that effectively showcases your skills and experiences to potential employers. You\'ll learn how to highlight your strengths, tailor your resume for specific job applications, and navigate applicant tracking systems. By the end of this course, you\'ll have a professional resume ready for your job hunt.',
    learningObjectives: [
      'Understand the key components of an effective resume',
      'Structure your resume for maximum impact',
      'Highlight your skills and achievements effectively',
      'Optimize your resume for applicant tracking systems',
      'Tailor your resume for different job applications'
    ],
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    category: 'Career Development',
    level: 'Beginner',
    duration: '12 hours',
    students: 3500,
    lessons: 15,
    featured: false,
    price: '₹399',
    modules: [
      {
        title: 'Resume Fundamentals',
        duration: '4 hours',
        lessons: [
          { title: 'Resume Structure and Formats', duration: '45 mins', id: 'resume-1' },
          { title: 'Writing Compelling Content', duration: '60 mins', id: 'resume-2' },
          { title: 'ATS Optimization Strategies', duration: '45 mins', id: 'resume-3' },
          { title: 'Common Resume Mistakes', duration: '30 mins', id: 'resume-4' },
        ],
        exercises: [
          {
            id: 'ex-resume-1',
            title: 'Resume Content Preparation',
            description: 'Identify and organize your skills, experiences, and achievements for your resume.',
            type: 'task',
            difficulty: 'easy',
            estimatedTime: '45 mins',
          }
        ]
      }
    ],
    projects: [
      {
        id: 'proj-resume-1',
        title: 'Complete Professional Resume',
        description: 'Create a polished, professional resume tailored to your target career field.',
        skills: ['Content Writing', 'Layout Design', 'Formatting'],
        estimatedTime: '3 hours',
        difficulty: 'beginner',
      }
    ],
    outcomes: [
      'Create a professional, impactful resume',
      'Customize your resume for different job applications',
      'Effectively showcase your skills and achievements',
      'Navigate applicant tracking systems successfully',
    ],
  },
  {
    id: '8',
    title: 'Interview Preparation Skills',
    description: 'Master the art of interviewing with mock interviews, feedback, and confidence-building techniques.',
    introduction: 'This comprehensive course prepares you for job interviews through practical techniques, mock interview sessions, and personalized feedback. You\'ll learn how to research companies, answer common questions, handle behavioral interviews, and present yourself confidently. By the end of this course, you\'ll approach interviews with confidence and skill.',
    learningObjectives: [
      'Prepare effectively for different types of interviews',
      'Answer common and challenging interview questions',
      'Develop strategies for behavioral and situational questions',
      'Present yourself professionally and confidently',
      'Follow up effectively after interviews'
    ],
    image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    category: 'Career Development',
    level: 'Intermediate',
    duration: '20 hours',
    students: 2800,
    lessons: 24,
    featured: false,
    price: '₹699',
    modules: [
      {
        title: 'Interview Preparation',
        duration: '6 hours',
        lessons: [
          { title: 'Company Research Techniques', duration: '45 mins', id: 'interview-1' },
          { title: 'Common Interview Questions', duration: '60 mins', id: 'interview-2' },
          { title: 'The STAR Method for Behavioral Questions', duration: '60 mins', id: 'interview-3' },
          { title: 'Body Language and Presentation', duration: '45 mins', id: 'interview-4' },
        ],
        exercises: [
          {
            id: 'ex-interview-1',
            title: 'Mock Interview Practice',
            description: 'Prepare and record responses to common interview questions using the STAR method.',
            type: 'task',
            difficulty: 'medium',
            estimatedTime: '60 mins',
          }
        ]
      }
    ],
    projects: [
      {
        id: 'proj-interview-1',
        title: 'Complete Interview Preparation Package',
        description: 'Create a comprehensive preparation package including company research, prepared answers, and questions to ask.',
        skills: ['Research', 'Communication', 'STAR Method'],
        estimatedTime: '4 hours',
        difficulty: 'intermediate',
      }
    ],
    outcomes: [
      'Approach interviews with confidence and preparedness',
      'Answer challenging questions effectively',
      'Present yourself professionally during interviews',
      'Follow up appropriately after interviews',
    ],
  },
  {
    id: '9',
    title: 'Prompt Engineering for AI',
    description: 'Learn the art of crafting effective prompts for AI tools like ChatGPT to get better, more accurate results.',
    introduction: 'As AI tools become increasingly integrated into our daily workflows, knowing how to effectively communicate with these systems is becoming an essential skill. This course teaches you the principles and techniques of prompt engineering—the art of crafting inputs that generate the most useful outputs from AI systems like ChatGPT, DALL-E, and other large language models.',
    learningObjectives: [
      'Understand how AI language models process and respond to different types of prompts',
      'Master key techniques for writing clear, effective prompts',
      'Learn how to iterate and refine prompts to get better results',
      'Apply prompt engineering across different AI tools and use cases',
      'Develop strategies for overcoming common AI limitations through clever prompting'
    ],
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    category: 'AI Skills',
    level: 'Beginner',
    duration: '15 hours',
    students: 1850,
    lessons: 18,
    featured: true,
    price: 'Free',
    modules: [
      {
        title: 'Introduction to Prompt Engineering',
        duration: '3 hours',
        lessons: [
          { title: 'Understanding AI Models', duration: '30 mins', id: 'ai-1' },
          { title: 'The Art of Prompting', duration: '45 mins', id: 'ai-2' },
          { title: 'Basic Prompting Techniques', duration: '60 mins', id: 'ai-3' },
          { title: 'Common Mistakes to Avoid', duration: '45 mins', id: 'ai-4' },
        ],
        exercises: [
          {
            id: 'ex-ai-1',
            title: 'Rewrite Simple Prompts',
            description: 'Practice rewriting ineffective prompts to get better results from an AI assistant.',
            type: 'task',
            difficulty: 'easy',
            estimatedTime: '30 mins',
          },
          {
            id: 'ex-ai-2',
            title: 'Prompt Analysis Quiz',
            description: 'Analyze different prompts and predict which will produce the most helpful response.',
            type: 'quiz',
            difficulty: 'easy',
            estimatedTime: '20 mins',
          }
        ]
      },
      {
        title: 'Advanced Prompting Techniques',
        duration: '5 hours',
        lessons: [
          { title: 'Using Context and Examples', duration: '60 mins', id: 'ai-5' },
          { title: 'Iterative Prompting', duration: '90 mins', id: 'ai-6' },
          { title: 'Prompting for Different Tasks', duration: '45 mins', id: 'ai-7' },
          { title: 'Prompting for Creativity', duration: '60 mins', id: 'ai-8' },
        ],
        exercises: [
          {
            id: 'ex-ai-3',
            title: 'Chain-of-Thought Prompting',
            description: 'Apply chain-of-thought techniques to help AI models solve complex reasoning problems.',
            type: 'task',
            difficulty: 'medium',
            estimatedTime: '45 mins',
          },
          {
            id: 'ex-ai-4',
            title: 'Creative Writing with AI',
            description: 'Craft prompts that guide AI to generate creative stories with specific themes and styles.',
            type: 'task',
            difficulty: 'medium',
            estimatedTime: '60 mins',
          }
        ]
      },
      {
        title: 'Prompt Engineering for Specific AI Models',
        duration: '7 hours',
        lessons: [
          { title: 'Prompting for ChatGPT', duration: '90 mins', id: 'ai-9' },
          { title: 'Prompting for Image Generation', duration: '120 mins', id: 'ai-10' },
          { title: 'Prompting for Code Generation', duration: '90 mins', id: 'ai-11' },
          { title: 'Prompting for Data Analysis', duration: '60 mins', id: 'ai-12' },
        ],
        exercises: [
          {
            id: 'ex-ai-5',
            title: 'Code Helper Prompts',
            description: 'Create prompts that generate useful code snippets and explain programming concepts.',
            type: 'task',
            difficulty: 'hard',
            estimatedTime: '60 mins',
          },
          {
            id: 'ex-ai-6',
            title: 'AI Image Creation',
            description: 'Craft detailed prompts for image generation tools to create specific visual outputs.',
            type: 'task',
            difficulty: 'medium',
            estimatedTime: '45 mins',
          }
        ]
      },
    ],
    projects: [
      {
        id: 'proj-ai-1',
        title: 'Personal AI Writing Assistant',
        description: 'Design a set of template prompts for different writing tasks (emails, essays, creative writing) that can be reused and customized.',
        skills: ['Prompt Engineering', 'Template Design', 'Writing'],
        estimatedTime: '3 hours',
        difficulty: 'beginner',
      },
      {
        id: 'proj-ai-2',
        title: 'AI Learning Tool',
        description: 'Create a structured prompt system that turns AI into a personalized tutor for a subject of your choice.',
        skills: ['Advanced Prompting', 'Educational Design', 'Chain-of-Thought'],
        estimatedTime: '4 hours',
        difficulty: 'intermediate',
      }
    ],
    outcomes: [
      'Understand the principles of prompt engineering',
      'Craft effective prompts for AI tools',
      'Improve the accuracy and quality of AI results',
      'Apply prompt engineering techniques to different AI models',
    ],
  },
];

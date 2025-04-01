
// Define the structure for course resources
export interface CourseResource {
  id: string;
  courseId: string;
  title: string;
  fileName: string;
  fileSize: string;
  description: string;
  type: 'pdf' | 'zip' | 'docx';
}

// Course resources for all available courses
export const courseResources: CourseResource[] = [
  // MS Office Suite Resources
  {
    id: 'res-word-1',
    courseId: '1', // Complete MS Office Suite Mastery
    title: 'MS Word Complete Guide',
    fileName: 'ms-word-complete-guide.pdf',
    fileSize: '2.4 MB',
    description: 'Comprehensive guide covering all MS Word topics from basic to advanced features',
    type: 'pdf'
  },
  {
    id: 'res-excel-1',
    courseId: '1', // Complete MS Office Suite Mastery
    title: 'MS Excel Formulas and Functions',
    fileName: 'excel-formulas-functions.pdf',
    fileSize: '3.1 MB',
    description: 'Complete reference for Excel formulas and functions with examples',
    type: 'pdf'
  },
  {
    id: 'res-powerpoint-1',
    courseId: '1', // Complete MS Office Suite Mastery
    title: 'PowerPoint Presentation Mastery',
    fileName: 'powerpoint-mastery.pdf',
    fileSize: '2.8 MB',
    description: 'Learn to create professional presentations with animations and transitions',
    type: 'pdf'
  },
  
  // Python Programming Resources
  {
    id: 'res-python-1',
    courseId: '2', // Introduction to Python Programming
    title: 'Python Basics Guide',
    fileName: 'python-programming-basics.pdf',
    fileSize: '4.2 MB',
    description: 'Introduction to Python syntax, data types, and control structures',
    type: 'pdf'
  },
  {
    id: 'res-python-2',
    courseId: '2', // Introduction to Python Programming
    title: 'Python Data Structures',
    fileName: 'python-data-structures.pdf',
    fileSize: '3.5 MB',
    description: 'Comprehensive guide to Python lists, dictionaries, tuples, and sets',
    type: 'pdf'
  },
  {
    id: 'res-python-3',
    courseId: '2', // Introduction to Python Programming
    title: 'Python OOP Concepts',
    fileName: 'python-oop-concepts.pdf',
    fileSize: '2.9 MB',
    description: 'Learn object-oriented programming principles in Python',
    type: 'pdf'
  },
  
  // Web Development Resources
  {
    id: 'res-web-1',
    courseId: '3', // Web Development Fundamentals
    title: 'HTML & CSS Fundamentals',
    fileName: 'html-css-fundamentals.pdf',
    fileSize: '3.8 MB',
    description: 'Learn to create responsive websites with HTML and CSS',
    type: 'pdf'
  },
  {
    id: 'res-web-2',
    courseId: '3', // Web Development Fundamentals
    title: 'Web Design Principles',
    fileName: 'web-design-principles.pdf',
    fileSize: '2.6 MB',
    description: 'Best practices for creating user-friendly web interfaces',
    type: 'pdf'
  },
  
  // Public Speaking Resources
  {
    id: 'res-speaking-1',
    courseId: '4', // Public Speaking Essentials
    title: 'Public Speaking Guide',
    fileName: 'public-speaking-essentials.pdf',
    fileSize: '1.9 MB',
    description: 'Techniques to improve confidence and deliver impactful presentations',
    type: 'pdf'
  },
  
  // SQL Database Resources
  {
    id: 'res-sql-1',
    courseId: '5', // SQL Database Management
    title: 'SQL Queries Reference',
    fileName: 'sql-queries-reference.pdf',
    fileSize: '3.2 MB',
    description: 'Complete reference for SQL queries with examples',
    type: 'pdf'
  },
  {
    id: 'res-sql-2',
    courseId: '5', // SQL Database Management
    title: 'Database Design Guide',
    fileName: 'database-design-guide.pdf',
    fileSize: '2.8 MB',
    description: 'Learn database normalization and effective schema design',
    type: 'pdf'
  },
  
  // Excel Data Analysis Resources
  {
    id: 'res-excel-adv-1',
    courseId: '6', // Advanced Excel for Data Analysis
    title: 'Excel Data Analysis Techniques',
    fileName: 'excel-data-analysis.pdf',
    fileSize: '4.5 MB',
    description: 'Advanced Excel functions and techniques for data analysis',
    type: 'pdf'
  },
  {
    id: 'res-excel-adv-2',
    courseId: '6', // Advanced Excel for Data Analysis
    title: 'Excel Dashboard Creation',
    fileName: 'excel-dashboards.pdf',
    fileSize: '3.7 MB',
    description: 'Step-by-step guide to create interactive Excel dashboards',
    type: 'pdf'
  },
  
  // Resume Building Resources
  {
    id: 'res-resume-1',
    courseId: '7', // Resume Building Workshop
    title: 'Resume Templates Pack',
    fileName: 'resume-templates.pdf',
    fileSize: '2.3 MB',
    description: 'Collection of professional resume templates with guidelines',
    type: 'pdf'
  },
  
  // Interview Preparation Resources
  {
    id: 'res-interview-1',
    courseId: '8', // Interview Preparation Skills
    title: 'Interview Questions & Answers',
    fileName: 'interview-preparation.pdf',
    fileSize: '2.1 MB',
    description: 'Common interview questions with sample answers and techniques',
    type: 'pdf'
  },
  
  // Prompt Engineering Resources
  {
    id: 'res-prompt-1',
    courseId: '9', // Prompt Engineering for AI
    title: 'AI Prompt Engineering Guide',
    fileName: 'prompt-engineering-guide.pdf',
    fileSize: '3.4 MB',
    description: 'Learn to write effective prompts for different AI models',
    type: 'pdf'
  },
  {
    id: 'res-prompt-2',
    courseId: '9', // Prompt Engineering for AI
    title: 'AI Tools Comparison',
    fileName: 'ai-tools-comparison.pdf',
    fileSize: '2.2 MB',
    description: 'Comparison of popular AI tools and their prompt requirements',
    type: 'pdf'
  }
];

// Helper function to get resources by course ID
export const getResourcesByCourseId = (courseId: string): CourseResource[] => {
  return courseResources.filter(resource => resource.courseId === courseId);
};

// Function to get all resources for a module (by module slug)
export const getResourcesByModuleSlug = (moduleSlug: string): CourseResource[] => {
  // Map module slugs to course IDs
  const moduleMap: Record<string, string> = {
    'ms-word': '1',
    'excel-fundamentals': '1',
    'powerpoint-presentations': '1',
    'python-basics': '2',
    'data-structures': '2',
    'object-oriented-programming': '2',
    'html-fundamentals': '3',
    'css-styling': '3',
    'public-speaking': '4',
    'sql-introduction': '5',
    'advanced-sql-queries': '5',
    'advanced-excel-functions': '6',
    'resume-fundamentals': '7',
    'interview-preparation': '8',
    'prompt-engineering-introduction': '9',
    'advanced-prompting-techniques': '9'
  };
  
  const courseId = moduleMap[moduleSlug] || '';
  return getResourcesByCourseId(courseId);
};

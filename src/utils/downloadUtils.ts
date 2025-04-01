
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
      
      // For simulation purposes, we'll create a dummy text content
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

// Function to create dummy content based on file type
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

  if (fileType === 'pdf') {
    return `
==================================
${fileName.toUpperCase()} - COURSE CONTENT
==================================

COURSE OUTLINE:
${topics.map((topic, index) => `${index + 1}. ${topic}`).join('\n')}

PROJECTS:
1. Project 1: Basic Implementation
   - Apply fundamental concepts
   - Create a simple solution
   - Document your approach

2. Project 2: Intermediate Application
   - Incorporate advanced techniques
   - Solve a real-world problem
   - Analyze results and improve

3. Final Project: Comprehensive Solution
   - Integrate multiple concepts
   - Develop a complete solution
   - Present and explain your work

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

This is a simulated ZIP file for learning purposes.
In a real application, this would contain actual course materials.
`;
  } else {
    return `This is a simulated ${fileType.toUpperCase()} file for ${fileName}.\n\n` +
      `This would be the actual course content in a real application.`;
  }
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
      link.setAttribute('download', `${courseName}-resources.zip`);
      
      // Append to body, click and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      window.URL.revokeObjectURL(url);
      
      toast.success("Resources downloaded!", {
        description: `All resources for ${courseTitle} have been downloaded.`,
      });
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Download failed", {
        description: "There was an error downloading the resources. Please try again later.",
      });
    }
  }, 2000);
};

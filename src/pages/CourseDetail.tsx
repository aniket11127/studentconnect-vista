
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Users, BookOpen, Award, BarChart2, Calendar, MessageSquare, User, Check, CheckCircle2, CircleDashed, Rocket, Brain, Target, Code, PenSquare } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from 'sonner';

// Type definitions for exercises and projects
type Exercise = {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'task' | 'coding';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
};

type Project = {
  id: string;
  title: string;
  description: string;
  skills: string[];
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
};

// Type for user progress
type UserProgress = {
  completedLessons: string[];
  completedExercises: string[];
  completedProjects: string[];
};

// Related VIP sessions for each course
const courseRelatedSessions = {
  '1': [
    {
      id: '6',
      title: 'Advanced Excel Techniques for Data Analysis',
      expert: 'Vishal Khanna',
      expertRole: 'Data Scientist, Infosys',
      date: 'May 5, 2025',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
      category: 'Office Skills',
      status: 'Coming Soon',
    }
  ],
  '2': [
    {
      id: '7',
      title: 'Python for Data Science & Machine Learning',
      expert: 'Dr. Anjali Kumar',
      expertRole: 'AI Researcher, IBM',
      date: 'May 12, 2025',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop',
      category: 'Programming',
      status: 'Coming Soon',
    }
  ],
  '5': [
    {
      id: '8',
      title: 'Database Design & Optimization Techniques',
      expert: 'Sanjay Mehta',
      expertRole: 'Database Architect, Oracle',
      date: 'May 18, 2025',
      image: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2070&auto=format&fit=crop',
      category: 'Database',
      status: 'Coming Soon',
    }
  ],
  '9': [
    {
      id: '1',
      title: 'How AI is Changing the Future?',
      expert: 'Dr. Rajesh Sharma',
      expertRole: 'AI Scientist, IIT Bombay',
      date: 'April 10, 2025',
      image: 'https://images.unsplash.com/photo-1677442135888-8bae225cd8c4?q=80&w=1932&auto=format&fit=crop',
      category: 'AI & Future Tech',
      status: 'Open',
    },
    {
      id: '9',
      title: 'Effective Prompt Writing for Generative AI',
      expert: 'Maya Patel',
      expertRole: 'AI Content Specialist, OpenAI',
      date: 'June 8, 2025',
      image: 'https://images.unsplash.com/photo-1675258164457-f258a07e826a?q=80&w=1932&auto=format&fit=crop',
      category: 'AI Skills',
      status: 'Coming Soon',
    }
  ]
};

// Enhanced course details with exercises and projects
const courseDetails = [
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
    level: 'Beginner' as const,
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
    level: 'Beginner' as const,
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
    level: 'Intermediate' as const,
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
    level: 'Beginner' as const,
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

const CourseDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('curriculum');
  const [userProgress, setUserProgress] = useState<UserProgress>({
    completedLessons: [],
    completedExercises: [],
    completedProjects: []
  });
  
  // Find the course by ID
  const course = courseDetails.find(course => course.id === id);
  
  // Load user progress from local storage on component mount
  useEffect(() => {
    if (id) {
      const savedProgress = localStorage.getItem(`course-progress-${id}`);
      if (savedProgress) {
        setUserProgress(JSON.parse(savedProgress));
      }
    }
  }, [id]);
  
  // Save progress to local storage whenever it changes
  useEffect(() => {
    if (id) {
      localStorage.setItem(`course-progress-${id}`, JSON.stringify(userProgress));
    }
  }, [userProgress, id]);
  
  // Handle marking a lesson as complete/incomplete
  const toggleLessonCompletion = (lessonId: string) => {
    setUserProgress(prev => {
      const isCompleted = prev.completedLessons.includes(lessonId);
      let updatedLessons;
      
      if (isCompleted) {
        updatedLessons = prev.completedLessons.filter(id => id !== lessonId);
        toast(`Lesson marked as incomplete`, {
          description: "Your progress has been updated"
        });
      } else {
        updatedLessons = [...prev.completedLessons, lessonId];
        toast(`Lesson completed!`, {
          description: "Great job on your progress"
        });
      }
      
      return {
        ...prev,
        completedLessons: updatedLessons
      };
    });
  };
  
  // Handle marking an exercise as complete/incomplete
  const toggleExerciseCompletion = (exerciseId: string) => {
    setUserProgress(prev => {
      const isCompleted = prev.completedExercises.includes(exerciseId);
      let updatedExercises;
      
      if (isCompleted) {
        updatedExercises = prev.completedExercises.filter(id => id !== exerciseId);
        toast(`Exercise marked as incomplete`, {
          description: "Your progress has been updated"
        });
      } else {
        updatedExercises = [...prev.completedExercises, exerciseId];
        toast(`Exercise completed!`, {
          description: "Well done on completing this exercise"
        });
      }
      
      return {
        ...prev,
        completedExercises: updatedExercises
      };
    });
  };
  
  // Handle marking a project as complete/incomplete
  const toggleProjectCompletion = (projectId: string) => {
    setUserProgress(prev => {
      const isCompleted = prev.completedProjects.includes(projectId);
      let updatedProjects;
      
      if (isCompleted) {
        updatedProjects = prev.completedProjects.filter(id => id !== projectId);
        toast(`Project marked as incomplete`, {
          description: "Your progress has been updated"
        });
      } else {
        updatedProjects = [...prev.completedProjects, projectId];
        toast(`Project completed!`, {
          description: "Congratulations on completing this project"
        });
      }
      
      return {
        ...prev,
        completedProjects: updatedProjects
      };
    });
  };
  
  // Calculate course completion percentage
  const calculateProgress = () => {
    if (!course) return 0;
    
    // Count all lessons, exercises, and projects
    let totalItems = 0;
    let completedItems = 0;
    
    // Count lessons
    const allLessons = course.modules.flatMap(module => module.lessons);
    totalItems += allLessons.length;
    completedItems += allLessons.filter(lesson => 
      userProgress.completedLessons.includes(lesson.id)
    ).length;
    
    // Count exercises
    const allExercises = course.modules.flatMap(module => module.exercises || []);
    totalItems += allExercises.length;
    completedItems += allExercises.filter(exercise => 
      userProgress.completedExercises.includes(exercise.id)
    ).length;
    
    // Count projects
    if (course.projects) {
      totalItems += course.projects.length;
      completedItems += course.projects.filter(project => 
        userProgress.completedProjects.includes(project.id)
      ).length;
    }
    
    return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  };
  
  // Handle case where course is not found
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24">
          <div className="container py-16">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
              <p className="text-muted-foreground mb-8">The course you're looking for doesn't exist or has been removed.</p>
              <Button asChild>
                <Link to="/courses">Browse All Courses</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Get related VIP sessions for this course
  const relatedSessions = courseRelatedSessions[course.id as keyof typeof courseRelatedSessions] || [];

  // Calculate progress
  const progressPercentage = calculateProgress();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <section className="bg-secondary/30 py-12">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/3 space-y-6">
                <div>
                  <Link to="/courses" className="inline-flex items-center text-sm text-primary hover:underline mb-4">
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Back to Courses
                  </Link>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                      {course.category}
                    </span>
                    <span className="inline-block px-3 py-1 bg-muted text-muted-foreground text-sm font-medium rounded-full">
                      {course.level}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold">{course.title}</h1>
                  <p className="text-muted-foreground mt-2">{course.description}</p>
                </div>

                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    {course.students.toLocaleString()} students
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    {course.lessons} lessons
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    Certificate of completion
                  </div>
                </div>

                <div className="mt-8">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex mb-6">
                      <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                      <TabsTrigger value="exercises">Exercises & Projects</TabsTrigger>
                      <TabsTrigger value="info">Course Info</TabsTrigger>
                    </TabsList>

                    <TabsContent value="curriculum" className="space-y-6">
                      <div className="bg-background rounded-lg p-6 shadow-sm border">
                        <h3 className="text-xl font-semibold mb-4">Course Modules</h3>
                        <div className="space-y-4">
                          {course.modules.map((module, index) => (
                            <Accordion 
                              key={index} 
                              type="single" 
                              collapsible 
                              className="bg-card rounded-lg"
                            >
                              <AccordionItem value={`module-${index}`} className="border-b-0">
                                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                                  <div className="flex flex-col items-start text-left">
                                    <div className="font-medium">{module.title}</div>
                                    <div className="text-xs text-muted-foreground mt-1">
                                      {module.duration} · {module.lessons.length} lessons
                                    </div>
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-4 pt-0">
                                  <div className="space-y-2">
                                    {module.lessons.map((lesson, lessonIndex) => (
                                      <div 
                                        key={lessonIndex}
                                        className="flex items-center justify-between p-3 border rounded-md hover:bg-accent/50 transition-colors"
                                      >
                                        <div className="flex items-center gap-3">
                                          {userProgress.completedLessons.includes(lesson.id) ? (
                                            <CheckCircle2 className="h-5 w-5 text-primary" />
                                          ) : (
                                            <CircleDashed className="h-5 w-5 text-muted-foreground" />
                                          )}
                                          <div>
                                            <div className="font-medium">{lesson.title}</div>
                                            <div className="text-xs text-muted-foreground">{lesson.duration}</div>
                                          </div>
                                        </div>
                                        <Button 
                                          variant="ghost" 
                                          size="sm"
                                          onClick={() => toggleLessonCompletion(lesson.id)}
                                        >
                                          {userProgress.completedLessons.includes(lesson.id) ? 'Mark incomplete' : 'Mark complete'}
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="exercises" className="space-y-6">
                      <div className="bg-background rounded-lg p-6 shadow-sm border">
                        <h3 className="text-xl font-semibold mb-4">Practical Exercises</h3>
                        <div className="space-y-6">
                          {course.modules.map((module, moduleIndex) => (
                            module.exercises && module.exercises.length > 0 ? (
                              <div key={moduleIndex} className="border rounded-lg p-4">
                                <h4 className="font-medium mb-3">{module.title} - Exercises</h4>
                                <div className="space-y-3">
                                  {module.exercises.map((exercise, exerciseIndex) => (
                                    <Collapsible key={exerciseIndex} className="border rounded-md">
                                      <div className="flex items-center justify-between p-3">
                                        <div className="flex items-center gap-3">
                                          {userProgress.completedExercises.includes(exercise.id) ? (
                                            <CheckCircle2 className="h-5 w-5 text-primary" />
                                          ) : (
                                            <CircleDashed className="h-5 w-5 text-muted-foreground" />
                                          )}
                                          <div>
                                            <div className="font-medium">{exercise.title}</div>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                              <span className={`px-2 py-0.5 rounded-full ${
                                                exercise.difficulty === 'easy' 
                                                  ? 'bg-green-100 text-green-700' 
                                                  : exercise.difficulty === 'medium'
                                                  ? 'bg-yellow-100 text-yellow-700'
                                                  : 'bg-red-100 text-red-700'
                                              }`}>
                                                {exercise.difficulty}
                                              </span>
                                              <span>{exercise.type}</span>
                                              <span>{exercise.estimatedTime}</span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                              View details
                                            </Button>
                                          </CollapsibleTrigger>
                                          <Button 
                                            variant="outline" 
                                            size="sm"
                                            onClick={() => toggleExerciseCompletion(exercise.id)}
                                          >
                                            {userProgress.completedExercises.includes(exercise.id) ? 'Mark incomplete' : 'Mark complete'}
                                          </Button>
                                        </div>
                                      </div>
                                      <CollapsibleContent className="px-4 pb-4">
                                        <div className="border-t pt-3 mt-1">
                                          <p className="text-sm">{exercise.description}</p>
                                        </div>
                                      </CollapsibleContent>
                                    </Collapsible>
                                  ))}
                                </div>
                              </div>
                            ) : null
                          ))}
                        </div>
                      </div>

                      {course.projects && course.projects.length > 0 && (
                        <div className="bg-background rounded-lg p-6 shadow-sm border">
                          <h3 className="text-xl font-semibold mb-4">Course Projects</h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            {course.projects.map((project, index) => (
                              <Card key={index} className="overflow-hidden">
                                <CardHeader className="pb-3">
                                  <div className="flex justify-between items-start">
                                    <CardTitle className="text-lg">{project.title}</CardTitle>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0 rounded-full"
                                      onClick={() => toggleProjectCompletion(project.id)}
                                    >
                                      {userProgress.completedProjects.includes(project.id) ? (
                                        <CheckCircle2 className="h-5 w-5 text-primary" />
                                      ) : (
                                        <CircleDashed className="h-5 w-5 text-muted-foreground" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="flex flex-wrap gap-2 text-xs">
                                    <span className={`px-2 py-1 rounded-full ${
                                      project.difficulty === 'beginner' 
                                        ? 'bg-green-100 text-green-700' 
                                        : project.difficulty === 'intermediate'
                                        ? 'bg-yellow-100 text-yellow-700'
                                        : 'bg-red-100 text-red-700'
                                    }`}>
                                      {project.difficulty}
                                    </span>
                                    <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground">
                                      {project.estimatedTime}
                                    </span>
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-sm text-muted-foreground">{project.description}</p>
                                  <div className="mt-3">
                                    <div className="text-xs text-muted-foreground mb-1">Skills:</div>
                                    <div className="flex flex-wrap gap-1">
                                      {project.skills.map((skill, skillIndex) => (
                                        <span 
                                          key={skillIndex} 
                                          className="inline-block px-2 py-1 bg-primary/10 text-xs text-primary rounded-full"
                                        >
                                          {skill}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="info" className="space-y-6">
                      <div className="bg-background rounded-lg p-6 shadow-sm border">
                        <h3 className="text-xl font-semibold mb-4">Course Introduction</h3>
                        <p className="text-muted-foreground">{course.introduction}</p>
                        
                        <h4 className="font-semibold mt-6 mb-3">Learning Objectives</h4>
                        <ul className="space-y-2">
                          {course.learningObjectives.map((objective, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-primary mt-0.5" />
                              <span>{objective}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {course.outcomes && (
                          <>
                            <h4 className="font-semibold mt-6 mb-3">What You'll Learn</h4>
                            <ul className="space-y-2">
                              {course.outcomes.map((outcome, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <Check className="h-5 w-5 text-primary mt-0.5" />
                                  <span>{outcome}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                      
                      {relatedSessions.length > 0 && (
                        <div className="bg-background rounded-lg p-6 shadow-sm border">
                          <h3 className="text-xl font-semibold mb-4">Related VIP Sessions</h3>
                          <div className="grid gap-4">
                            {relatedSessions.map((session, index) => (
                              <div key={index} className="flex flex-col md:flex-row gap-4 border rounded-lg p-4">
                                <div className="md:w-1/4 h-40 rounded-md overflow-hidden">
                                  <img 
                                    src={session.image} 
                                    alt={session.title} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="md:w-3/4 flex flex-col">
                                  <div className="flex-1">
                                    <div className="flex gap-2 mb-2">
                                      <span className="inline-block px-2 py-1 bg-primary/10 text-xs text-primary rounded-full">
                                        {session.category}
                                      </span>
                                      <span className="inline-block px-2 py-1 bg-muted text-xs text-muted-foreground rounded-full">
                                        {session.status}
                                      </span>
                                    </div>
                                    <h4 className="font-semibold text-lg">{session.title}</h4>
                                    <div className="text-sm text-muted-foreground mt-1">
                                      By {session.expert}, {session.expertRole}
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-3">
                                      <Calendar className="h-4 w-4" />
                                      <span>{session.date}</span>
                                    </div>
                                  </div>
                                  <div className="mt-4">
                                    <Button variant="outline" asChild>
                                      <Link to={`/vip-sessions/${session.id}`}>
                                        View details
                                      </Link>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              </div>

              <div className="lg:w-1/3 space-y-6">
                <div className="sticky top-28">
                  <div className="bg-background rounded-lg shadow-sm border overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 space-y-6">
                      <div className="flex items-baseline justify-between">
                        <div className="text-3xl font-bold">
                          {course.price === 'Free' ? 'Free' : course.price}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Button className="w-full">Enroll Now</Button>
                        <Button variant="outline" className="w-full">Add to Wishlist</Button>
                      </div>
                      
                      <div className="border-t pt-6 space-y-4">
                        <div className="space-y-2">
                          <div className="text-sm text-muted-foreground">Your Progress</div>
                          <div className="flex items-center justify-between">
                            <Progress value={progressPercentage} className="h-2" />
                            <span className="text-sm font-medium ml-2">{progressPercentage}%</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <div className="text-muted-foreground">Course Details</div>
                          </div>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between py-1">
                              <span className="text-muted-foreground">Level</span>
                              <span className="font-medium">{course.level}</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-muted-foreground">Duration</span>
                              <span className="font-medium">{course.duration}</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-muted-foreground">Lessons</span>
                              <span className="font-medium">{course.lessons}</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-muted-foreground">Enrolled</span>
                              <span className="font-medium">{course.students.toLocaleString()} students</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetail;


import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CurriculumModule from '@/components/curriculum/CurriculumModule';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

// Updated curriculum data organized by class
const curriculumData = {
  'Class 8': [
    {
      name: 'MS Word Fundamentals',
      description: 'Learn essential Microsoft Word skills for professional document creation',
      modules: 8,
      projects: 3,
      progress: 75,
      topics: [
        'Document formatting and styles',
        'Templates and themes',
        'Tables and graphs',
        'Mail merge',
        'Review and collaboration tools'
      ],
      weeks: [
        { weekNumber: 1, title: 'Document Basics', description: 'Introduction to MS Word interface and basic document creation' },
        { weekNumber: 2, title: 'Text Formatting', description: 'Text styles, fonts, paragraphs and page layout' },
        { weekNumber: 3, title: 'Advanced Features', description: 'Templates, references, collaboration tools' }
      ],
      image: '/lovable-uploads/02174cfd-bb30-416f-90c8-8968b3544810.png'
    },
    {
      name: 'MS Excel Essential Skills',
      description: 'Master spreadsheets, formulas, and data analysis techniques',
      modules: 10,
      projects: 4,
      progress: 45,
      topics: [
        'Spreadsheet organization',
        'Formulas and functions',
        'Data visualization',
        'Pivot tables',
        'Macros and automation basics'
      ],
      weeks: [
        { weekNumber: 1, title: 'Spreadsheet Fundamentals', description: 'Basic data entry, cell formatting and simple calculations' },
        { weekNumber: 2, title: 'Functions & Formulas', description: 'Using Excel functions for data analysis' },
        { weekNumber: 3, title: 'Data Analysis', description: 'Pivot tables, charts and conditional formatting' }
      ]
    },
    {
      name: 'HTML Basics',
      description: 'Introduction to HTML structure and elements',
      modules: 6,
      projects: 2,
      progress: 30,
      topics: [
        'HTML document structure',
        'Text elements and formatting',
        'Links and navigation',
        'Images and multimedia',
        'Semantic HTML'
      ],
      weeks: [
        { weekNumber: 1, title: 'HTML Foundations', description: 'Document structure and basic elements' },
        { weekNumber: 2, title: 'Building Pages', description: 'Creating simple web pages with HTML' },
        { weekNumber: 3, title: 'HTML5 Features', description: 'Modern HTML capabilities and best practices' }
      ]
    }
  ],
  'Class 9': [
    {
      name: 'MS Word Advanced',
      description: 'Advanced document creation and formatting techniques',
      modules: 7,
      projects: 3,
      progress: 50,
      topics: [
        'Advanced document formatting',
        'Complex templates',
        'Document automation',
        'Advanced mail merge',
        'Forms and fields'
      ],
      weeks: [
        { weekNumber: 1, title: 'Advanced Formatting', description: 'Custom styles, themes and formatting' },
        { weekNumber: 2, title: 'Document Automation', description: 'Macros and document automation techniques' },
        { weekNumber: 3, title: 'Integration Features', description: 'Connecting Word with other applications' }
      ]
    },
    {
      name: 'MS Excel Data Analysis',
      description: 'Advanced data analysis and visualization in Excel',
      modules: 9,
      projects: 4,
      progress: 35,
      topics: [
        'Advanced formulas and functions',
        'Data modeling',
        'Advanced charts and dashboards',
        'Data analysis tools',
        'Excel automation'
      ],
      weeks: [
        { weekNumber: 1, title: 'Advanced Excel Functions', description: 'Complex calculations and data manipulation' },
        { weekNumber: 2, title: 'Data Visualization', description: 'Creating effective charts and dashboards' },
        { weekNumber: 3, title: 'Excel Power Tools', description: 'Power Query, Power Pivot and advanced analytics' }
      ]
    },
    {
      name: 'HTML & CSS Fundamentals',
      description: 'Building structured web pages with HTML and CSS',
      modules: 8,
      projects: 3,
      progress: 25,
      topics: [
        'Advanced HTML elements',
        'CSS basics and styling',
        'Layout techniques',
        'Responsive design',
        'Web forms'
      ],
      weeks: [
        { weekNumber: 1, title: 'HTML & CSS Basics', description: 'Combining HTML with basic CSS styling' },
        { weekNumber: 2, title: 'Page Layout', description: 'Creating structured page layouts' },
        { weekNumber: 3, title: 'Responsive Design', description: 'Making websites work on all devices' }
      ]
    }
  ],
  'Class 10': [
    {
      name: 'HTML & CSS Complete',
      description: 'Comprehensive web development with HTML5 and CSS3',
      modules: 10,
      projects: 5,
      progress: 40,
      topics: [
        'HTML5 semantic elements',
        'CSS3 advanced features',
        'Flexbox and Grid layouts',
        'CSS animations',
        'Web accessibility'
      ],
      weeks: [
        { weekNumber: 1, title: 'Modern HTML5', description: 'Using semantic elements and modern HTML features' },
        { weekNumber: 2, title: 'CSS3 Techniques', description: 'Advanced styling and visual effects' },
        { weekNumber: 3, title: 'Layout Systems', description: 'Mastering Flexbox and CSS Grid' }
      ]
    },
    {
      name: 'Python Programming',
      description: 'Introduction to Python programming fundamentals',
      modules: 12,
      projects: 5,
      progress: 20,
      topics: [
        'Python syntax and data types',
        'Control flow and functions',
        'File handling and modules',
        'Basic data analysis',
        'Automation scripts'
      ],
      weeks: [
        { weekNumber: 1, title: 'Python Basics', description: 'Syntax, data types, and control structures' },
        { weekNumber: 2, title: 'Functions & Modules', description: 'Creating reusable code components' },
        { weekNumber: 3, title: 'Practical Python', description: 'Solving real-world problems with Python' }
      ]
    },
    {
      name: 'Web Development Essentials',
      description: 'Building interactive websites with HTML, CSS and JavaScript',
      modules: 10,
      projects: 4,
      progress: 15,
      topics: [
        'Website planning and structure',
        'Advanced CSS techniques',
        'JavaScript fundamentals',
        'Interactive elements',
        'Web design principles'
      ],
      weeks: [
        { weekNumber: 1, title: 'Web Technologies', description: 'Understanding how web technologies work together' },
        { weekNumber: 2, title: 'Adding Interactivity', description: 'Introduction to JavaScript for web pages' },
        { weekNumber: 3, title: 'Project Implementation', description: 'Building a complete interactive website' }
      ]
    }
  ],
  'Class 11': [
    {
      name: 'Python Advanced',
      description: 'Advanced Python programming concepts and applications',
      modules: 14,
      projects: 6,
      progress: 30,
      topics: [
        'Object-oriented programming',
        'Advanced functions and decorators',
        'APIs and web scraping',
        'Data analysis with pandas',
        'GUI applications'
      ],
      weeks: [
        { weekNumber: 1, title: 'OOP in Python', description: 'Classes, objects, and inheritance' },
        { weekNumber: 2, title: 'Advanced Python Features', description: 'Decorators, generators, and context managers' },
        { weekNumber: 3, title: 'Python Applications', description: 'Building real-world applications with Python' }
      ]
    },
    {
      name: 'HTML/CSS & JavaScript',
      description: 'Full-stack web development with modern technologies',
      modules: 12,
      projects: 5,
      progress: 25,
      topics: [
        'Advanced JavaScript',
        'DOM manipulation',
        'AJAX and fetch API',
        'Responsive frameworks',
        'Frontend optimization'
      ],
      weeks: [
        { weekNumber: 1, title: 'Modern JavaScript', description: 'ES6+ features and modern JavaScript techniques' },
        { weekNumber: 2, title: 'Dynamic Web Content', description: 'Creating interactive web applications' },
        { weekNumber: 3, title: 'Frontend Frameworks', description: 'Introduction to modern frontend libraries' }
      ]
    },
    {
      name: 'SQL Database Fundamentals',
      description: 'Introduction to database design and SQL',
      modules: 8,
      projects: 4,
      progress: 15,
      topics: [
        'Database design principles',
        'SQL query syntax',
        'Data manipulation and retrieval',
        'Joins and relationships',
        'Database optimization'
      ],
      weeks: [
        { weekNumber: 1, title: 'Database Concepts', description: 'Understanding relational databases and tables' },
        { weekNumber: 2, title: 'SQL Queries', description: 'SELECT statements, filtering, and data manipulation' },
        { weekNumber: 3, title: 'Advanced SQL', description: 'Joins, subqueries, and database design' }
      ]
    }
  ],
  'Class 12': [
    {
      name: 'Python for Data Science',
      description: 'Data analysis and machine learning with Python',
      modules: 15,
      projects: 6,
      progress: 10,
      topics: [
        'Data manipulation with pandas',
        'Data visualization with matplotlib',
        'Statistical analysis',
        'Machine learning basics',
        'Data science workflows'
      ],
      weeks: [
        { weekNumber: 1, title: 'Data Science Fundamentals', description: 'Introduction to data analysis workflow' },
        { weekNumber: 2, title: 'Python Data Libraries', description: 'Working with pandas, numpy, and matplotlib' },
        { weekNumber: 3, title: 'Machine Learning Intro', description: 'Basic ML concepts and implementations' }
      ]
    },
    {
      name: 'Modern Web Development',
      description: 'Advanced web development with modern frameworks',
      modules: 14,
      projects: 6,
      progress: 5,
      topics: [
        'Modern JavaScript frameworks',
        'Component-based architecture',
        'State management',
        'API integration',
        'Frontend testing'
      ],
      weeks: [
        { weekNumber: 1, title: 'Modern Frameworks', description: 'Working with React or similar libraries' },
        { weekNumber: 2, title: 'Building Applications', description: 'Creating complete web applications' },
        { weekNumber: 3, title: 'Production Deployment', description: 'Optimizing and deploying web apps' }
      ]
    },
    {
      name: 'Advanced SQL & Databases',
      description: 'Complex database operations and optimization',
      modules: 10,
      projects: 5,
      progress: 0,
      topics: [
        'Advanced SQL techniques',
        'Database normalization',
        'Stored procedures and functions',
        'Database security',
        'Performance optimization'
      ],
      weeks: [
        { weekNumber: 1, title: 'Advanced Database Concepts', description: 'Complex database design and operations' },
        { weekNumber: 2, title: 'Database Programming', description: 'Stored procedures, triggers, and functions' },
        { weekNumber: 3, title: 'Enterprise Databases', description: 'Scaling and securing database systems' }
      ]
    }
  ]
};

const Curriculum = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Get all modules for filtering
  const getAllModules = () => {
    const allModules: any[] = [];
    Object.entries(curriculumData).forEach(([className, modules]) => {
      modules.forEach(module => {
        allModules.push({
          ...module,
          className
        });
      });
    });
    return allModules;
  };

  // Filter modules based on search and active tab
  const getFilteredModules = () => {
    const allModules = getAllModules();
    
    return allModules.filter((module) => {
      const matchesSearch = module.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            module.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (activeTab === 'all') return matchesSearch;
      if (activeTab === 'office') return (module.name.includes('MS Word') || module.name.includes('MS Excel')) && matchesSearch;
      if (activeTab === 'programming') return (module.name.includes('Python') || module.name.includes('Web') || module.name.includes('HTML') || module.name.includes('SQL')) && matchesSearch;
      
      // Match by class
      return activeTab === module.className.toLowerCase().replace(' ', '') && matchesSearch;
    });
  };

  return (
    <div className="pt-20 md:pt-24">
      <Helmet>
        <title>Curriculum | SGK14 EdTech</title>
      </Helmet>
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Curriculum</h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive learning paths designed for students from Class 8 to 12
            </p>
          </div>

          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6">
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                <TabsList className="grid grid-cols-3 md:grid-cols-7">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="class8">Class 8</TabsTrigger>
                  <TabsTrigger value="class9">Class 9</TabsTrigger>
                  <TabsTrigger value="class10">Class 10</TabsTrigger>
                  <TabsTrigger value="class11">Class 11</TabsTrigger>
                  <TabsTrigger value="class12">Class 12</TabsTrigger>
                  <TabsTrigger value="office">Office</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="relative w-full md:w-64">
                <Input
                  placeholder="Search modules..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pr-10"
                />
                <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Display when filtering */}
          {(searchTerm || activeTab !== 'all') && (
            <div className="space-y-6 mb-10">
              {getFilteredModules().length > 0 ? (
                getFilteredModules().map((module, index) => (
                  <CurriculumModule
                    key={`${module.className}-${module.name}-${index}`}
                    name={module.name}
                    description={module.description}
                    modules={module.modules}
                    projects={module.projects}
                    topics={module.topics}
                    progress={module.progress}
                    weeks={module.weeks}
                    image={module.image}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No results found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter to find the module you're looking for.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Display by class when not filtering */}
          {!searchTerm && activeTab === 'all' && (
            <div className="space-y-12">
              {Object.entries(curriculumData).map(([className, modules]) => (
                <div key={className} className="border-t pt-8">
                  <h2 className="text-2xl font-bold mb-6">{className}</h2>
                  <div className="space-y-6">
                    {modules.map((module, index) => (
                      <CurriculumModule
                        key={`${className}-${index}`}
                        name={module.name}
                        description={module.description}
                        modules={module.modules}
                        projects={module.projects}
                        topics={module.topics}
                        progress={module.progress}
                        weeks={module.weeks}
                        image={module.image}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Curriculum;

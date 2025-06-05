
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CurriculumModule from '@/components/curriculum/CurriculumModule';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const curriculumData = {
  'Class 8-9': [
    {
      name: 'MS Office Suite',
      description: 'Complete Microsoft Office training covering Word, Excel, and PowerPoint for document creation, data analysis, and presentations',
      modules: 8,
      projects: 4,
      progress: 0,
      topics: [
        'MS Word - Document formatting and templates',
        'MS Excel - Spreadsheets, formulas, and charts', 
        'MS PowerPoint - Professional presentations',
        'File management and collaboration',
        'Advanced features and automation'
      ],
      weeks: [
        { weekNumber: 1, title: 'MS Word Fundamentals', description: 'Document creation, formatting, and professional templates' },
        { weekNumber: 2, title: 'MS Excel Essentials', description: 'Spreadsheet basics, formulas, and data visualization' },
        { weekNumber: 3, title: 'PowerPoint Mastery', description: 'Creating engaging presentations with animations and transitions' },
        { weekNumber: 4, title: 'Integration & Projects', description: 'Combining Office tools for comprehensive projects' }
      ],
      image: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Microsoft_Office_Word_%282019%E2%80%93present%29.svg'
    },
    {
      name: 'HTML - Web Design Basics',
      description: 'Introduction to web development fundamentals with HTML structure, elements, and basic webpage creation',
      modules: 6,
      projects: 3,
      progress: 0,
      topics: [
        'HTML document structure and syntax',
        'Text formatting and semantic elements',
        'Links, images, and multimedia',
        'Tables and forms basics',
        'Web accessibility principles'
      ],
      weeks: [
        { weekNumber: 1, title: 'HTML Foundations', description: 'Understanding web structure and basic HTML elements' },
        { weekNumber: 2, title: 'Content Creation', description: 'Adding text, images, and links to web pages' },
        { weekNumber: 3, title: 'Interactive Elements', description: 'Forms, tables, and user interaction basics' }
      ],
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg'
    },
    {
      name: 'Python Foundation',
      description: 'Programming fundamentals with Python covering basic syntax, data types, and problem-solving concepts',
      modules: 10,
      projects: 5,
      progress: 0,
      topics: [
        'Python syntax and variables',
        'Data types and basic operations',
        'Control structures (if/else, loops)',
        'Functions and basic algorithms',
        'Simple input/output programs'
      ],
      weeks: [
        { weekNumber: 1, title: 'Python Basics', description: 'Variables, data types, and basic operations' },
        { weekNumber: 2, title: 'Control Flow', description: 'Conditions, loops, and decision making' },
        { weekNumber: 3, title: 'Functions', description: 'Creating reusable code with functions' },
        { weekNumber: 4, title: 'Problem Solving', description: 'Building simple programs and games' }
      ],
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg'
    }
  ],
  'Class 10': [
    {
      name: 'HTML Intermediate',
      description: 'Advanced HTML concepts including semantic elements, forms, multimedia integration, and modern web standards',
      modules: 8,
      projects: 4,
      progress: 0,
      topics: [
        'HTML5 semantic elements',
        'Advanced form controls and validation',
        'Audio, video, and multimedia embedding',
        'Canvas and SVG basics',
        'Web standards and best practices'
      ],
      weeks: [
        { weekNumber: 1, title: 'Semantic HTML5', description: 'Modern HTML structure with semantic elements' },
        { weekNumber: 2, title: 'Advanced Forms', description: 'Complex form controls and client-side validation' },
        { weekNumber: 3, title: 'Multimedia Integration', description: 'Embedding audio, video, and interactive content' },
        { weekNumber: 4, title: 'Web Standards', description: 'Accessibility, SEO, and performance optimization' }
      ],
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg'
    },
    {
      name: 'CSS - Styling Introduction',
      description: 'Comprehensive CSS fundamentals covering selectors, properties, layouts, and visual design principles',
      modules: 10,
      projects: 5,
      progress: 0,
      topics: [
        'CSS syntax, selectors, and cascade',
        'Text styling and typography',
        'Colors, backgrounds, and borders',
        'Box model and spacing',
        'Basic animations and transitions'
      ],
      weeks: [
        { weekNumber: 1, title: 'CSS Fundamentals', description: 'Selectors, properties, and the cascade' },
        { weekNumber: 2, title: 'Typography & Colors', description: 'Text styling and color theory' },
        { weekNumber: 3, title: 'Layout Basics', description: 'Box model, positioning, and spacing' },
        { weekNumber: 4, title: 'Visual Effects', description: 'Animations, transitions, and decorative elements' }
      ],
      image: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg'
    },
    {
      name: 'Python Intermediate',
      description: 'Advanced Python programming with data structures, file handling, and real-world application development',
      modules: 12,
      projects: 6,
      progress: 0,
      topics: [
        'Lists, dictionaries, and tuples',
        'String manipulation and methods',
        'File input/output operations',
        'Exception handling',
        'Modules and libraries introduction'
      ],
      weeks: [
        { weekNumber: 1, title: 'Data Structures', description: 'Working with lists, dictionaries, and complex data' },
        { weekNumber: 2, title: 'File Operations', description: 'Reading, writing, and processing files' },
        { weekNumber: 3, title: 'Error Handling', description: 'Exception handling and debugging techniques' },
        { weekNumber: 4, title: 'Project Development', description: 'Building complete applications with Python' }
      ],
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg'
    }
  ],
  'Class 11-12': [
    {
      name: 'Advanced Python Programming',
      description: 'Master-level Python covering Object-Oriented Programming, file handling, GUI development, and advanced concepts',
      modules: 15,
      projects: 8,
      progress: 0,
      topics: [
        'Object-Oriented Programming (Classes, Objects, Inheritance)',
        'Advanced file handling and data processing',
        'GUI development with Tkinter',
        'Database connectivity and operations',
        'Web scraping and API integration',
        'Data analysis with pandas and matplotlib'
      ],
      weeks: [
        { weekNumber: 1, title: 'OOP Fundamentals', description: 'Classes, objects, inheritance, and polymorphism' },
        { weekNumber: 2, title: 'File & Data Processing', description: 'Advanced file operations and data manipulation' },
        { weekNumber: 3, title: 'GUI Development', description: 'Creating desktop applications with Tkinter' },
        { weekNumber: 4, title: 'Web & APIs', description: 'Web scraping and working with APIs' },
        { weekNumber: 5, title: 'Data Science Intro', description: 'Data analysis and visualization basics' }
      ],
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg'
    },
    {
      name: 'SQL Database Management',
      description: 'Complete database management with SQL covering queries, joins, database design, and advanced operations',
      modules: 12,
      projects: 6,
      progress: 0,
      topics: [
        'Database design and normalization',
        'SQL queries (SELECT, INSERT, UPDATE, DELETE)',
        'Joins (INNER, OUTER, LEFT, RIGHT)',
        'Aggregate functions and grouping',
        'Stored procedures and functions',
        'Database security and optimization'
      ],
      weeks: [
        { weekNumber: 1, title: 'Database Fundamentals', description: 'Database design, tables, and relationships' },
        { weekNumber: 2, title: 'Basic SQL Queries', description: 'SELECT statements, filtering, and sorting' },
        { weekNumber: 3, title: 'Advanced Queries', description: 'Joins, subqueries, and complex operations' },
        { weekNumber: 4, title: 'Database Programming', description: 'Stored procedures, functions, and triggers' }
      ],
      image: 'https://www.svgrepo.com/show/331760/sql-database-generic.svg'
    },
    {
      name: 'HTML/CSS Responsive Design',
      description: 'Advanced web design with responsive layouts, Flexbox, CSS Grid, and modern frontend development techniques',
      modules: 14,
      projects: 7,
      progress: 0,
      topics: [
        'Responsive design principles and mobile-first approach',
        'CSS Flexbox for flexible layouts',
        'CSS Grid for complex grid systems',
        'Media queries and breakpoints',
        'CSS frameworks and preprocessors',
        'Performance optimization and best practices'
      ],
      weeks: [
        { weekNumber: 1, title: 'Responsive Fundamentals', description: 'Mobile-first design and viewport concepts' },
        { weekNumber: 2, title: 'Flexbox Mastery', description: 'Creating flexible and adaptive layouts' },
        { weekNumber: 3, title: 'CSS Grid Systems', description: 'Advanced grid layouts and positioning' },
        { weekNumber: 4, title: 'Modern CSS', description: 'CSS variables, animations, and advanced techniques' },
        { weekNumber: 5, title: 'Framework Integration', description: 'Using CSS frameworks and build tools' }
      ],
      image: 'https://cdn-icons-png.flaticon.com/512/732/732190.png'
    }
  ]
};

const Curriculum = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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

  const getFilteredModules = () => {
    const allModules = getAllModules();
    
    return allModules.filter((module) => {
      const matchesSearch = module.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            module.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (activeTab === 'all') return matchesSearch;
      if (activeTab === 'foundation') return module.className === 'Class 8-9' && matchesSearch;
      if (activeTab === 'intermediate') return module.className === 'Class 10' && matchesSearch;
      if (activeTab === 'advanced') return module.className === 'Class 11-12' && matchesSearch;
      
      return matchesSearch;
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
                <TabsList className="grid grid-cols-2 md:grid-cols-4">
                  <TabsTrigger value="all">All Classes</TabsTrigger>
                  <TabsTrigger value="foundation">Class 8-9</TabsTrigger>
                  <TabsTrigger value="intermediate">Class 10</TabsTrigger>
                  <TabsTrigger value="advanced">Class 11-12</TabsTrigger>
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

          {!searchTerm && activeTab === 'all' && (
            <div className="space-y-12">
              {Object.entries(curriculumData).map(([className, modules]) => (
                <div key={className} className="border-t pt-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="text-primary">📚</span>
                    {className}
                  </h2>
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

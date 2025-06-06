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
      name: 'MS Office (MS Word, Excel, PowerPoint)',
      description: 'Master Microsoft Office Suite with comprehensive training in Word, Excel, and PowerPoint for professional document creation and presentations',
      modules: 8,
      projects: 4,
      progress: 0,
      topics: [
        '📝 MS Word: Text formatting, bullets & numbering, page layout, header-footer, tables, mail merge and templates',
        '📊 MS Excel: Cells, formulas, basic functions (SUM, AVERAGE, IF), charts and graphs, sorting/filtering, basic data entry',
        '🎯 PowerPoint: Slide design, transitions, animations, inserting multimedia, SmartArt and table presentation'
      ],
      exercises: [
        '🛠️ Create a formatted resume (MS Word)',
        '🛠️ Make a monthly budget (Excel)',
        '🛠️ Create a presentation on "My Dream Career" (PPT)'
      ],
      weeks: [
        { weekNumber: 1, title: 'MS Word Fundamentals', description: 'Text formatting, page layout, and professional document creation' },
        { weekNumber: 2, title: 'MS Excel Essentials', description: 'Spreadsheet basics, formulas, charts, and data management' },
        { weekNumber: 3, title: 'PowerPoint Mastery', description: 'Professional presentations with animations and multimedia' },
        { weekNumber: 4, title: 'Integration Project', description: 'Design a personal portfolio report using Word + Excel + PPT' }
      ],
      image: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Microsoft_Office_Word_%282019%E2%80%93present%29.svg'
    },
    {
      name: 'HTML (Basics of Web Design)',
      description: 'Foundation of web development with HTML structure, elements, and basic webpage creation for beginners',
      modules: 6,
      projects: 3,
      progress: 0,
      topics: [
        '🌐 HTML tags, elements, structure',
        '📄 Headings, paragraphs, lists',
        '🔗 Links, images, tables, forms',
        '📦 Inline vs block elements'
      ],
      exercises: [
        '🛠️ Create a simple profile webpage',
        '🛠️ Design a contact form using <form>, <input>, etc.',
        '🛠️ Use table to show your class schedule'
      ],
      weeks: [
        { weekNumber: 1, title: 'HTML Structure', description: 'Understanding HTML tags, elements, and basic structure' },
        { weekNumber: 2, title: 'Content Creation', description: 'Working with text, lists, links, and images' },
        { weekNumber: 3, title: 'Forms & Tables', description: 'Creating interactive forms and data tables' },
        { weekNumber: 4, title: 'First Website Project', description: 'Build "My First Website" with home, about, and contact pages' }
      ],
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg'
    },
    {
      name: 'Python (Foundation Level)',
      description: 'Programming fundamentals with Python covering basic syntax, control structures, and problem-solving concepts',
      modules: 10,
      projects: 5,
      progress: 0,
      topics: [
        '🐍 Variables, data types',
        '⚡ Operators, expressions',
        '🔀 if, else, elif (decision making)',
        '🔄 Loops: for, while',
        '🔧 Functions and input/output',
        '📝 Simple list and strings'
      ],
      exercises: [
        '🛠️ Calculator program',
        '🛠️ Number guessing game',
        '🛠️ Print multiplication tables using loops'
      ],
      weeks: [
        { weekNumber: 1, title: 'Python Basics', description: 'Variables, data types, and basic operations' },
        { weekNumber: 2, title: 'Control Flow', description: 'Decision making with if/else and loops' },
        { weekNumber: 3, title: 'Functions', description: 'Creating reusable code with functions' },
        { weekNumber: 4, title: 'Projects', description: 'Student Report Card Generator and Simple quiz app' }
      ],
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg'
    }
  ],
  'Class 10': [
    {
      name: 'HTML (Intermediate Level)',
      description: 'Advanced HTML concepts including semantic elements, form validation, multimedia integration, and responsive layout basics',
      modules: 8,
      projects: 4,
      progress: 0,
      topics: [
        '🏗️ Semantic HTML',
        '✅ Forms with validation',
        '📺 Embedding YouTube, maps',
        '📱 Responsive layout basics'
      ],
      exercises: [
        '🛠️ Create semantic webpage structure',
        '🛠️ Build forms with client-side validation',
        '🛠️ Embed multimedia content'
      ],
      weeks: [
        { weekNumber: 1, title: 'Semantic HTML5', description: 'Modern HTML structure with semantic elements' },
        { weekNumber: 2, title: 'Advanced Forms', description: 'Form validation and interactive elements' },
        { weekNumber: 3, title: 'Multimedia Integration', description: 'Embedding videos, maps, and audio' },
        { weekNumber: 4, title: 'School Website Project', description: 'Design a complete School Website (Home, Gallery, Contact)' }
      ],
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg'
    },
    {
      name: 'CSS (Introduction to Styling)',
      description: 'Comprehensive CSS fundamentals covering selectors, box model, colors, and basic layout techniques including Flexbox',
      modules: 10,
      projects: 5,
      progress: 0,
      topics: [
        '🎨 CSS Syntax, selectors, properties',
        '📦 Box model, margins/padding',
        '🌈 Colors, gradients, borders',
        '📐 Flexbox & positioning basics'
      ],
      exercises: [
        '🛠️ Style your HTML resume',
        '🛠️ Create color themes using CSS',
        '🛠️ Build responsive card layouts'
      ],
      weeks: [
        { weekNumber: 1, title: 'CSS Fundamentals', description: 'Syntax, selectors, and basic properties' },
        { weekNumber: 2, title: 'Box Model & Colors', description: 'Layout fundamentals and color theory' },
        { weekNumber: 3, title: 'Flexbox Basics', description: 'Modern layout with Flexbox' },
        { weekNumber: 4, title: 'Portfolio Project', description: 'Personal Portfolio Website using HTML + CSS' }
      ],
      image: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg'
    },
    {
      name: 'Python (Intermediate Level)',
      description: 'Advanced Python programming with data structures, file operations, and modular programming concepts',
      modules: 12,
      projects: 6,
      progress: 0,
      topics: [
        '📋 Lists, tuples, dictionaries',
        '📁 File handling',
        '🔧 Functions (with arguments, return)',
        '📚 Simple modules and libraries (math, random)'
      ],
      exercises: [
        '🛠️ Create a marksheet from user input',
        '🛠️ Word counter for a paragraph',
        '🛠️ File operations with text processing'
      ],
      weeks: [
        { weekNumber: 1, title: 'Data Structures', description: 'Working with lists, tuples, and dictionaries' },
        { weekNumber: 2, title: 'File Operations', description: 'Reading, writing, and processing files' },
        { weekNumber: 3, title: 'Advanced Functions', description: 'Functions with parameters and modules' },
        { weekNumber: 4, title: 'Management System', description: 'Build a Student Management CLI App' }
      ],
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg'
    }
  ],
  'Class 11-12': [
    {
      name: 'Advanced Python (OOP, File Handling, GUI)',
      description: 'Master-level Python covering Object-Oriented Programming, GUI development, API integration, and advanced programming concepts',
      modules: 15,
      projects: 8,
      progress: 0,
      topics: [
        '🏗️ Object-Oriented Programming (OOP)',
        '👥 Classes & objects',
        '🔄 Inheritance, polymorphism',
        '⚠️ Exception handling',
        '🖥️ Intro to GUI using tkinter',
        '🌐 Working with APIs (basic)'
      ],
      exercises: [
        '🛠️ Build a class for Bank Account',
        '🛠️ Handle divide-by-zero exception',
        '🛠️ Create simple GUI applications'
      ],
      weeks: [
        { weekNumber: 1, title: 'OOP Fundamentals', description: 'Classes, objects, inheritance, and polymorphism' },
        { weekNumber: 2, title: 'Error Handling', description: 'Exception handling and debugging techniques' },
        { weekNumber: 3, title: 'GUI Development', description: 'Creating desktop applications with tkinter' },
        { weekNumber: 4, title: 'API Integration', description: 'Working with external APIs and data' },
        { weekNumber: 5, title: 'Major Projects', description: 'Weather App using API (Class 12) & GUI-based To-Do List (Class 11)' }
      ],
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg'
    },
    {
      name: 'SQL (Database Basics)',
      description: 'Complete database management with SQL covering database design, queries, joins, and database management systems',
      modules: 12,
      projects: 6,
      progress: 0,
      topics: [
        '🗃️ Introduction to DBMS',
        '⚡ SQL commands: CREATE, INSERT, UPDATE, DELETE',
        '🔍 SELECT, WHERE, ORDER BY, GROUP BY',
        '🔗 Joins and subqueries (basic)',
        '📋 Data types and constraints'
      ],
      exercises: [
        '🛠️ Create student database',
        '🛠️ Query marks greater than 90',
        '🛠️ Use joins to merge student & subject tables'
      ],
      weeks: [
        { weekNumber: 1, title: 'Database Fundamentals', description: 'Introduction to DBMS and database design' },
        { weekNumber: 2, title: 'Basic SQL Commands', description: 'CREATE, INSERT, UPDATE, DELETE operations' },
        { weekNumber: 3, title: 'Advanced Queries', description: 'SELECT with WHERE, ORDER BY, GROUP BY' },
        { weekNumber: 4, title: 'Joins & Project', description: 'Table joins and Student Database Management System (CRUD + Report)' }
      ],
      image: 'https://www.svgrepo.com/show/331760/sql-database-generic.svg'
    },
    {
      name: 'HTML/CSS (Advanced Responsive Design)',
      description: 'Advanced web design with responsive layouts, CSS Grid, Flexbox, animations, and modern frontend development techniques',
      modules: 14,
      projects: 7,
      progress: 0,
      topics: [
        '📱 Responsive design using media queries',
        '📐 CSS Flexbox and Grid layout systems',
        '✨ CSS animations and transitions',
        '🎵 HTML5 multimedia elements (audio, video)'
      ],
      exercises: [
        '🛠️ Build a pricing table layout using Flexbox',
        '🛠️ Create a fully responsive mobile navigation bar',
        '🛠️ CSS Grid photo gallery'
      ],
      weeks: [
        { weekNumber: 1, title: 'Responsive Design', description: 'Media queries and mobile-first approach' },
        { weekNumber: 2, title: 'Flexbox Mastery', description: 'Advanced Flexbox layouts and components' },
        { weekNumber: 3, title: 'CSS Grid Systems', description: 'Complex layouts with CSS Grid' },
        { weekNumber: 4, title: 'Animations & Multimedia', description: 'CSS animations and HTML5 media elements' }
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
                    exercises={module.exercises}
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
                    <span className="text-primary">
                      {className === 'Class 8-9' ? '👩‍🏫' : className === 'Class 10' ? '🎓' : '🎓'}
                    </span>
                    {className} Curriculum
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
                        exercises={module.exercises}
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

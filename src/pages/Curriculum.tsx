import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import CurriculumModule from '@/components/curriculum/CurriculumModule';
import { BookOpen, Search, Download, Play, BookmarkPlus, ChevronRight } from 'lucide-react';

// Enhanced curriculum data with more detailed information
const curriculumData = [
  {
    grade: '8',
    subjects: [
      { 
        name: 'MS Word', 
        description: 'Learn document creation, formatting, and advanced features of MS Word.',
        modules: 12,
        projects: 5,
        progress: 75,
        topics: ['Document Formatting', 'Tables & Lists', 'Graphics & Charts', 'Mail Merge'],
        weeks: [
          { weekNumber: 1, title: 'Introduction to Word', description: 'Interface, basic formatting, saving documents' },
          { weekNumber: 2, title: 'Text Formatting', description: 'Fonts, paragraphs, styles, headers and footers' },
          { weekNumber: 3, title: 'Lists & Tables', description: 'Creating and formatting tables, bullets and numbering' }
        ]
      },
      { 
        name: 'MS Excel', 
        description: 'Master spreadsheets, formulas, and data analysis with Excel.',
        modules: 10,
        projects: 4,
        progress: 60,
        topics: ['Formulas & Functions', 'Charts & Graphs', 'Data Analysis', 'PivotTables'],
        weeks: [
          { weekNumber: 1, title: 'Excel Basics', description: 'Interface, data entry, basic formulas' },
          { weekNumber: 2, title: 'Functions', description: 'Mathematical, logical, and text functions' },
          { weekNumber: 3, title: 'Charts & Visualization', description: 'Creating and formatting charts and graphs' }
        ]
      },
      { 
        name: 'HTML & CSS Basics', 
        description: 'Introduction to web development with HTML and CSS fundamentals.',
        modules: 8,
        projects: 3,
        progress: 40,
        topics: ['HTML Structure', 'CSS Styling', 'Forms', 'Responsive Design'],
        weeks: [
          { weekNumber: 1, title: 'HTML Fundamentals', description: 'Structure, tags, elements, attributes' },
          { weekNumber: 2, title: 'CSS Introduction', description: 'Selectors, properties, styling text and elements' },
          { weekNumber: 3, title: 'Layouts', description: 'Box model, positioning, flexbox basics' }
        ]
      },
      { 
        name: 'Python Basics', 
        description: 'Begin your programming journey with Python fundamentals.',
        modules: 10,
        projects: 4,
        progress: 30,
        topics: ['Data Types', 'Control Flow', 'Functions', 'File I/O'],
        weeks: [
          { weekNumber: 1, title: 'Python Introduction', description: 'Installation, syntax, variables, data types' },
          { weekNumber: 2, title: 'Control Structures', description: 'If statements, loops, logical operators' },
          { weekNumber: 3, title: 'Functions & Modules', description: 'Creating functions, parameters, return values' }
        ]
      }
    ]
  },
  {
    grade: '9',
    subjects: [
      { 
        name: 'MS Word Advanced', 
        description: 'Advanced document formatting, mail merge, and automation in Word.',
        modules: 12,
        projects: 5,
        progress: 20,
        topics: ['Advanced Formatting', 'Templates', 'Macros', 'Collaborative Editing'],
        weeks: [
          { weekNumber: 1, title: 'Document Automation', description: 'Templates, styles, themes, building blocks' },
          { weekNumber: 2, title: 'Mail Merge', description: 'Creating letters, envelopes, labels with data sources' },
          { weekNumber: 3, title: 'Advanced Features', description: 'Macros, forms, document protection' }
        ]
      },
      { 
        name: 'MS Excel Advanced', 
        description: 'Advanced data analysis, PivotTables, and visualization in Excel.',
        modules: 12,
        projects: 5,
        progress: 15,
        topics: ['Advanced Functions', 'Data Validation', 'What-If Analysis', 'Dashboards'],
        weeks: [
          { weekNumber: 1, title: 'Advanced Functions', description: 'VLOOKUP, INDEX, MATCH, array formulas' },
          { weekNumber: 2, title: 'Data Analysis', description: 'Sorting, filtering, PivotTables, data models' },
          { weekNumber: 3, title: 'Visualization', description: 'Advanced charts, dashboards, conditional formatting' }
        ]
      },
      { 
        name: 'Web Development', 
        description: 'Build responsive websites with HTML, CSS, and JavaScript basics.',
        modules: 15,
        projects: 6,
        progress: 10,
        topics: ['JavaScript Basics', 'DOM Manipulation', 'Responsive Design', 'Web Forms'],
        weeks: [
          { weekNumber: 1, title: 'Advanced HTML & CSS', description: 'Semantic HTML, CSS frameworks, layouts' },
          { weekNumber: 2, title: 'JavaScript Introduction', description: 'Syntax, variables, functions, events' },
          { weekNumber: 3, title: 'DOM Manipulation', description: 'Selecting elements, modifying content, event handling' }
        ]
      },
      { 
        name: 'Python Programming', 
        description: 'Develop programs with Python including data structures and algorithms.',
        modules: 14,
        projects: 5,
        progress: 5,
        topics: ['Data Structures', 'OOP Concepts', 'Error Handling', 'Modules & Packages'],
        weeks: [
          { weekNumber: 1, title: 'Data Structures', description: 'Lists, tuples, dictionaries, sets' },
          { weekNumber: 2, title: 'Object-Oriented Programming', description: 'Classes, objects, inheritance, polymorphism' },
          { weekNumber: 3, title: 'Modules & Packages', description: 'Creating modules, importing, pip, virtual environments' }
        ]
      },
      { 
        name: 'SQL Basics', 
        description: 'Introduction to databases and SQL query language.',
        modules: 8,
        projects: 3,
        progress: 0,
        topics: ['Database Design', 'SQL Queries', 'Data Manipulation', 'Joins & Relationships'],
        weeks: [
          { weekNumber: 1, title: 'Database Concepts', description: 'Tables, fields, records, relationships' },
          { weekNumber: 2, title: 'Basic SQL', description: 'SELECT, WHERE, ORDER BY, GROUP BY' },
          { weekNumber: 3, title: 'Data Manipulation', description: 'INSERT, UPDATE, DELETE, constraints' }
        ]
      }
    ]
  },
  {
    grade: '10',
    subjects: [
      { 
        name: 'MS Office Suite', 
        description: 'Comprehensive mastery of Word, Excel, PowerPoint, and Access.',
        modules: 20,
        projects: 8,
        progress: 0,
        topics: ['Integration', 'PowerPoint', 'Access Database', 'Office Automation'],
        weeks: [
          { weekNumber: 1, title: 'Office Integration', description: 'Working with multiple Office applications' },
          { weekNumber: 2, title: 'PowerPoint Mastery', description: 'Advanced presentations, animations, multimedia' },
          { weekNumber: 3, title: 'Access Introduction', description: 'Database creation, tables, queries, forms' }
        ]
      },
      { 
        name: 'Full Stack Development', 
        description: 'Build complete web applications with frontend and backend technologies.',
        modules: 24,
        projects: 10,
        progress: 0,
        topics: ['Frontend Frameworks', 'Backend Basics', 'APIs', 'Database Integration'],
        weeks: [
          { weekNumber: 1, title: 'Frontend Frameworks', description: 'Introduction to React, components, state' },
          { weekNumber: 2, title: 'Backend Concepts', description: 'Node.js basics, Express.js, routing' },
          { weekNumber: 3, title: 'APIs & Integration', description: 'RESTful APIs, fetch, axios, connecting frontend and backend' }
        ]
      },
      { 
        name: 'Python for Data Analysis', 
        description: 'Use Python libraries for data analysis and visualization.',
        modules: 16,
        projects: 6,
        progress: 0,
        topics: ['NumPy', 'Pandas', 'Data Visualization', 'Statistical Analysis'],
        weeks: [
          { weekNumber: 1, title: 'NumPy & Arrays', description: 'N-dimensional arrays, vectorized operations' },
          { weekNumber: 2, title: 'Pandas Fundamentals', description: 'DataFrames, Series, data cleaning, transformation' },
          { weekNumber: 3, title: 'Data Visualization', description: 'Matplotlib, Seaborn, creating charts and graphs' }
        ]
      },
      { 
        name: 'Database Management', 
        description: 'Design and query databases with SQL and database management principles.',
        modules: 14,
        projects: 5,
        progress: 0,
        topics: ['Advanced SQL', 'Normalization', 'Transactions', 'Performance Optimization'],
        weeks: [
          { weekNumber: 1, title: 'Advanced SQL', description: 'Joins, subqueries, views, stored procedures' },
          { weekNumber: 2, title: 'Database Design', description: 'Normalization, ER diagrams, relationships' },
          { weekNumber: 3, title: 'Transactions & Security', description: 'ACID properties, access control, backup' }
        ]
      },
      { 
        name: 'AI & Machine Learning Intro', 
        description: 'Introduction to AI concepts and basic machine learning with Python.',
        modules: 10,
        projects: 3,
        progress: 0,
        topics: ['AI Concepts', 'Supervised Learning', 'Unsupervised Learning', 'Model Evaluation'],
        weeks: [
          { weekNumber: 1, title: 'AI Foundations', description: 'History, types of AI, applications, ethics' },
          { weekNumber: 2, title: 'Introduction to ML', description: 'Supervised vs unsupervised learning, scikit-learn' },
          { weekNumber: 3, title: 'Basic ML Models', description: 'Linear regression, classification, clustering' }
        ]
      }
    ]
  },
  {
    grade: '11',
    subjects: [
      { 
        name: 'Advanced Programming', 
        description: 'Advanced programming concepts, data structures, and algorithms.',
        modules: 18,
        projects: 7,
        progress: 0,
        topics: ['Algorithms', 'Data Structures', 'Problem Solving', 'Software Design'],
        weeks: [
          { weekNumber: 1, title: 'Advanced Data Structures', description: 'Trees, graphs, hash tables, heaps' },
          { weekNumber: 2, title: 'Algorithm Design', description: 'Sorting, searching, recursion, dynamic programming' },
          { weekNumber: 3, title: 'Software Design', description: 'Design patterns, SOLID principles, clean code' }
        ]
      },
      { 
        name: 'Data Science Fundamentals', 
        description: 'Data analysis, visualization, and introduction to machine learning.',
        modules: 16,
        projects: 6,
        progress: 0,
        topics: ['Data Wrangling', 'Statistical Analysis', 'Machine Learning', 'Data Projects'],
        weeks: [
          { weekNumber: 1, title: 'Data Pipeline', description: 'Data collection, cleaning, transformation' },
          { weekNumber: 2, title: 'Statistical Analysis', description: 'Descriptive statistics, hypothesis testing' },
          { weekNumber: 3, title: 'ML Fundamentals', description: 'Regression, classification, validation techniques' }
        ]
      },
      { 
        name: 'SQL Advanced', 
        description: 'Advanced database queries, optimization, and administration.',
        modules: 12,
        projects: 5,
        progress: 0,
        topics: ['Query Optimization', 'Indexes', 'Stored Procedures', 'Database Administration'],
        weeks: [
          { weekNumber: 1, title: 'Performance Optimization', description: 'Query plans, indexes, optimization techniques' },
          { weekNumber: 2, title: 'Programmatic SQL', description: 'Stored procedures, functions, triggers' },
          { weekNumber: 3, title: 'Database Administration', description: 'Backup, recovery, security, monitoring' }
        ]
      },
      { 
        name: 'Prompt Engineering', 
        description: 'Master the art of crafting effective prompts for AI tools and systems.',
        modules: 8,
        projects: 4,
        progress: 0,
        topics: ['AI Interaction', 'Prompt Design', 'ChatGPT', 'DALL-E'],
        weeks: [
          { weekNumber: 1, title: 'AI Systems', description: 'Understanding language models, capabilities, limitations' },
          { weekNumber: 2, title: 'Effective Prompting', description: 'Structure, clarity, constraints, instructions' },
          { weekNumber: 3, title: 'Advanced Techniques', description: 'Chain of thought, few-shot learning, specialized domains' }
        ]
      }
    ]
  },
  {
    grade: '12',
    subjects: [
      { 
        name: 'Professional Development', 
        description: 'Resume building, interview preparation, and career planning.',
        modules: 12,
        projects: 5,
        progress: 0,
        topics: ['Resume Writing', 'Interview Skills', 'LinkedIn Optimization', 'Career Planning'],
        weeks: [
          { weekNumber: 1, title: 'Resume Building', description: 'Creating ATS-friendly resumes, highlighting skills' },
          { weekNumber: 2, title: 'Interview Preparation', description: 'Common questions, STAR method, technical interviews' },
          { weekNumber: 3, title: 'Professional Presence', description: 'LinkedIn profile, networking, personal branding' }
        ]
      },
      { 
        name: 'Advanced Project Work', 
        description: 'Capstone projects based on student interests and career goals.',
        modules: 10,
        projects: 1,
        progress: 0,
        topics: ['Project Planning', 'Implementation', 'Documentation', 'Presentation'],
        weeks: [
          { weekNumber: 1, title: 'Project Selection', description: 'Defining scope, requirements, objectives' },
          { weekNumber: 2, title: 'Development Phase', description: 'Implementation, testing, iteration' },
          { weekNumber: 3, title: 'Documentation & Presentation', description: 'Creating documentation, presenting results' }
        ]
      },
      { 
        name: 'AI Tools Mastery', 
        description: 'Leverage AI tools for productivity, content creation, and problem-solving.',
        modules: 14,
        projects: 6,
        progress: 0,
        topics: ['Productivity Tools', 'Content Creation', 'Coding Assistance', 'AI Ethics'],
        weeks: [
          { weekNumber: 1, title: 'AI Productivity Suite', description: 'Note-taking, summarization, research tools' },
          { weekNumber: 2, title: 'Content Creation', description: 'Image generation, text creation, editing tools' },
          { weekNumber: 3, title: 'Specialized Tools', description: 'Coding assistants, data analysis, domain-specific AI' }
        ]
      },
      { 
        name: 'Data Science & Analytics', 
        description: 'Advanced data analysis, machine learning, and data visualization.',
        modules: 16,
        projects: 6,
        progress: 0,
        topics: ['Advanced ML', 'Deep Learning', 'Data Visualization', 'Big Data'],
        weeks: [
          { weekNumber: 1, title: 'Advanced ML', description: 'Ensemble methods, feature engineering, hyperparameter tuning' },
          { weekNumber: 2, title: 'Deep Learning Basics', description: 'Neural networks, TensorFlow/PyTorch introduction' },
          { weekNumber: 3, title: 'Applied Data Science', description: 'End-to-end projects, industry applications' }
        ]
      }
    ]
  }
];

// Recommendations based on subject
const moduleRecommendations = {
  "MS Word": ["MS Excel", "MS Office Suite", "Professional Development"],
  "MS Excel": ["MS Word", "Data Science Fundamentals", "SQL Basics"],
  "HTML & CSS Basics": ["Web Development", "Full Stack Development", "JavaScript"],
  "Python Basics": ["Python Programming", "Data Science Fundamentals", "AI & Machine Learning Intro"],
  "SQL Basics": ["Database Management", "SQL Advanced", "Data Science Fundamentals"],
  "Prompt Engineering": ["AI Tools Mastery", "AI & Machine Learning Intro", "Professional Development"],
  "Professional Development": ["AI Tools Mastery", "Prompt Engineering", "Advanced Project Work"],
  "default": ["Python Basics", "MS Office Suite", "Professional Development"]
};

const Curriculum = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('8');
  
  // Filter subjects based on search query
  const filteredSubjects = curriculumData.find(grade => grade.grade === activeTab)?.subjects.filter(
    subject => subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               subject.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Get recommendations based on the first subject in current view
  const getRecommendations = () => {
    if (filteredSubjects.length === 0) return moduleRecommendations.default;
    
    const firstSubject = filteredSubjects[0].name;
    // Find recommendations for this subject or use default
    const subjectKey = Object.keys(moduleRecommendations).find(key => firstSubject.includes(key));
    return subjectKey ? moduleRecommendations[subjectKey] : moduleRecommendations.default;
  };
  
  const recommendations = getRecommendations();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <section className="py-12">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                Interactive Learning Path
              </h1>
              <p className="text-muted-foreground text-lg mb-6">
                Explore our comprehensive curriculum with structured modules tailored for grade 8-12 students.
                Complete lessons, track your progress, and build in-demand skills.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <Button variant="outline" size="sm" className="gap-2">
                  <Download size={16} />
                  Offline Mode
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <BookmarkPlus size={16} />
                  Bookmarks
                </Button>
                <Button size="sm" className="gap-2">
                  <Play size={16} />
                  Watch Introduction
                </Button>
              </div>
              
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  type="search"
                  placeholder="Search for subjects or topics..."
                  className="pl-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <Tabs 
              defaultValue="8" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full">
              <TabsList className="grid grid-cols-5 w-full max-w-2xl mx-auto mb-8">
                {curriculumData.map((grade) => (
                  <TabsTrigger key={grade.grade} value={grade.grade}>
                    Class {grade.grade}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {curriculumData.map((grade) => (
                <TabsContent key={grade.grade} value={grade.grade} className="mt-6">
                  <h2 className="text-2xl font-bold mb-3 text-center">
                    Class {grade.grade} Learning Path
                  </h2>
                  <p className="text-center text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Structured learning modules with hands-on projects to help you master essential skills.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {filteredSubjects.length > 0 ? (
                      filteredSubjects.map((subject, index) => (
                        <CurriculumModule
                          key={index}
                          name={subject.name}
                          description={subject.description}
                          modules={subject.modules}
                          projects={subject.projects}
                          progress={subject.progress}
                          topics={subject.topics}
                          weeks={subject.weeks}
                        />
                      ))
                    ) : (
                      <div className="col-span-2 text-center py-10">
                        <h3 className="text-xl font-semibold mb-2">No modules found</h3>
                        <p className="text-muted-foreground">
                          Try adjusting your search query or explore other grade levels.
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {/* Recommendations Section */}
                  {filteredSubjects.length > 0 && (
                    <div className="mt-12 bg-primary/5 rounded-2xl p-6 mb-8">
                      <h3 className="text-xl font-semibold mb-4">Recommended Next Steps</h3>
                      <p className="text-muted-foreground mb-6">
                        Based on your current modules, we recommend exploring these related subjects:
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {recommendations.map((rec, index) => (
                          <Button key={index} variant="outline" className="justify-between" asChild>
                            <Link to={`/module/${rec.toLowerCase().replace(/\s+/g, '-')}`}>
                              {rec}
                              <ChevronRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-12 text-center">
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <Button size="lg" asChild>
                        <Link to="/signup">
                          Start Free Trial
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="lg" asChild>
                        <Link to="/contact">Contact an Advisor</Link>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Curriculum;


import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CurriculumModule from '@/components/curriculum/CurriculumModule';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

// Mock curriculum data
const curriculumData = [
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
    name: 'Web Development Essentials',
    description: 'Introduction to HTML, CSS, and basic web programming concepts',
    modules: 12,
    projects: 5,
    progress: 20,
    topics: [
      'HTML structure and elements',
      'CSS styling and layouts',
      'Responsive design principles',
      'JavaScript fundamentals',
      'Web accessibility'
    ],
    weeks: [
      { weekNumber: 1, title: 'HTML Basics', description: 'Structure, elements, and semantic markup' },
      { weekNumber: 2, title: 'CSS Styling', description: 'Selectors, properties, and responsive design' },
      { weekNumber: 3, title: 'Interactive Elements', description: 'Introduction to JavaScript and dynamic content' }
    ]
  },
  {
    name: 'Python Programming',
    description: 'Learn Python programming fundamentals for data analysis and automation',
    modules: 15,
    projects: 6,
    progress: 10,
    topics: [
      'Python syntax and data types',
      'Control flow and functions',
      'File handling and modules',
      'Data analysis with pandas',
      'Automation scripts'
    ],
    weeks: [
      { weekNumber: 1, title: 'Python Basics', description: 'Syntax, data types, and control structures' },
      { weekNumber: 2, title: 'Functions & Modules', description: 'Creating reusable code components' },
      { weekNumber: 3, title: 'Data Manipulation', description: 'Working with files and data processing' }
    ]
  },
  {
    name: 'SQL Database Fundamentals',
    description: 'Master database querying and management with SQL',
    modules: 8,
    projects: 4,
    progress: 5,
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
  },
  {
    name: 'AI Tools for Productivity',
    description: 'Leverage AI tools to enhance workplace efficiency and productivity',
    modules: 6,
    projects: 3,
    progress: 0,
    topics: [
      'AI assistants and chatbots',
      'Content generation tools',
      'Data analysis with AI',
      'Image and media creation',
      'AI for process automation'
    ],
    weeks: [
      { weekNumber: 1, title: 'AI Fundamentals', description: 'Understanding AI capabilities and limitations' },
      { weekNumber: 2, title: 'Productivity Tools', description: 'Using AI for content creation and analysis' },
      { weekNumber: 3, title: 'Workflow Integration', description: 'Incorporating AI tools into daily work routines' }
    ]
  },
  {
    name: 'Prompt Engineering',
    description: 'Master the art of crafting effective prompts for AI systems',
    modules: 5,
    projects: 2,
    progress: 0,
    topics: [
      'Prompt structure and clarity',
      'Context setting techniques',
      'Iterative refinement process',
      'Domain-specific prompting',
      'Ethical considerations'
    ],
    weeks: [
      { weekNumber: 1, title: 'Prompt Basics', description: 'Understanding how AI interprets instructions' },
      { weekNumber: 2, title: 'Advanced Techniques', description: 'Creating clear, effective prompts for complex tasks' },
      { weekNumber: 3, title: 'Application & Ethics', description: 'Real-world applications and responsible use' }
    ]
  }
];

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

  const filteredModules = curriculumData.filter((module) => {
    const matchesSearch = module.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          module.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'office') return (module.name.includes('MS Word') || module.name.includes('MS Excel')) && matchesSearch;
    if (activeTab === 'programming') return (module.name.includes('Python') || module.name.includes('Web') || module.name.includes('SQL')) && matchesSearch;
    if (activeTab === 'ai') return (module.name.includes('AI') || module.name.includes('Prompt')) && matchesSearch;
    
    return false;
  });

  return (
    <div className="pt-20 md:pt-24">
      <Helmet>
        <title>Curriculum | SGK14 EdTech</title>
      </Helmet>
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Curriculum</h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive learning paths designed to build practical skills for today's workplace
            </p>
          </div>

          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6">
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                <TabsList className="grid grid-cols-2 md:grid-cols-4">
                  <TabsTrigger value="all">All Modules</TabsTrigger>
                  <TabsTrigger value="office">Office Skills</TabsTrigger>
                  <TabsTrigger value="programming">Programming</TabsTrigger>
                  <TabsTrigger value="ai">AI & Tools</TabsTrigger>
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

          <div className="space-y-6">
            {filteredModules.length > 0 ? (
              filteredModules.map((module, index) => (
                <CurriculumModule
                  key={index}
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
        </div>
      </main>
    </div>
  );
};

export default Curriculum;

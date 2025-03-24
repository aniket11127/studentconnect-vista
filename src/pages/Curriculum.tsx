
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, FileText, Code, Database, Play, Award, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Grade level data structure
const gradeData = [
  {
    grade: '8',
    subjects: [
      { 
        name: 'MS Word', 
        icon: FileText, 
        description: 'Learn document creation, formatting, and advanced features of MS Word.',
        modules: 12,
        projects: 5
      },
      { 
        name: 'MS Excel', 
        icon: FileText, 
        description: 'Master spreadsheets, formulas, and data analysis with Excel.',
        modules: 10,
        projects: 4
      },
      { 
        name: 'HTML & CSS Basics', 
        icon: Code, 
        description: 'Introduction to web development with HTML and CSS fundamentals.',
        modules: 8,
        projects: 3
      },
      { 
        name: 'Python Basics', 
        icon: Code, 
        description: 'Begin your programming journey with Python fundamentals.',
        modules: 10,
        projects: 4
      }
    ]
  },
  {
    grade: '9',
    subjects: [
      { 
        name: 'MS Word Advanced', 
        icon: FileText, 
        description: 'Advanced document formatting, mail merge, and automation in Word.',
        modules: 12,
        projects: 5
      },
      { 
        name: 'MS Excel Advanced', 
        icon: FileText, 
        description: 'Advanced data analysis, PivotTables, and visualization in Excel.',
        modules: 12,
        projects: 5
      },
      { 
        name: 'Web Development', 
        icon: Code, 
        description: 'Build responsive websites with HTML, CSS, and JavaScript basics.',
        modules: 15,
        projects: 6
      },
      { 
        name: 'Python Programming', 
        icon: Code, 
        description: 'Develop programs with Python including data structures and algorithms.',
        modules: 14,
        projects: 5
      },
      { 
        name: 'SQL Basics', 
        icon: Database, 
        description: 'Introduction to databases and SQL query language.',
        modules: 8,
        projects: 3
      }
    ]
  },
  {
    grade: '10',
    subjects: [
      { 
        name: 'MS Office Suite', 
        icon: FileText, 
        description: 'Comprehensive mastery of Word, Excel, PowerPoint, and Access.',
        modules: 20,
        projects: 8
      },
      { 
        name: 'Full Stack Development', 
        icon: Code, 
        description: 'Build complete web applications with frontend and backend technologies.',
        modules: 24,
        projects: 10
      },
      { 
        name: 'Python for Data Analysis', 
        icon: Code, 
        description: 'Use Python libraries for data analysis and visualization.',
        modules: 16,
        projects: 6
      },
      { 
        name: 'Database Management', 
        icon: Database, 
        description: 'Design and query databases with SQL and database management principles.',
        modules: 14,
        projects: 5
      },
      { 
        name: 'AI & Machine Learning Intro', 
        icon: BookOpen, 
        description: 'Introduction to AI concepts and basic machine learning with Python.',
        modules: 10,
        projects: 3
      }
    ]
  },
  {
    grade: '11',
    subjects: [
      { 
        name: 'Advanced Programming', 
        icon: Code, 
        description: 'Advanced programming concepts, data structures, and algorithms.',
        modules: 18,
        projects: 7
      },
      { 
        name: 'Web Application Development', 
        icon: Code, 
        description: 'Build dynamic web applications with modern frameworks.',
        modules: 20,
        projects: 8
      },
      { 
        name: 'Data Science Fundamentals', 
        icon: Database, 
        description: 'Data analysis, visualization, and introduction to machine learning.',
        modules: 16,
        projects: 6
      },
      { 
        name: 'SQL Advanced', 
        icon: Database, 
        description: 'Advanced database queries, optimization, and administration.',
        modules: 12,
        projects: 5
      },
      { 
        name: 'Prompt Engineering', 
        icon: BookOpen, 
        description: 'Master the art of crafting effective prompts for AI tools and systems.',
        modules: 8,
        projects: 4
      }
    ]
  },
  {
    grade: '12',
    subjects: [
      { 
        name: 'Professional Development', 
        icon: Award, 
        description: 'Resume building, interview preparation, and career planning.',
        modules: 12,
        projects: 5
      },
      { 
        name: 'Advanced Project Work', 
        icon: Code, 
        description: 'Capstone projects based on student interests and career goals.',
        modules: 10,
        projects: 1
      },
      { 
        name: 'AI Tools Mastery', 
        icon: BookOpen, 
        description: 'Leverage AI tools for productivity, content creation, and problem-solving.',
        modules: 14,
        projects: 6
      },
      { 
        name: 'Full Stack Development', 
        icon: Code, 
        description: 'Build complete web applications with modern frameworks and best practices.',
        modules: 20,
        projects: 8
      },
      { 
        name: 'Data Science & Analytics', 
        icon: Database, 
        description: 'Advanced data analysis, machine learning, and data visualization.',
        modules: 16,
        projects: 6
      }
    ]
  }
];

const Curriculum = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <section className="py-12">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                Grade-wise Curriculum
              </h1>
              <p className="text-muted-foreground text-lg">
                Explore our comprehensive curriculum designed specifically for grades 8-12, 
                with structured learning paths in technology, programming, and digital skills.
              </p>
            </div>
            
            <Tabs defaultValue="8" className="w-full">
              <TabsList className="grid grid-cols-5 w-full max-w-2xl mx-auto mb-8">
                {gradeData.map((grade) => (
                  <TabsTrigger key={grade.grade} value={grade.grade}>
                    Class {grade.grade}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {gradeData.map((grade) => (
                <TabsContent key={grade.grade} value={grade.grade} className="mt-6">
                  <h2 className="text-2xl font-bold mb-6 text-center">
                    Class {grade.grade} Learning Path
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {grade.subjects.map((subject, index) => (
                      <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                              <subject.icon size={24} />
                            </div>
                            <CardTitle>{subject.name}</CardTitle>
                          </div>
                          <CardDescription>{subject.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Modules</span>
                            <span className="font-medium">{subject.modules}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Projects</span>
                            <span className="font-medium">{subject.projects}</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full" asChild>
                            <Link to={`/subject/${subject.name.toLowerCase().replace(/\s+/g, '-')}`}>
                              Explore Curriculum
                              <ChevronRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="mt-12 text-center">
                    <h3 className="text-xl font-semibold mb-4">About Class {grade.grade} Curriculum</h3>
                    <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
                      Our Class {grade.grade} curriculum is designed to build essential digital skills 
                      through structured learning modules, interactive lessons, and hands-on projects.
                      Each subject includes weekly lessons, quizzes, and creative assignments to reinforce learning.
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-4">
                      <Button size="lg">
                        <Play className="mr-2 h-4 w-4" />
                        Watch Introduction
                      </Button>
                      <Button variant="outline" size="lg">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Download Syllabus
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
            
            <div className="mt-20 max-w-4xl mx-auto rounded-3xl p-10 glass text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
              <p className="text-muted-foreground mb-8">
                Enroll in our structured curriculum today and begin your journey towards
                mastering essential digital skills for academic and professional success.
              </p>
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Curriculum;

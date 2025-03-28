import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Users, BookOpen, Award, BarChart2, Calendar, MessageSquare, User } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

// Sample course details - in a real app, this would come from an API
const courseDetails = [
  {
    id: '1',
    title: 'Complete MS Office Suite Mastery',
    description: 'Learn Word, Excel, PowerPoint, and Access with practical exercises designed for school assignments and projects.',
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
          { title: 'Creating Your First Document', duration: '30 mins' },
          { title: 'Formatting Text and Paragraphs', duration: '45 mins' },
          { title: 'Working with Styles', duration: '30 mins' },
          { title: 'Inserting Images and Tables', duration: '45 mins' },
        ],
      },
      {
        title: 'Excel Fundamentals',
        duration: '6 hours',
        lessons: [
          { title: 'Understanding the Excel Interface', duration: '30 mins' },
          { title: 'Entering and Formatting Data', duration: '45 mins' },
          { title: 'Basic Formulas and Functions', duration: '45 mins' },
          { title: 'Creating Charts and Graphs', duration: '60 mins' },
        ],
      },
      {
        title: 'PowerPoint Presentations',
        duration: '5 hours',
        lessons: [
          { title: 'Creating a New Presentation', duration: '30 mins' },
          { title: 'Adding and Formatting Slides', duration: '45 mins' },
          { title: 'Working with Themes and Templates', duration: '30 mins' },
          { title: 'Adding Animations and Transitions', duration: '60 mins' },
        ],
      },
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
          { title: 'Setting up the Development Environment', duration: '45 mins' },
          { title: 'Variables, Data Types, and Operators', duration: '60 mins' },
          { title: 'Control Flow Statements', duration: '90 mins' },
          { title: 'Functions and Modules', duration: '60 mins' },
        ],
      },
      {
        title: 'Data Structures',
        duration: '10 hours',
        lessons: [
          { title: 'Lists and Tuples', duration: '60 mins' },
          { title: 'Dictionaries and Sets', duration: '90 mins' },
          { title: 'List Comprehensions', duration: '45 mins' },
          { title: 'Working with Strings', duration: '60 mins' },
        ],
      },
      {
        title: 'Object-Oriented Programming',
        duration: '12 hours',
        lessons: [
          { title: 'Classes and Objects', duration: '90 mins' },
          { title: 'Inheritance and Polymorphism', duration: '120 mins' },
          { title: 'Encapsulation and Abstraction', duration: '90 mins' },
          { title: 'Working with Modules and Packages', duration: '60 mins' },
        ],
      },
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
          { title: 'Setting up the Database Environment', duration: '45 mins' },
          { title: 'Creating and Managing Databases', duration: '60 mins' },
          { title: 'Understanding Data Types', duration: '45 mins' },
          { title: 'Basic SQL Queries', duration: '60 mins' },
        ],
      },
      {
        title: 'Advanced SQL Queries',
        duration: '8 hours',
        lessons: [
          { title: 'Joining Tables', duration: '60 mins' },
          { title: 'Using Subqueries', duration: '90 mins' },
          { title: 'Aggregate Functions', duration: '45 mins' },
          { title: 'Working with Views', duration: '60 mins' },
        ],
      },
      {
        title: 'Database Management',
        duration: '10 hours',
        lessons: [
          { title: 'Transactions and Locking', duration: '90 mins' },
          { title: 'Backup and Recovery', duration: '120 mins' },
          { title: 'Performance Tuning', duration: '90 mins' },
          { title: 'Security and Permissions', duration: '60 mins' },
        ],
      },
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
          { title: 'Understanding AI Models', duration: '30 mins' },
          { title: 'The Art of Prompting', duration: '45 mins' },
          { title: 'Basic Prompting Techniques', duration: '60 mins' },
          { title: 'Common Mistakes to Avoid', duration: '45 mins' },
        ],
      },
      {
        title: 'Advanced Prompting Techniques',
        duration: '5 hours',
        lessons: [
          { title: 'Using Context and Examples', duration: '60 mins' },
          { title: 'Iterative Prompting', duration: '90 mins' },
          { title: 'Prompting for Different Tasks', duration: '45 mins' },
          { title: 'Prompting for Creativity', duration: '60 mins' },
        ],
      },
      {
        title: 'Prompt Engineering for Specific AI Models',
        duration: '7 hours',
        lessons: [
          { title: 'Prompting for ChatGPT', duration: '90 mins' },
          { title: 'Prompting for Image Generation', duration: '120 mins' },
          { title: 'Prompting for Code Generation', duration: '90 mins' },
          { title: 'Prompting for Data Analysis', duration: '60 mins' },
        ],
      },
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
  
  // Find the course with the matching ID
  const course = courseDetails.find(course => course.id === id);
  
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
                    <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-sm font-medium rounded-full">
                      {course.level}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                    {course.title}
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    {course.description}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center">
                    <Clock className="text-primary mr-2 h-5 w-5" />
                    <div>
                      <div className="text-sm text-muted-foreground">Duration</div>
                      <div className="font-medium">{course.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="text-primary mr-2 h-5 w-5" />
                    <div>
                      <div className="text-sm text-muted-foreground">Lessons</div>
                      <div className="font-medium">{course.lessons} Modules</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="text-primary mr-2 h-5 w-5" />
                    <div>
                      <div className="text-sm text-muted-foreground">Students</div>
                      <div className="font-medium">{course.students.toLocaleString()}+ Enrolled</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Award className="text-primary mr-2 h-5 w-5" />
                    <div>
                      <div className="text-sm text-muted-foreground">Certificate</div>
                      <div className="font-medium">Yes, on completion</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/3">
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="text-3xl font-bold text-primary mb-1">
                        {course.price}
                      </div>
                      {course.price === 'Free' ? (
                        <div className="text-sm text-muted-foreground">No payment required</div>
                      ) : (
                        <div className="text-sm text-muted-foreground">One-time payment</div>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <Button className="w-full" size="lg">
                        Enroll Now
                      </Button>
                      <Button className="w-full" variant="outline" size="lg">
                        Try Free Preview
                      </Button>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-border">
                      <h3 className="font-medium mb-2">This course includes:</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <BarChart2 className="text-primary mr-2 h-4 w-4" />
                          Full lifetime access
                        </li>
                        <li className="flex items-center">
                          <Award className="text-primary mr-2 h-4 w-4" />
                          Certificate of completion
                        </li>
                        <li className="flex items-center">
                          <Users className="text-primary mr-2 h-4 w-4" />
                          Community support
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container">
            <Tabs defaultValue="curriculum" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="w-full mb-8 grid max-w-md grid-cols-3 mx-auto">
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="vip-sessions">VIP Sessions</TabsTrigger>
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
              </TabsList>
              
              <TabsContent value="curriculum" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
                    
                    <Accordion type="single" collapsible className="w-full">
                      {course.modules.map((module, index) => (
                        <AccordionItem key={index} value={`module-${index}`}>
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center text-left">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold mr-3">
                                {index + 1}
                              </div>
                              <div>
                                <div className="font-medium">{module.title}</div>
                                <div className="text-xs text-muted-foreground">{module.lessons.length} lessons • {module.duration}</div>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="pl-11 space-y-4">
                              {module.lessons.map((lesson, lessonIndex) => (
                                <li key={lessonIndex} className="border-b border-border last:border-0 pb-3 last:pb-0">
                                  <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                      <span className="text-xs text-muted-foreground mr-2">{lessonIndex + 1}.</span>
                                      <span>{lesson.title}</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
                    <ul className="space-y-3">
                      {course.outcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs mr-3 mt-0.5 flex-shrink-0">
                            ✓
                          </div>
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="vip-sessions" className="space-y-6">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-3">Related VIP Expert Sessions</h2>
                    <p className="text-muted-foreground">
                      Enhance your learning with these expert-led sessions specifically related to this course
                    </p>
                  </div>
                  
                  {relatedSessions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {relatedSessions.map((session) => (
                        <Card key={session.id} className="overflow-hidden">
                          <div className="relative">
                            <img 
                              src={session.image} 
                              alt={session.title} 
                              className="w-full h-48 object-cover"
                            />
                            <div className="absolute top-3 left-3 px-3 py-1 bg-primary/90 text-white text-xs font-medium rounded-full">
                              {session.category}
                            </div>
                            <div className="absolute top-3 right-3 px-3 py-1 bg-green-500/90 text-white text-xs font-medium rounded-full">
                              {session.status}
                            </div>
                          </div>
                          <CardHeader>
                            <CardTitle>{session.title}</CardTitle>
                            <CardDescription>
                              <div className="flex items-center mt-1 text-sm font-medium">
                                <User className="mr-1 h-4 w-4 text-primary" />
                                <span>{session.expert}</span>
                              </div>
                              <div className="text-xs text-muted-foreground ml-5">{session.expertRole}</div>
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-2 pb-0">
                            <div className="flex items-center text-sm">
                              <Calendar className="mr-2 h-4 w-4 text-primary" />
                              {session.date}
                            </div>
                          </CardContent>
                          <CardFooter className="pb-6 pt-4">
                            <Button className="w-full" asChild>
                              <Link to={`/vip-sessions/${session.id}`}>
                                {session.status === 'Open' ? 'Reserve My Spot' : 'Get Notified'}
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 border border-dashed border-border rounded-lg">
                      <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/50">
                        <MessageSquare className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-medium mb-2">No Related Sessions Yet</h3>
                      <p className="text-muted-foreground max-w-md mx-auto mb-6">
                        We're constantly adding new expert sessions. Check back soon for sessions related to this course.
                      </p>
                      <Button asChild>
                        <Link to="/vip-sessions">Browse All VIP Sessions</Link>
                      </Button>
                    </div>
                  )}
                  
                  <div className="mt-12 text-center">
                    <Button size="lg" variant="outline" asChild>
                      <Link to="/vip-sessions">
                        View All Expert Sessions
                      </Link>
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="benefits" className="space-y-6">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-2xl font-bold mb-6 text-center">Course Benefits</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-lg bg-card border border-border">
                      <Award className="h-10 w-10 text-primary mb-4" />
                      <h3 className="text-xl font-medium mb-2">Recognized Certification</h3>
                      <p className="text-muted-foreground">
                        Earn a certificate that validates your knowledge and skills, which you can share on your resume and LinkedIn profile.
                      </p>
                    </div>
                    <div className="p-6 rounded-lg bg-card border border-border">
                      <BookOpen className="h-10 w-10 text-primary mb-4" />
                      <h3 className="text-xl font-medium mb-2">Comprehensive Learning</h3>
                      <p className="text-muted-foreground">
                        Access a structured curriculum with hands-on projects that build practical skills applicable in real-world scenarios.
                      </p>
                    </div>
                    <div className="p-6 rounded-lg bg-card border border-border">
                      <Users className="h-10 w-10 text-primary mb-4" />
                      <h3 className="text-xl font-medium mb-2">Community Support</h3>
                      <p className="text-muted-foreground">
                        Join a community of learners where you can collaborate, share ideas, and support each other throughout your learning journey.
                      </p>
                    </div>
                    <div className="p-6 rounded-lg bg-card border border-border">
                      <Clock className="h-10 w-10 text-primary mb-4" />
                      <h3 className="text-xl font-medium mb-2">Lifetime Access</h3>
                      <p className="text-muted-foreground">
                        Learn at your own pace with unlimited access to course materials, allowing you to revisit concepts whenever needed.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-12 p-8 rounded-xl bg-primary/5 border border-primary/10">
                    <h3 className="text-xl font-medium mb-4 text-center">Student Success Stories</h3>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium flex-shrink-0">
                          AS
                        </div>
                        <div>
                          <div className="font-medium">Ananya Singh</div>
                          <div className="text-sm text-muted-foreground mb-2">Class 12 Student</div>
                          <p className="text-sm">
                            "This course gave me the confidence to pursue computer science in college. 
                            The practical projects helped me build a portfolio that impressed my interviewers."
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium flex-shrink-0">
                          RK
                        </div>
                        <div>
                          <div className="font-medium">Rohan Kumar</div>
                          <div className="text-sm text-muted-foreground mb-2">Recent Graduate</div>
                          <p className="text-sm">
                            "The skills I learned in this course helped me secure an internship at a tech company. 
                            The curriculum was up-to-date with industry standards and requirements."
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;

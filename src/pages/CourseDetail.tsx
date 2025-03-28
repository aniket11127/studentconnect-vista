
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Users, BookOpen, Award, BarChart2 } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Sample course details - in a real app, this would come from an API
const courseDetails = [
  {
    id: '1',
    title: 'Complete MS Office Suite Mastery',
    description: 'Learn Word, Excel, PowerPoint, and Access with practical exercises designed for school assignments and projects. Master essential tools used in academic and professional settings.',
    image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    category: 'Office Skills',
    level: 'Beginner',
    price: 'Free',
    duration: '48 hours',
    students: 3240,
    lessons: 56,
    featured: true,
    instructor: 'Priya Sharma',
    instructorTitle: 'Microsoft Certified Trainer',
    instructorImage: 'https://randomuser.me/api/portraits/women/45.jpg',
    lastUpdated: 'May 2023',
    language: 'English, Hindi',
    sections: [
      {
        title: 'Introduction to MS Office',
        lessons: [
          'Getting Started with MS Office Suite',
          'Understanding the Interface',
          'File Management Basics'
        ]
      },
      {
        title: 'Microsoft Word Essentials',
        lessons: [
          'Document Creation and Formatting',
          'Working with Tables and Images',
          'Mail Merge and Advanced Features',
          'Creating Academic Reports'
        ]
      },
      {
        title: 'Excel Fundamentals',
        lessons: [
          'Spreadsheet Basics',
          'Formulas and Functions',
          'Data Analysis Tools',
          'Charts and Visualizations',
          'Project: School Grade Calculator'
        ]
      },
      {
        title: 'PowerPoint Mastery',
        lessons: [
          'Creating Engaging Presentations',
          'Working with Animations and Transitions',
          'Multimedia Integration',
          'Project: Academic Presentation'
        ]
      },
      {
        title: 'Access Database Basics',
        lessons: [
          'Database Concepts',
          'Creating Tables and Relationships',
          'Forms and Reports',
          'Simple Queries'
        ]
      }
    ]
  },
  // Add "Prompt Engineering for AI" course
  {
    id: '9',
    title: 'Prompt Engineering for AI',
    description: 'Learn the art of crafting effective prompts for AI tools like ChatGPT to get better, more accurate results. Master the techniques to communicate with AI systems effectively for various applications from content creation to problem-solving.',
    image: 'public/lovable-uploads/1a079d3d-ac21-49e6-8815-aa595702602b.png',
    category: 'AI Skills',
    level: 'Beginner',
    price: 'Free',
    duration: '15 hours',
    students: 1850,
    lessons: 18,
    featured: false,
    instructor: 'Dr. Rajiv Kumar',
    instructorTitle: 'AI Research Specialist',
    instructorImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastUpdated: 'June 2023',
    language: 'English, Hindi',
    sections: [
      {
        title: 'Introduction to Prompt Engineering',
        lessons: [
          'Understanding AI Language Models',
          'How AI Interprets Prompts',
          'The Importance of Clear Communication with AI'
        ]
      },
      {
        title: 'Basic Prompt Techniques',
        lessons: [
          'Structuring Effective Prompts',
          'Using Context to Improve Responses',
          'Specifying Output Formats',
          'Practice Session: Basic Prompting'
        ]
      },
      {
        title: 'Advanced Prompt Strategies',
        lessons: [
          'Chain-of-Thought Prompting',
          'Role-Based Prompting',
          'Few-Shot Learning Techniques',
          'Handling Complex Instructions',
          'Project: Creating a Custom Assistant'
        ]
      },
      {
        title: 'Domain-Specific Applications',
        lessons: [
          'Prompting for Creative Writing',
          'Prompting for Code Generation',
          'Prompting for Data Analysis',
          'Prompting for Educational Content'
        ]
      },
      {
        title: 'Final Project',
        lessons: [
          'Designing a Comprehensive Prompt System',
          'Testing and Iterating Prompts',
          'Presentation and Peer Review'
        ]
      }
    ]
  },
  // Additional course details would be added here
];

const CourseDetail = () => {
  const { id } = useParams();
  
  // Find the course with the matching ID
  const course = courseDetails.find(course => course.id === id);
  
  // Handle case where course is not found
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
              <p className="text-muted-foreground mb-8">The course you're looking for doesn't exist or has been removed.</p>
              <Button asChild>
                <Link to="/courses">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Courses
                </Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        {/* Course Header */}
        <section className="bg-secondary/30 py-12">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Course Info */}
              <div className="lg:w-2/3 space-y-6">
                <div>
                  <Link to="/courses" className="inline-flex items-center text-sm text-primary hover:underline mb-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Courses
                  </Link>
                  <h1 className="text-3xl md:text-4xl font-bold leading-tight">{course.title}</h1>
                </div>
                
                <p className="text-lg text-muted-foreground">{course.description}</p>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
                      {course.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-3 py-1 text-sm font-medium bg-secondary rounded-full">
                      {course.level}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={16} className="text-primary" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users size={16} className="text-primary" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen size={16} className="text-primary" />
                    <span>{course.lessons} lessons</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <img 
                    src={course.instructorImage} 
                    alt={course.instructor}
                    className="w-12 h-12 rounded-full object-cover" 
                  />
                  <div>
                    <p className="font-medium">{course.instructor}</p>
                    <p className="text-sm text-muted-foreground">{course.instructorTitle}</p>
                  </div>
                </div>
              </div>
              
              {/* Enrollment Card */}
              <div className="lg:w-1/3">
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover" 
                  />
                  <div className="p-6 space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">{course.price}</span>
                      <span className="text-sm text-muted-foreground">Students</span>
                    </div>
                    
                    <Button className="w-full" size="lg">Enroll Now</Button>
                    
                    <div className="space-y-4 pt-4 border-t border-border">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last updated</span>
                        <span>{course.lastUpdated}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Language</span>
                        <span>{course.language}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Certificate</span>
                        <span className="flex items-center">
                          <Award size={16} className="text-primary mr-1" />
                          Yes
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Course Content */}
        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Course Curriculum */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
                
                <Accordion type="single" collapsible className="w-full">
                  {course.sections.map((section, index) => (
                    <AccordionItem key={index} value={`section-${index}`}>
                      <AccordionTrigger className="text-lg font-medium">
                        {section.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 pt-2">
                          {section.lessons.map((lesson, lessonIndex) => (
                            <li key={lessonIndex} className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary/50">
                              <BookOpen size={16} className="text-primary" />
                              <span>{lesson}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
              
              {/* Course Benefits */}
              <div>
                <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
                
                <ul className="space-y-4">
                  {course.id === '9' ? (
                    <>
                      <li className="flex items-start gap-3">
                        <div className="p-1 rounded-full bg-primary/10 text-primary mt-0.5">
                          <BarChart2 size={16} />
                        </div>
                        <span>Craft effective prompts that generate accurate, relevant AI responses</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="p-1 rounded-full bg-primary/10 text-primary mt-0.5">
                          <BarChart2 size={16} />
                        </div>
                        <span>Understand how AI language models interpret and process instructions</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="p-1 rounded-full bg-primary/10 text-primary mt-0.5">
                          <BarChart2 size={16} />
                        </div>
                        <span>Apply advanced techniques like chain-of-thought and role-based prompting</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="p-1 rounded-full bg-primary/10 text-primary mt-0.5">
                          <BarChart2 size={16} />
                        </div>
                        <span>Develop domain-specific prompting strategies for various applications</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="p-1 rounded-full bg-primary/10 text-primary mt-0.5">
                          <BarChart2 size={16} />
                        </div>
                        <span>Design comprehensive prompt systems for complex tasks</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start gap-3">
                        <div className="p-1 rounded-full bg-primary/10 text-primary mt-0.5">
                          <BarChart2 size={16} />
                        </div>
                        <span>Create professional documents, spreadsheets, and presentations</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="p-1 rounded-full bg-primary/10 text-primary mt-0.5">
                          <BarChart2 size={16} />
                        </div>
                        <span>Master essential Excel functions for data analysis</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="p-1 rounded-full bg-primary/10 text-primary mt-0.5">
                          <BarChart2 size={16} />
                        </div>
                        <span>Design engaging presentations with multimedia elements</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="p-1 rounded-full bg-primary/10 text-primary mt-0.5">
                          <BarChart2 size={16} />
                        </div>
                        <span>Build basic databases to organize information</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="p-1 rounded-full bg-primary/10 text-primary mt-0.5">
                          <BarChart2 size={16} />
                        </div>
                        <span>Complete practical projects relevant to academic requirements</span>
                      </li>
                    </>
                  )}
                </ul>
                
                <div className="mt-8 p-6 bg-secondary/30 rounded-xl">
                  <h3 className="font-medium mb-4">Requirements</h3>
                  <ul className="space-y-2 text-sm">
                    {course.id === '9' ? (
                      <>
                        <li>• Basic computer literacy</li>
                        <li>• Internet connection</li>
                        <li>• Access to AI tools like ChatGPT</li>
                        <li>• No prior AI experience required</li>
                      </>
                    ) : (
                      <>
                        <li>• Basic computer skills</li>
                        <li>• Computer with Windows/Mac/Linux</li>
                        <li>• MS Office installed (2016 or newer)</li>
                        <li>• Internet connection for some exercises</li>
                      </>
                    )}
                  </ul>
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

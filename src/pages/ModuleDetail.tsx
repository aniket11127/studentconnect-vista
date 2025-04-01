import React from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { ChevronLeft, BookOpen, Download, FileText, Code, Database, Award, Brain, Calendar, Clock, Users, BookCheck, CheckCircle, File } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { getResourcesByModuleSlug } from '@/data/courseResources';
import { downloadResource } from '@/utils/downloadUtils';

const getModuleIcon = (moduleName: string) => {
  if (moduleName.includes('MS Word') || moduleName.includes('MS Excel')) return FileText;
  if (moduleName.includes('HTML') || moduleName.includes('Web Development') || moduleName.includes('Python')) return Code;
  if (moduleName.includes('SQL')) return Database;
  if (moduleName.includes('Professional Development')) return Award;
  if (moduleName.includes('AI') || moduleName.includes('Prompt Engineering')) return Brain;
  return BookOpen;
};

const generateExercises = (name: string, moduleCount: number) => {
  const exercises = [];
  
  if (name.includes('Word')) {
    exercises.push(
      { id: 1, title: 'Creating a Professional Resume', level: 'Beginner', estimated: '45 min' },
      { id: 2, title: 'Advanced Document Formatting', level: 'Intermediate', estimated: '60 min' },
      { id: 3, title: 'Mail Merge for Letters', level: 'Intermediate', estimated: '50 min' }
    );
  } else if (name.includes('Excel')) {
    exercises.push(
      { id: 1, title: 'Basic Formulas and Functions', level: 'Beginner', estimated: '45 min' },
      { id: 2, title: 'Creating Dynamic Charts', level: 'Intermediate', estimated: '60 min' },
      { id: 3, title: 'PivotTables for Data Analysis', level: 'Advanced', estimated: '75 min' }
    );
  } else if (name.includes('HTML') || name.includes('Web')) {
    exercises.push(
      { id: 1, title: 'Creating Your First Web Page', level: 'Beginner', estimated: '45 min' },
      { id: 2, title: 'Responsive Layout Design', level: 'Intermediate', estimated: '60 min' },
      { id: 3, title: 'Interactive Form Validation', level: 'Advanced', estimated: '75 min' }
    );
  } else if (name.includes('Python')) {
    exercises.push(
      { id: 1, title: 'Python Variables and Data Types', level: 'Beginner', estimated: '45 min' },
      { id: 2, title: 'Control Flow and Functions', level: 'Intermediate', estimated: '60 min' },
      { id: 3, title: 'Object-Oriented Programming', level: 'Advanced', estimated: '75 min' }
    );
  } else if (name.includes('SQL')) {
    exercises.push(
      { id: 1, title: 'Basic Database Queries', level: 'Beginner', estimated: '45 min' },
      { id: 2, title: 'Joins and Relationships', level: 'Intermediate', estimated: '60 min' },
      { id: 3, title: 'Optimizing Query Performance', level: 'Advanced', estimated: '75 min' }
    );
  } else if (name.includes('Prompt')) {
    exercises.push(
      { id: 1, title: 'Basic Prompt Construction', level: 'Beginner', estimated: '45 min' },
      { id: 2, title: 'Chain of Thought Prompting', level: 'Intermediate', estimated: '60 min' },
      { id: 3, title: 'Multi-modal Prompt Engineering', level: 'Advanced', estimated: '75 min' }
    );
  } else {
    exercises.push(
      { id: 1, title: 'Fundamentals Exercise', level: 'Beginner', estimated: '45 min' },
      { id: 2, title: 'Practical Application', level: 'Intermediate', estimated: '60 min' },
      { id: 3, title: 'Advanced Concepts', level: 'Advanced', estimated: '75 min' }
    );
  }
  
  if (moduleCount > 10) {
    exercises.push({ 
      id: 4, 
      title: 'Comprehensive Final Project', 
      level: 'Expert', 
      estimated: '120 min' 
    });
  }
  
  return exercises;
};

const ModuleDetail = () => {
  const location = useLocation();
  const { moduleSlug } = useParams();
  
  const moduleData = location.state?.moduleData;
  
  const module = moduleData || {
    name: moduleSlug?.replace(/-/g, ' '),
    description: 'Comprehensive course curriculum',
    modules: 10,
    projects: 4,
    progress: 0,
    topics: ['Course fundamentals', 'Practical applications', 'Advanced techniques'],
    weeks: [
      { weekNumber: 1, title: 'Fundamentals', description: 'Introduction to core concepts' },
      { weekNumber: 2, title: 'Practical Skills', description: 'Hands-on application of concepts' },
      { weekNumber: 3, title: 'Advanced Topics', description: 'Mastering complex techniques' }
    ]
  };
  
  const formattedName = module.name
    ? module.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'Course Module';
  
  const Icon = getModuleIcon(formattedName);
  
  const exercises = generateExercises(formattedName, module.modules);
  
  const moduleResources = moduleSlug ? getResourcesByModuleSlug(moduleSlug) : [];
  
  const handleEnroll = () => {
    toast.success(`Successfully enrolled in ${formattedName}`, {
      description: "You can now access all course materials and exercises."
    });
  };
  
  const handleDownloadResources = () => {
    const moduleName = moduleSlug || formattedName.replace(/\s+/g, '-').toLowerCase();
    
    if (moduleResources.length === 0) {
      const fallbackResource = {
        fileName: `${moduleName}-guide`,
        type: 'pdf'
      };
      
      toast.info("Downloading module guide...", {
        description: "Your module guide will begin downloading shortly."
      });
      
      setTimeout(() => {
        downloadResource(fallbackResource.fileName, fallbackResource.type);
      }, 500);
      return;
    }
    
    toast.info("Preparing resources for download", {
      description: "Your module materials will begin downloading shortly."
    });
    
    if (moduleResources.length > 1) {
      moduleResources.forEach((resource, index) => {
        setTimeout(() => {
          downloadResource(resource.fileName, resource.type);
        }, index * 1500);
      });
    } else if (moduleResources.length === 1) {
      downloadResource(moduleResources[0].fileName, moduleResources[0].type);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 pb-16">
        <div className="container max-w-6xl">
          <div className="mb-6">
            <Link 
              to="/curriculum" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Curriculum
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 mb-12">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Icon size={28} />
                </div>
                <Badge variant="outline" className="bg-primary/5 text-primary">
                  {module.modules} Modules
                </Badge>
                <Badge variant="outline" className="bg-primary/5 text-primary">
                  {module.projects} Projects
                </Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{formattedName}</h1>
              <p className="text-lg text-muted-foreground mb-6">
                {module.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Duration</p>
                    <p className="text-sm text-muted-foreground">{module.weeks.length} weeks</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Study Time</p>
                    <p className="text-sm text-muted-foreground">{module.modules * 2} hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Students</p>
                    <p className="text-sm text-muted-foreground">230+ enrolled</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" onClick={handleEnroll}>
                  Enroll Now
                </Button>
                <Button variant="outline" size="lg" onClick={handleDownloadResources}>
                  <Download className="mr-2 h-4 w-4" />
                  Course Resources
                </Button>
              </div>
            </div>
            
            <div className="md:w-2/5">
              {module.image ? (
                <img 
                  src={module.image} 
                  alt={formattedName}
                  className="w-full h-auto rounded-lg shadow-md object-cover aspect-[4/3]"
                />
              ) : (
                <div className="w-full rounded-lg bg-gradient-to-br from-primary/10 to-secondary/30 aspect-[4/3] flex items-center justify-center">
                  <Icon size={64} className="text-primary/40" />
                </div>
              )}
            </div>
          </div>
          
          <Tabs defaultValue="overview" className="mb-12">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="exercises">Exercises</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">About This Course</h2>
                    <p className="text-muted-foreground mb-4">
                      This comprehensive course is designed to take you from beginner to proficient in {formattedName}. 
                      Through a combination of theory and practical exercises, you'll develop the skills needed to 
                      excel in this subject area.
                    </p>
                    <p className="text-muted-foreground">
                      By the end of this course, you'll have completed {module.projects} practical projects that 
                      demonstrate your abilities and can be added to your portfolio.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">What You'll Learn</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {module.topics && module.topics.map((topic, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                      {!module.topics || module.topics.length === 0 ? (
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                          <span>Core concepts and fundamentals</span>
                        </li>
                      ) : null}
                    </ul>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      <li>Basic computer skills</li>
                      <li>Access to required software (provided in course)</li>
                      <li>Dedication to complete practical exercises</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">Course Includes</h3>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-sm">
                          <BookOpen className="h-5 w-5 text-muted-foreground" />
                          <span>{module.modules} learning modules</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <span>Downloadable resources</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm">
                          <BookCheck className="h-5 w-5 text-muted-foreground" />
                          <span>{exercises.length} practical exercises</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm">
                          <Award className="h-5 w-5 text-muted-foreground" />
                          <span>Completion certificate</span>
                        </li>
                      </ul>
                      
                      <Separator className="my-6" />
                      
                      <Button className="w-full" onClick={handleEnroll}>
                        Start Learning Now
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="curriculum">
              <h2 className="text-2xl font-semibold mb-6">Course Curriculum</h2>
              
              <Accordion type="single" collapsible className="mb-6">
                {module.weeks && module.weeks.map((week) => (
                  <AccordionItem key={week.weekNumber} value={`week-${week.weekNumber}`}>
                    <AccordionTrigger className="hover:no-underline px-4 py-3 bg-secondary/20 rounded-md">
                      <div className="flex items-center">
                        <span className="font-semibold">Week {week.weekNumber}:</span>
                        <span className="ml-2">{week.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 py-3">
                      <p className="text-muted-foreground mb-4">{week.description}</p>
                      
                      <div className="space-y-3">
                        {[1, 2, 3].map((lecture) => (
                          <div key={lecture} className="flex items-center justify-between border-b pb-2">
                            <div className="flex items-center gap-3">
                              <BookOpen className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <h4 className="text-sm font-medium">Lecture {lecture}</h4>
                                <p className="text-xs text-muted-foreground">{week.weekNumber === 1 ? 'Fundamentals' : week.weekNumber === 2 ? 'Application' : 'Advanced Topics'} {lecture}</p>
                              </div>
                            </div>
                            <Badge variant="outline">20 min</Badge>
                          </div>
                        ))}
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Award className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <h4 className="text-sm font-medium">Week {week.weekNumber} Assignment</h4>
                              <p className="text-xs text-muted-foreground">Practical application of concepts</p>
                            </div>
                          </div>
                          <Badge variant="outline">45 min</Badge>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
            
            <TabsContent value="exercises">
              <h2 className="text-2xl font-semibold mb-6">Practical Exercises</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {exercises.map((exercise) => (
                  <Card key={exercise.id} className="overflow-hidden">
                    <div className="h-2 bg-primary"></div>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold">{exercise.title}</h3>
                        <Badge variant={
                          exercise.level === 'Beginner' ? 'outline' :
                          exercise.level === 'Intermediate' ? 'secondary' :
                          exercise.level === 'Advanced' ? 'default' : 'destructive'
                        }>
                          {exercise.level}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
                        <Clock className="h-4 w-4" />
                        <span>{exercise.estimated}</span>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        Start Exercise
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="projects">
              <h2 className="text-2xl font-semibold mb-6">Course Projects</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({length: module.projects}, (_, i) => i + 1).map((projectId) => (
                  <Card key={projectId} className="overflow-hidden">
                    <div className="h-2 bg-secondary"></div>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold">Project {projectId}</h3>
                        <Badge>Capstone</Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-5">
                        {projectId === 1 ? 'Create a comprehensive solution using learned concepts' : 
                         projectId === 2 ? 'Build a practical application with real-world data' :
                         projectId === 3 ? 'Develop an innovative approach to common problems' :
                         'Apply advanced techniques to complex scenarios'}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button variant="outline" className="flex-1">
                          View Details
                        </Button>
                        <Button className="flex-1">
                          Submit Project
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="resources">
              <h2 className="text-2xl font-semibold mb-6">Course Resources</h2>
              
              {moduleResources.length > 0 ? (
                <div className="space-y-6">
                  <div className="flex justify-end">
                    <Button onClick={handleDownloadResources} className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download All Resources
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {moduleResources.map((resource) => (
                      <Card key={resource.id} className="overflow-hidden">
                        <CardContent className="pt-6">
                          <div className="flex items-start mb-4">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mr-3">
                              <File className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium">{resource.title}</h3>
                              <p className="text-sm text-muted-foreground mb-1">{resource.description}</p>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <span className="uppercase mr-2">{resource.type}</span>
                                <span>{resource.fileSize}</span>
                              </div>
                            </div>
                          </div>
                          
                          <Button 
                            variant="outline" 
                            className="w-full" 
                            onClick={() => downloadResource(resource.fileName, resource.type)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-muted mb-4">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No resources available yet</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    We're currently preparing resources for this module. Please check back later.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ModuleDetail;

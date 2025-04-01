import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Users, BookOpen, Award, BarChart2, Calendar, MessageSquare, User, Check, CheckCircle2, CircleDashed, Rocket, Brain, Target, Code, PenSquare, Download, File, FileText } from 'lucide-react';
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
import { allCourses } from '@/data/courses';
import { Helmet } from 'react-helmet-async';
import { getResourcesByCourseId } from '@/data/courseResources';
import { downloadResource, downloadAllResources } from '@/utils/downloadUtils';

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
const courseDetails = allCourses;

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('curriculum');
  const [enrollmentPending, setEnrollmentPending] = useState(false);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    completedLessons: [],
    completedExercises: [],
    completedProjects: []
  });
  const [similarCourses, setSimilarCourses] = useState<any[]>([]);
  
  // Find the course by ID
  const course = courseDetails.find(course => course.id === id);
  
  // Get course resources
  const courseResources = id ? getResourcesByCourseId(id) : [];
  
  // Generate similar courses based on category if course is found
  useEffect(() => {
    if (course) {
      // Find courses in the same category, excluding the current one
      const sameCategoryCourses = courseDetails
        .filter(c => c.category === course.category && c.id !== course.id)
        .slice(0, 3);
      
      // If we need more courses to recommend, add some popular ones
      let recommendedCourses = [...sameCategoryCourses];
      if (recommendedCourses.length < 3) {
        const popularCourses = courseDetails
          .filter(c => c.id !== course.id && !sameCategoryCourses.some(sc => sc.id === c.id))
          .sort((a, b) => b.students - a.students)
          .slice(0, 3 - recommendedCourses.length);
        
        recommendedCourses = [...recommendedCourses, ...popularCourses];
      }
      
      setSimilarCourses(recommendedCourses);
    } else {
      // If no course is found, show popular courses
      const topCourses = courseDetails
        .sort((a, b) => b.students - a.students)
        .slice(0, 4);
      
      setSimilarCourses(topCourses);
    }
  }, [course, id]);
  
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
  
  // Handle enrollment button click
  const handleEnrollNow = () => {
    setEnrollmentPending(true);
    toast.success("Enrollment Coming Soon!", {
      description: "This feature will be available in the near future.",
      duration: 3000,
    });
    
    setTimeout(() => {
      setEnrollmentPending(false);
    }, 3000);
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
  
  // Add the missing handleDownloadResources function
  const handleDownloadResources = () => {
    if (courseResources.length === 0) {
      toast("No resources available", {
        description: "We're currently preparing resources for this course."
      });
      return;
    }
    
    if (course) {
      downloadAllResources(course.id, course.title);
    }
  };
  
  // Handle case where course is not found
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>Course Not Available | Student Success Portal</title>
          <meta name="description" content="This course is currently unavailable. Explore our other courses designed to help students develop essential skills." />
          <meta name="keywords" content="course unavailable, student courses, alternative courses, education" />
        </Helmet>
        <Navbar />
        <main className="flex-1 pt-24">
          <div className="container py-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">This course is currently unavailable</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">We're currently updating this course to provide you with the best learning experience. Explore similar courses below that might interest you.</p>
              <Button asChild size="lg" className="animate-pulse">
                <Link to="/courses">Browse All Courses</Link>
              </Button>
            </div>
            
            {similarCourses.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-semibold mb-6">Recommended Courses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {similarCourses.map((course, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow border-border/60 hover:border-primary/30">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex gap-2 mb-2">
                          <span className="inline-block px-2 py-1 bg-primary/10 text-xs text-primary rounded-full">
                            {course.category}
                          </span>
                          <span className="inline-block px-2 py-1 bg-muted text-xs text-muted-foreground rounded-full">
                            {course.level}
                          </span>
                        </div>
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex gap-4 text-xs text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Clock size={14} className="text-primary" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users size={14} className="text-primary" />
                            <span>{course.students} students</span>
                          </div>
                        </div>
                        <div className="font-semibold text-primary text-lg">Free</div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full">
                          <Link to={`/course/${course.id}`}>View Course</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}
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
      <Helmet>
        <title>{course.title} | Student Success Portal</title>
        <meta name="description" content={course.description} />
        <meta name="keywords" content={`${course.category}, ${course.level}, ${course.title}, student course, free course, education, learning`} />
        <meta property="og:title" content={`${course.title} | Free Online Course`} />
        <meta property="og:description" content={course.description} />
        <meta property="og:image" content={course.image} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
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
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                      Free Access
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
                      <TabsTrigger value="resources">Resources</TabsTrigger>
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

                    <TabsContent value="resources" className="space-y-6">
                      <div className="bg-background rounded-lg p-6 shadow-sm border">
                        <h3 className="text-xl font-semibold mb-4">Course Resources</h3>
                        
                        {courseResources.length > 0 ? (
                          <div className="space-y-6">
                            <div className="flex justify-end">
                              <Button onClick={handleDownloadResources} className="flex items-center gap-2">
                                <Download className="h-4 w-4" />
                                Download All Resources
                              </Button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {courseResources.map((resource) => (
                                <Card key={resource.id} className="overflow-hidden">
                                  <CardContent className="pt-6">
                                    <div className="flex items-start mb-4">
                                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mr-3">
                                        <File className="h-5 w-5" />
                                      </div>
                                      <div className="flex-1">
                                        <h4 className="font-medium">{resource.title}</h4>
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
                              We're currently preparing resources for this course. Please check back later.
                            </p>
                          </div>
                        )}
                      </div>
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
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                      />
                    </div>
                    <div className="p-6 space-y-6">
                      <div className="flex items-baseline justify-between">
                        <div className="text-3xl font-bold text-green-600">
                          Free
                        </div>
                        {course.price && (
                          <div className="text-lg text-muted-foreground line-through">
                            {course.price}
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Button 
                          className="w-full"
                          onClick={handleEnrollNow}
                          disabled={enrollmentPending}
                        >
                          {enrollmentPending ? "Coming Soon..." : "Enroll Now"}
                        </Button>
                        <Button variant="outline" className="w-full" onClick={handleDownloadResources}>
                          <Download className="mr-2 h-4 w-4" />
                          Download Resources
                        </Button>
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
                            <div className="flex justify-between py-1">
                              <span className="text-muted-foreground">Last Updated</span>
                              <span className="font-medium">June 2023</span>
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

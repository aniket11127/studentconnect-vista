
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CourseCard from '@/components/ui/CourseCard';
import { Link } from 'react-router-dom';

// Sample course data
const featuredCourses = [
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
  },
  {
    id: '3',
    title: 'SQL Database Management',
    description: 'Learn how to create, query, and manage databases using SQL with practical exercises for data handling.',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    category: 'Database',
    level: 'Intermediate' as const,
    duration: '30 hours',
    students: 1760,
    lessons: 35,
    featured: true,
  },
  {
    id: '4',
    title: 'Ace Your Interviews',
    description: 'Master interview techniques, common questions, and strategies to showcase your skills and stand out to employers.',
    image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    category: 'Career Development',
    level: 'Intermediate' as const,
    duration: '20 hours',
    students: 2800,
    lessons: 24,
    featured: true,
  },
];

const Courses = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Popular Courses to Boost Your Skills
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore our most sought-after courses designed specifically for Students 
              to excel in academics and build career-ready skills.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" size="lg" asChild>
              <Link to="/courses">
                View All Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" asChild>
              <Link to="/curriculum">
                Explore Curriculum
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((course, index) => (
            <CourseCard
              key={course.id}
              {...course}
              className={`animate-fade-in delay-${index * 100}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;

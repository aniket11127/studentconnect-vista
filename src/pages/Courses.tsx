
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import CourseCard from '@/components/ui/CourseCard';
import { Link } from 'react-router-dom';

// Sample course data - same as in the homepage
const allCourses = [
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
    title: 'Web Development Fundamentals',
    description: 'Master HTML and CSS to create visually appealing, responsive websites from scratch.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    category: 'Web Development',
    level: 'Beginner' as const,
    duration: '32 hours',
    students: 2180,
    lessons: 38,
    featured: false,
  },
  {
    id: '4',
    title: 'Public Speaking Essentials',
    description: 'Build confidence and develop effective communication skills for presentations and interviews.',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    category: 'Soft Skills',
    level: 'Intermediate' as const,
    duration: '24 hours',
    students: 1950,
    lessons: 28,
    featured: false,
  },
  {
    id: '5',
    title: 'SQL Database Management',
    description: 'Learn how to create, query, and manage databases using SQL with practical exercises.',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    category: 'Database',
    level: 'Intermediate' as const,
    duration: '30 hours',
    students: 1760,
    lessons: 35,
    featured: false,
  },
  {
    id: '6',
    title: 'Advanced Excel for Data Analysis',
    description: 'Master Excel functions, pivot tables, and data visualization for effective data analysis.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    category: 'Data Analysis',
    level: 'Advanced' as const,
    duration: '28 hours',
    students: 2100,
    lessons: 32,
    featured: false,
  },
  {
    id: '7',
    title: 'Resume Building Workshop',
    description: 'Learn how to create an impressive resume that stands out to potential employers.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    category: 'Career Development',
    level: 'Beginner' as const,
    duration: '12 hours',
    students: 3500,
    lessons: 15,
    featured: false,
  },
  {
    id: '8',
    title: 'Interview Preparation Skills',
    description: 'Master the art of interviewing with mock interviews, feedback, and confidence-building techniques.',
    image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    category: 'Career Development',
    level: 'Intermediate' as const,
    duration: '20 hours',
    students: 2800,
    lessons: 24,
    featured: false,
  },
];

const Courses = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <section className="py-12">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                Explore Our Courses
              </h1>
              <p className="text-muted-foreground text-lg">
                Discover our comprehensive course catalog designed to help Students develop 
                essential skills for academic and professional success.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {allCourses.map((course, index) => (
                <CourseCard
                  key={course.id}
                  {...course}
                  className={`animate-fade-in delay-${index % 4 * 100}`}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;

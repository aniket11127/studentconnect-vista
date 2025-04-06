
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CourseCard from '@/components/ui/CourseCard';
import { Link } from 'react-router-dom';
import { allCourses } from '@/data/courses';

const Courses = () => {
  // Filter to display only featured courses, or first 4 if none are featured
  const featuredCourses = allCourses.filter(course => course.featured).slice(0, 4);
  
  // If we don't have at least 4 featured courses, add the most popular ones
  const coursesToShow = featuredCourses.length >= 4 
    ? featuredCourses 
    : [...featuredCourses, ...allCourses
        .filter(course => !course.featured)
        .sort((a, b) => b.students - a.students)
        .slice(0, 4 - featuredCourses.length)];

  // Ensure all courses have valid images
  const coursesWithImages = coursesToShow.map(course => {
    if (!course.image || course.image === '/placeholder-course-image.jpg') {
      // Assign relevant image based on category
      let image = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d';
      
      if (course.category.includes('Web Development')) {
        image = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6';
      } else if (course.category.includes('Data')) {
        image = 'https://images.unsplash.com/photo-1518770660439-4636190af475';
      } else if (course.category.includes('AI') || course.category.includes('Machine')) {
        image = 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7';
      } else if (course.category.includes('Cloud')) {
        image = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b';
      }
      
      return { ...course, image };
    }
    return course;
  });

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
                Interactive Curriculum
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coursesWithImages.map((course, index) => (
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

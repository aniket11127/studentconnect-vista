
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import CourseCard from '@/components/ui/CourseCard';
import { Link } from 'react-router-dom';
import { allCourses } from '@/data/courses';

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

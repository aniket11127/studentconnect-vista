
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, Filter } from 'lucide-react';
import CourseCard from '@/components/ui/CourseCard';
import { Link } from 'react-router-dom';
import { allCourses } from '@/data/courses';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(allCourses);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  
  // Extract unique categories and levels
  const categories = [...new Set(allCourses.map(course => course.category))];
  const levels = [...new Set(allCourses.map(course => course.level))];
  
  // Filter courses based on search term, category, and level
  useEffect(() => {
    let result = allCourses;
    
    if (searchTerm) {
      result = result.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      result = result.filter(course => course.category === selectedCategory);
    }
    
    if (selectedLevel) {
      result = result.filter(course => course.level === selectedLevel);
    }
    
    setFilteredCourses(result);
  }, [searchTerm, selectedCategory, selectedLevel]);
  
  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedLevel('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Free Online Courses | Student Success Portal</title>
        <meta name="description" content="Explore our comprehensive catalog of free courses designed to help students develop essential skills for academic and professional success." />
        <meta name="keywords" content="free courses, online learning, student courses, skill development, education" />
        <meta property="og:title" content="Free Online Courses | Student Success Portal" />
        <meta property="og:description" content="Access a wide range of free courses to boost your academic and professional skills." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <Navbar />
      <main className="flex-1 pt-24">
        <section className="py-12">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                Explore Our Free Courses
              </h1>
              <p className="text-muted-foreground text-lg">
                Discover our comprehensive course catalog designed to help students develop 
                essential skills for academic and professional success.
              </p>
            </div>
            
            {/* Search and Filters */}
            <div className="mb-12 bg-card shadow-sm border rounded-xl p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search courses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border rounded-md focus:ring-1 focus:ring-primary focus:border-primary"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="px-3 py-2 border rounded-md focus:ring-1 focus:ring-primary focus:border-primary"
                  >
                    <option value="">All Levels</option>
                    {levels.map((level, index) => (
                      <option key={index} value={level}>{level}</option>
                    ))}
                  </select>
                  <Button variant="outline" onClick={resetFilters}>
                    Reset
                  </Button>
                </div>
              </div>
            </div>
            
            {filteredCourses.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                <p className="text-muted-foreground mb-6">Try changing your search or filter criteria</p>
                <Button onClick={resetFilters}>Show All Courses</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredCourses.map((course, index) => (
                  <CourseCard
                    key={course.id}
                    {...course}
                    className={`animate-fade-in delay-${index % 4 * 100}`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CourseCard from '@/components/cards/CourseCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const Courses = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Web Development Bootcamp',
      description: 'Learn web development from scratch with HTML, CSS, and JavaScript.',
      imageUrl: '/placeholder-course-image.jpg',
      lessons: 20,
      duration: '8 weeks',
      level: 'Beginner',
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      description: 'Explore the basics of data science, including data analysis and machine learning.',
      imageUrl: '/placeholder-course-image.jpg',
      lessons: 15,
      duration: '6 weeks',
      level: 'Intermediate',
    },
    {
      id: 3,
      title: 'Mobile App Development with React Native',
      description: 'Build cross-platform mobile apps using React Native.',
      imageUrl: '/placeholder-course-image.jpg',
      lessons: 25,
      duration: '10 weeks',
      level: 'Advanced',
    },
    {
      id: 4,
      title: 'AI and Machine Learning',
      description: 'An introductory course to AI and Machine Learning.',
      imageUrl: '/placeholder-course-image.jpg',
      lessons: 12,
      duration: '5 weeks',
      level: 'Beginner',
    },
    {
      id: 5,
      title: 'Cybersecurity Basics',
      description: 'Learn the fundamental concepts of cybersecurity.',
      imageUrl: '/placeholder-course-image.jpg',
      lessons: 18,
      duration: '7 weeks',
      level: 'Intermediate',
    },
    {
      id: 6,
      title: 'Cloud Computing with AWS',
      description: 'Get hands-on experience with cloud computing using Amazon Web Services (AWS).',
      imageUrl: '/placeholder-course-image.jpg',
      lessons: 22,
      duration: '9 weeks',
      level: 'Advanced',
    },
  ]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-20 md:pt-24">
      <Helmet>
        <title>Courses | SGK14 EdTech</title>
      </Helmet>
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Our Courses</h1>
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="md:w-80"
            />
            <Button variant="outline" size="icon">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Courses;

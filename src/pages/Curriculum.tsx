import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Curriculum = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 md:pt-24">
      <Helmet>
        <title>Curriculum | SGK14 EdTech</title>
      </Helmet>
      <main className="container mx-auto px-4 py-12">
        <h1>Curriculum Page</h1>
        <p>Explore our comprehensive curriculum designed to enhance your skills and knowledge.</p>
        <Link to="/courses" className="text-blue-500 hover:underline">
          View Available Courses
        </Link>
      </main>
    </div>
  );
};

export default Curriculum;

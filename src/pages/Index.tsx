
import React, { useEffect } from 'react';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Courses from '@/components/sections/Courses';
import ReviewSection from '@/components/sections/ReviewSection';

const Index = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Hero />
      <Features />
      <Courses />
      <ReviewSection />
    </div>
  );
};

export default Index;


import React, { useEffect } from 'react';
import Navbar from '@/components/layout/NavbarWithAI';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Courses from '@/components/sections/Courses';
import VipSessions from '@/components/sections/VipSessions';
import ReviewSection from '@/components/sections/ReviewSection';

const Index = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Courses />
        <VipSessions />
        <ReviewSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

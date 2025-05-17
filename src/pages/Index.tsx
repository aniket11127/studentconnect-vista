
import React, { useEffect } from 'react';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import ReviewSection from '@/components/sections/ReviewSection';
import TrainingOfferBanner from '@/components/sections/TrainingOfferBanner';
import OurServices from '@/components/sections/OurServices';
import SGK14LearningRoadmap from '@/components/sections/SGK14LearningRoadmap';

const Index = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Hero />
      <TrainingOfferBanner />
      <OurServices />
      <SGK14LearningRoadmap />
      <Features />
      <ReviewSection />
    </div>
  );
};

export default Index;

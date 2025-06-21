
import React, { useEffect, useState } from 'react';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import ReviewSection from '@/components/sections/ReviewSection';
import TrainingOfferBanner from '@/components/sections/TrainingOfferBanner';
import FeatureShowcaseModal from '@/components/modals/FeatureShowcaseModal';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { user, loading } = useAuth();
  const [showModal, setShowModal] = useState(false);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Show modal for non-logged-in users after a short delay
  useEffect(() => {
    if (!loading && !user) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 1500); // Show modal after 1.5 seconds

      return () => clearTimeout(timer);
    }
  }, [user, loading]);

  return (
    <div>
      <Hero />
      <TrainingOfferBanner />
      <Features />
      <ReviewSection />
      
      {/* Feature Showcase Modal for non-logged-in users */}
      <FeatureShowcaseModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </div>
  );
};

export default Index;

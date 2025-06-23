
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

  // Show modal for non-logged-in users after 6 seconds with session storage check
  useEffect(() => {
    if (!loading && !user) {
      // Check if popup was already closed in this session
      const popupClosed = sessionStorage.getItem('popupClosed');
      
      if (!popupClosed) {
        const timer = setTimeout(() => {
          setShowModal(true);
        }, 6000); // Show modal after 6 seconds

        return () => clearTimeout(timer);
      }
    }
  }, [user, loading]);

  const handleCloseModal = () => {
    setShowModal(false);
    // Set session storage flag to prevent showing again in same session
    sessionStorage.setItem('popupClosed', 'true');
  };

  return (
    <div>
      <Hero />
      <TrainingOfferBanner />
      <Features />
      <ReviewSection />
      
      {/* Feature Showcase Modal for non-logged-in users */}
      <FeatureShowcaseModal 
        isOpen={showModal} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default Index;

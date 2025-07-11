
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

  // Show modal for non-logged-in users after 7 seconds with session storage check
  useEffect(() => {
    if (!loading && !user) {
      // Check if popup was already shown in this session
      const popupShown = sessionStorage.getItem('sgk14-popup-shown');
      
      if (!popupShown) {
        const showPopup = () => {
          try {
            setShowModal(true);
            sessionStorage.setItem('sgk14-popup-shown', 'true');
          } catch (error) {
            console.error('Error showing popup:', error);
            // Retry once after 1 second
            setTimeout(() => {
              try {
                setShowModal(true);
                sessionStorage.setItem('sgk14-popup-shown', 'true');
              } catch (retryError) {
                console.error('Retry failed for popup:', retryError);
              }
            }, 1000);
          }
        };

        const timer = setTimeout(showPopup, 7000); // Show modal after 7 seconds
        return () => clearTimeout(timer);
      }
    }
  }, [user, loading]);

  const handleCloseModal = () => {
    setShowModal(false);
    // Session flag is already set when modal is shown, so we keep it intact
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

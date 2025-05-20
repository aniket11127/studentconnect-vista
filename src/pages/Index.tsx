
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Code } from 'lucide-react';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import ReviewSection from '@/components/sections/ReviewSection';
import TrainingOfferBanner from '@/components/sections/TrainingOfferBanner';
import SGK14LearningRoadmap from '@/components/sections/SGK14LearningRoadmap';

const CodingPlaygroundPreview = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-4">
            Interactive Coding Editor
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Practice coding in multiple languages with our interactive code editor
          </p>
          <Button asChild size="lg" className="flex items-center gap-2">
            <Link to="/editor">
              <Code size={18} />
              Try Code Editor
            </Link>
          </Button>
        </div>
        
        <div className="relative rounded-xl overflow-hidden shadow-xl border border-blue-100">
          <img 
            src="/lovable-uploads/4eaa1a0e-6c88-482c-92bd-3faa661433cd.png" 
            alt="Coding Editor Preview" 
            className="w-full h-auto rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-8">
            <Button asChild variant="default" size="lg" className="shadow-lg bg-primary/90 hover:bg-primary">
              <Link to="/editor">
                Launch Editor
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Hero />
      <TrainingOfferBanner />
      <SGK14LearningRoadmap />
      <CodingPlaygroundPreview />
      <Features />
      <ReviewSection />
    </div>
  );
};

export default Index;

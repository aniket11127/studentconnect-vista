
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Courses from '@/components/sections/Courses';
import VipSessions from '@/components/sections/VipSessions';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Briefcase, GraduationCap, BarChart3 } from 'lucide-react';
import ProgressBar from '@/components/ui/ProgressBar';
import { Link } from 'react-router-dom';
import ReviewSection from '@/components/sections/ReviewSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <Features />
        <Courses />
        <VipSessions />
        
        {/* Why Choose SGK14 Section */}
        <section className="py-20 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 z-[-1] opacity-40">
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />
          </div>
          
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    Why Choose SGK14
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                    We're on a Mission to Transform Education
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    At SGK14, we blend technical education with real-world skills to create well-rounded 
                    professionals ready for future challenges.
                  </p>
                </div>
                
                <div className="space-y-5">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Practical Skill Development</span>
                      <span>92%</span>
                    </div>
                    <ProgressBar value={92} size="md" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Industry Relevance</span>
                      <span>88%</span>
                    </div>
                    <ProgressBar value={88} size="md" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Student Satisfaction</span>
                      <span>96%</span>
                    </div>
                    <ProgressBar value={96} size="md" />
                  </div>
                </div>
                
                <Button size="lg" asChild>
                  <Link to="/about">
                    Discover Our Approach
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl glass hover-card-effect">
                  <BookOpen className="w-12 h-12 mb-4 text-primary" />
                  <h3 className="text-xl font-medium mb-2">Comprehensive Curriculum</h3>
                  <p className="text-muted-foreground">Courses designed by industry experts and educational specialists.</p>
                </div>
                <div className="p-6 rounded-2xl glass hover-card-effect">
                  <GraduationCap className="w-12 h-12 mb-4 text-primary" />
                  <h3 className="text-xl font-medium mb-2">Recognized Certification</h3>
                  <p className="text-muted-foreground">Earn certificates validated by prestigious institutions.</p>
                </div>
                <div className="p-6 rounded-2xl glass hover-card-effect">
                  <Briefcase className="w-12 h-12 mb-4 text-primary" />
                  <h3 className="text-xl font-medium mb-2">Career Support</h3>
                  <p className="text-muted-foreground">Comprehensive guidance for job placements and internships.</p>
                </div>
                <div className="p-6 rounded-2xl glass hover-card-effect">
                  <BarChart3 className="w-12 h-12 mb-4 text-primary" />
                  <h3 className="text-xl font-medium mb-2">Personalized Learning</h3>
                  <p className="text-muted-foreground">AI-driven content adaptation based on learning style.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Reviews Section - New Dynamic Component */}
        <ReviewSection />
        
        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto rounded-3xl p-10 glass text-center">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of MP Board students who are building essential digital skills 
                and preparing for successful careers.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" asChild>
                  <Link to="/signup">
                    Get Started Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

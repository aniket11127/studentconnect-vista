
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Courses from '@/components/sections/Courses';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Briefcase, GraduationCap, BarChart3 } from 'lucide-react';
import ProgressBar from '@/components/ui/ProgressBar';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <Features />
        <Courses />
        
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
                      <span>94%</span>
                    </div>
                    <ProgressBar value={94} size="md" />
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
        
        {/* Testimonials Section */}
        <section className="py-20 bg-secondary/50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                What Our Students Say
              </h2>
              <p className="text-muted-foreground text-lg">
                Hear from students who have transformed their careers through our courses
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="p-6 rounded-2xl bg-card border border-border">
                  <div className="flex items-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg 
                        key={star}
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="currentColor" 
                        className="text-primary"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm mb-6">
                    "SGK14's courses have completely transformed my approach to learning. The practical 
                    projects and personalized feedback helped me build a strong foundation in programming.
                    Now I'm confident in my skills and ready for future challenges."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      {String.fromCharCode(64 + item)}
                    </div>
                    <div>
                      <div className="font-medium">Student Name</div>
                      <div className="text-xs text-muted-foreground">Grade 11, MP Board</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
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

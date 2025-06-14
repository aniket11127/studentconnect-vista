
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/NavbarWithAI';
import Footer from '@/components/layout/Footer';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Users, Award, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>About Us | SGK14 EdTech</title>
      </Helmet>
      <Navbar />
      <main className="flex-grow pt-20 md:pt-24">
        <section className="py-12">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                About SGK14
              </h1>
              <p className="text-muted-foreground text-lg">
                Learn about our mission to transform education for MP Board students
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold">Our Mission</h2>
                <p className="text-muted-foreground">
                  At SGK14, we are dedicated to empowering MP Board students with 
                  essential digital skills and career development resources that 
                  bridge the gap between academic learning and real-world requirements.
                </p>
                <p className="text-muted-foreground">
                  Our comprehensive platform combines technical education with soft 
                  skill development, providing a holistic learning environment that 
                  prepares students for future success in an increasingly digital world.
                </p>
              </div>
              <div className="bg-secondary/30 p-8 rounded-2xl">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary mt-1">
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Practical Learning</h3>
                      <p className="text-muted-foreground">Our curriculum focuses on hands-on projects and real-world applications</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary mt-1">
                      <Users size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Mentorship</h3>
                      <p className="text-muted-foreground">Guidance from industry experts and experienced educators</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary mt-1">
                      <Award size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Certification</h3>
                      <p className="text-muted-foreground">Industry-recognized credentials validated by top institutions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary mt-1">
                      <Lightbulb size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Career Support</h3>
                      <p className="text-muted-foreground">Comprehensive guidance for job placements and internships</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto mb-6">
                SGK14 was founded in 2020 with a vision to revolutionize education for MP Board students. 
                Recognizing the gap between traditional education and industry requirements, we created 
                a platform that integrates technical skills with soft skill development.
              </p>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Today, we've helped over 10,000 students develop essential skills and secure meaningful 
                opportunities, with a 95% placement rate for our advanced program graduates.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;

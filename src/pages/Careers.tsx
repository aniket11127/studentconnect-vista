
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Heart, Target, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Careers = () => {
  const openPositions = [
    {
      title: 'Frontend Developer',
      type: 'Full-time',
      description: 'Build engaging educational interfaces using React and modern web technologies.',
    },
    {
      title: 'Content Creator',
      type: 'Part-time',
      description: 'Create educational content for Python, HTML/CSS, and MS Office courses.',
    },
    {
      title: 'Student Mentor',
      type: 'Remote',
      description: 'Guide and support MP Board students in their learning journey.',
    },
    {
      title: 'Digital Marketing Specialist',
      type: 'Full-time',
      description: 'Promote SGK14 educational programs across digital platforms.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Careers | SGK14 EdTech</title>
      </Helmet>
      
      <main className="flex-grow pt-20 md:pt-24">
        <section className="py-12">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Join Our Mission
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Help us empower the next generation of MP Board students with essential digital skills and career guidance.
                </p>
              </div>

              {/* Culture Section */}
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6">Why Join SGK14?</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <Heart className="h-8 w-8 text-primary mb-2" />
                      <CardTitle className="text-lg">Impact-Driven</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Make a real difference in students' lives by bridging the gap between education and industry needs.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <Users className="h-8 w-8 text-primary mb-2" />
                      <CardTitle className="text-lg">Collaborative</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Work with passionate educators and tech enthusiasts who share your vision for quality education.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <Target className="h-8 w-8 text-primary mb-2" />
                      <CardTitle className="text-lg">Growth-Focused</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Continuous learning opportunities and career advancement in the rapidly growing edtech sector.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Open Positions */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
                <div className="space-y-4">
                  {openPositions.map((position, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{position.title}</CardTitle>
                            <CardDescription className="text-primary font-medium">
                              {position.type}
                            </CardDescription>
                          </div>
                          <Button size="sm">Apply Now</Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{position.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Campus Ambassador */}
              <div className="bg-secondary/30 p-8 rounded-2xl text-center">
                <h3 className="text-xl font-bold mb-4">Become a Campus Ambassador</h3>
                <p className="text-muted-foreground mb-6">
                  Are you a passionate student? Join our Campus Ambassador program and help spread digital literacy in your college while earning exciting rewards and certificates.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button>Join as Ambassador</Button>
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>

              {/* Contact */}
              <div className="mt-12 text-center">
                <h3 className="text-lg font-medium mb-2">Don't see the right role?</h3>
                <p className="text-muted-foreground mb-4">
                  We're always looking for talented individuals. Send us your resume!
                </p>
                <Button variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  careers@sgk14.com
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Careers;

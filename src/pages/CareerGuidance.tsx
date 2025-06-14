
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Compass, Users, BookOpen, Video, FileText, Calendar } from 'lucide-react';

const CareerGuidance = () => {
  const services = [
    {
      icon: Compass,
      title: 'Career Assessment Quiz',
      description: 'Discover your strengths, interests, and ideal career paths with our comprehensive assessment.',
      action: 'Take Quiz',
    },
    {
      icon: Users,
      title: 'One-on-One Counselling',
      description: 'Personal guidance sessions with experienced career counselors and industry experts.',
      action: 'Book Session',
    },
    {
      icon: Video,
      title: 'Expert Career Talks',
      description: 'Regular webinars with professionals from tech, engineering, and other growing fields.',
      action: 'Watch Now',
    },
    {
      icon: FileText,
      title: 'Study Materials',
      description: 'Comprehensive PDFs and guides for competitive exams like JEE, NEET, and entrance tests.',
      action: 'Download',
    },
  ];

  const careerPaths = [
    {
      title: 'Software Development',
      description: 'Web development, mobile apps, and software engineering roles',
      skills: ['Python', 'HTML/CSS', 'JavaScript', 'Problem Solving'],
      growth: 'High Demand',
    },
    {
      title: 'Data Science & Analytics',
      description: 'Data analysis, machine learning, and business intelligence',
      skills: ['Python', 'SQL', 'Statistics', 'Excel'],
      growth: 'Fastest Growing',
    },
    {
      title: 'Digital Marketing',
      description: 'Social media marketing, content creation, and online advertising',
      skills: ['MS Office', 'Communication', 'Analytics', 'Creativity'],
      growth: 'High Growth',
    },
    {
      title: 'Engineering & Technology',
      description: 'Traditional engineering fields with modern tech integration',
      skills: ['Technical Skills', 'Problem Solving', 'Innovation'],
      growth: 'Stable Growth',
    },
  ];

  const upcomingSessions = [
    {
      title: 'Career Options After 12th Science',
      speaker: 'Dr. Priya Sharma',
      date: 'Dec 22, 2024',
      time: '6:00 PM',
    },
    {
      title: 'Breaking Into Tech Industry',
      speaker: 'Rahul Gupta, Software Engineer',
      date: 'Dec 25, 2024',
      time: '5:00 PM',
    },
    {
      title: 'Preparing for Engineering Entrance Exams',
      speaker: 'Prof. Anjali Verma',
      date: 'Dec 28, 2024',
      time: '7:00 PM',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Career Guidance | SGK14 EdTech</title>
      </Helmet>
      
      <main className="flex-grow pt-20 md:pt-24">
        <section className="py-12">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Career Guidance & Counselling
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Navigate your future with confidence. Get personalized career guidance, explore opportunities, and make informed decisions about your educational and professional journey.
                </p>
              </div>

              {/* Services */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Our Career Guidance Services</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {services.map((service, index) => {
                    const IconComponent = service.icon;
                    return (
                      <Card key={index}>
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <IconComponent className="h-5 w-5 text-primary" />
                            </div>
                            <CardTitle className="text-lg">{service.title}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">{service.description}</p>
                          <Button size="sm">{service.action}</Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Career Paths */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Explore Career Paths</h2>
                <div className="space-y-6">
                  {careerPaths.map((path, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{path.title}</h3>
                            <p className="text-muted-foreground">{path.description}</p>
                          </div>
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {path.growth}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Required Skills:</h4>
                          <div className="flex flex-wrap gap-2">
                            {path.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Upcoming Sessions */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Upcoming Career Sessions</h2>
                <div className="space-y-4">
                  {upcomingSessions.map((session, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium text-lg">{session.title}</h3>
                            <p className="text-muted-foreground">by {session.speaker}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {session.date}
                              </div>
                              <span>{session.time}</span>
                            </div>
                          </div>
                          <Button>Register</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Career Resources</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="text-center">
                    <CardHeader>
                      <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                      <CardTitle className="text-lg">Study Guides</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Comprehensive preparation materials for competitive exams
                      </p>
                      <Button size="sm" variant="outline">Download PDFs</Button>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardHeader>
                      <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                      <CardTitle className="text-lg">Mentorship Program</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Connect with industry professionals for guidance
                      </p>
                      <Button size="sm" variant="outline">Find Mentor</Button>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardHeader>
                      <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
                      <CardTitle className="text-lg">Career Library</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Articles, videos, and resources about different careers
                      </p>
                      <Button size="sm" variant="outline">Explore</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-secondary/30 p-8 rounded-2xl text-center">
                <h3 className="text-xl font-bold mb-4">Ready to Shape Your Future?</h3>
                <p className="text-muted-foreground mb-6">
                  Take the first step towards a successful career. Our expert counselors are here to guide you every step of the way.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button size="lg">Book Free Consultation</Button>
                  <Button variant="outline" size="lg">Take Career Quiz</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CareerGuidance;

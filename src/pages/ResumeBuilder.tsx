
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, Download, Edit, Template, Zap } from 'lucide-react';

const ResumeBuilder = () => {
  const features = [
    {
      icon: Template,
      title: 'Professional Templates',
      description: 'Choose from 10+ ATS-friendly templates designed specifically for students and fresh graduates.',
    },
    {
      icon: Zap,
      title: 'Auto-Fill Technology',
      description: 'Automatically populate your resume with information from your SGK14 profile and course completions.',
    },
    {
      icon: Edit,
      title: 'Easy Customization',
      description: 'Drag-and-drop editor with real-time preview. No design experience required.',
    },
    {
      icon: Download,
      title: 'Multiple Formats',
      description: 'Download in PDF, Word, or share with a unique link. Perfect for online applications.',
    },
  ];

  const resumeSections = [
    'Contact Information',
    'Professional Summary',
    'Education Details',
    'Technical Skills',
    'Projects & Certifications',
    'Work Experience',
    'Achievements & Awards',
    'Languages & Hobbies',
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Resume Builder | SGK14 EdTech</title>
      </Helmet>
      
      <main className="flex-grow pt-20 md:pt-24">
        <section className="py-12">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Professional Resume Builder
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Create stunning, ATS-friendly resumes in minutes. Perfect for class 10-12 students applying for internships, college admissions, or first jobs.
                </p>
              </div>

              {/* Hero Section */}
              <div className="mb-12">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/20 p-8">
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                          <h2 className="text-2xl font-bold mb-4">Build Your First Professional Resume</h2>
                          <p className="text-muted-foreground mb-6">
                            Stand out from other students with a professionally designed resume that highlights your skills, projects, and achievements from SGK14 courses.
                          </p>
                          <div className="flex gap-3">
                            <Button size="lg">Start Building</Button>
                            <Button variant="outline" size="lg">View Samples</Button>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-6 shadow-lg">
                          <div className="space-y-4">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-100 rounded w-full"></div>
                            <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                            <div className="space-y-2">
                              <div className="h-2 bg-primary/20 rounded w-full"></div>
                              <div className="h-2 bg-primary/20 rounded w-4/5"></div>
                              <div className="h-2 bg-primary/20 rounded w-3/4"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Features */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Why Choose SGK14 Resume Builder?</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {features.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <Card key={index}>
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <IconComponent className="h-5 w-5 text-primary" />
                            </div>
                            <CardTitle className="text-lg">{feature.title}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{feature.description}</p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Resume Sections */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">What's Included in Your Resume</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      {resumeSections.map((section, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">{section}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Perfect For */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Perfect For</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="text-center">
                    <CardHeader>
                      <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                      <CardTitle className="text-lg">Class 10-12 Students</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        First-time resume builders looking for internships and part-time opportunities
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardHeader>
                      <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
                      <CardTitle className="text-lg">College Applications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Showcase your technical skills and projects for college admissions
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardHeader>
                      <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
                      <CardTitle className="text-lg">Job Applications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Professional resumes ready for entry-level tech positions
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* How It Works */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">How It Works</h2>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">1</div>
                    <h3 className="font-medium mb-2">Choose Template</h3>
                    <p className="text-sm text-muted-foreground">Select from professional, ATS-friendly templates</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">2</div>
                    <h3 className="font-medium mb-2">Add Information</h3>
                    <p className="text-sm text-muted-foreground">Auto-fill from your profile or add manually</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">3</div>
                    <h3 className="font-medium mb-2">Customize Design</h3>
                    <p className="text-sm text-muted-foreground">Personalize colors, fonts, and layout</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">4</div>
                    <h3 className="font-medium mb-2">Download & Share</h3>
                    <p className="text-sm text-muted-foreground">Export in multiple formats and share instantly</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-secondary/30 p-8 rounded-2xl text-center">
                <h3 className="text-xl font-bold mb-4">Ready to Build Your Professional Resume?</h3>
                <p className="text-muted-foreground mb-6">
                  Join thousands of students who have successfully created their first professional resume with SGK14. Start building your career today!
                </p>
                <div className="flex gap-4 justify-center">
                  <Button size="lg">Start Building Now</Button>
                  <Button variant="outline" size="lg">See Examples</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ResumeBuilder;

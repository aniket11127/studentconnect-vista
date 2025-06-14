
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Download, CheckCircle, FileText, Share2 } from 'lucide-react';

const Certification = () => {
  const certificateTypes = [
    {
      title: 'Course Completion Certificate',
      description: 'Issued upon successful completion of any SGK14 course',
      requirements: ['Complete all modules', 'Pass final assessment', 'Submit final project'],
    },
    {
      title: 'Skill Proficiency Certificate',
      description: 'Advanced certification for demonstrating practical skills',
      requirements: ['Complete advanced projects', 'Peer review participation', 'Industry-standard assessment'],
    },
    {
      title: 'Project Excellence Certificate',
      description: 'Recognition for outstanding project work and innovation',
      requirements: ['Exceptional project quality', 'Creative problem-solving', 'Presentation excellence'],
    },
  ];

  const benefits = [
    {
      icon: FileText,
      title: 'Resume Enhancement',
      description: 'Add verified credentials to your resume and LinkedIn profile',
    },
    {
      icon: CheckCircle,
      title: 'Industry Recognition',
      description: 'Certificates recognized by leading tech companies and educational institutions',
    },
    {
      icon: Download,
      title: 'Instant Download',
      description: 'Download high-quality PDF certificates immediately after completion',
    },
    {
      icon: Share2,
      title: 'Easy Sharing',
      description: 'Share your achievements on social media and professional networks',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Certification | SGK14 EdTech</title>
      </Helmet>
      
      <main className="flex-grow pt-20 md:pt-24">
        <section className="py-12">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  SGK14 Certifications
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Earn industry-recognized certificates that validate your skills and boost your career prospects. Perfect for college applications and job interviews.
                </p>
              </div>

              {/* Sample Certificate Preview */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-center">Sample Certificate</h2>
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/20 p-8 text-center">
                      <div className="bg-white rounded-lg p-8 mx-auto max-w-2xl shadow-lg">
                        <div className="mb-6">
                          <Award className="h-16 w-16 text-primary mx-auto mb-4" />
                          <h3 className="text-2xl font-bold text-primary">Certificate of Achievement</h3>
                          <p className="text-muted-foreground">This is to certify that</p>
                        </div>
                        <div className="mb-6">
                          <h4 className="text-3xl font-bold text-foreground">Student Name</h4>
                          <p className="text-muted-foreground">has successfully completed the course</p>
                          <h5 className="text-xl font-semibold text-primary">Python Programming Fundamentals</h5>
                        </div>
                        <div className="flex justify-between items-end mt-8">
                          <div>
                            <p className="text-sm text-muted-foreground">Date: December 2024</p>
                            <p className="text-sm text-muted-foreground">Certificate ID: SGK14-PY-2024-001</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">SGK14 EdTech</p>
                            <p className="text-xs text-muted-foreground">Digitally Verified</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Certificate Types */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Types of Certificates</h2>
                <div className="space-y-6">
                  {certificateTypes.map((cert, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-primary" />
                          {cert.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{cert.description}</p>
                        <div>
                          <h4 className="font-medium mb-2">Requirements:</h4>
                          <ul className="list-disc list-inside text-muted-foreground space-y-1">
                            {cert.requirements.map((req, reqIndex) => (
                              <li key={reqIndex}>{req}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Certificate Benefits</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {benefits.map((benefit, index) => {
                    const IconComponent = benefit.icon;
                    return (
                      <Card key={index}>
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <IconComponent className="h-5 w-5 text-primary" />
                            </div>
                            <CardTitle className="text-lg">{benefit.title}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{benefit.description}</p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Important Note */}
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <CheckCircle className="h-5 w-5" />
                    Important Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-muted-foreground">
                    <p><strong>Certificates are issued only after project submission:</strong> You must complete and submit your final project to receive your certificate.</p>
                    <p><strong>Verification:</strong> All certificates include a unique ID that can be verified on our website.</p>
                    <p><strong>Validity:</strong> SGK14 certificates do not expire and remain valid throughout your career.</p>
                    <p><strong>Digital Format:</strong> Certificates are provided in high-quality PDF format suitable for printing and digital sharing.</p>
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <div className="mt-12 text-center">
                <h3 className="text-xl font-bold mb-4">Ready to Earn Your Certificate?</h3>
                <p className="text-muted-foreground mb-6">
                  Start your learning journey today and earn industry-recognized certificates that will boost your career.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button>Browse Courses</Button>
                  <Button variant="outline">View My Certificates</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Certification;

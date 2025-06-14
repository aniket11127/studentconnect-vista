
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Mail, Users, Cookie } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Privacy Policy | SGK14 EdTech</title>
      </Helmet>
      
      <main className="flex-grow pt-20 md:pt-24">
        <section className="py-12">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Privacy Policy
                </h1>
                <p className="text-muted-foreground text-lg">
                  Last updated: December 2024
                </p>
              </div>

              <div className="space-y-8">
                {/* Introduction */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Our Commitment to Privacy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      At SGK14, we are committed to protecting the privacy and security of our students, especially minors. 
                      This Privacy Policy explains how we collect, use, and safeguard your information when you use our platform.
                    </p>
                  </CardContent>
                </Card>

                {/* Data Collection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Information We Collect</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Personal Information:</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Name, email address, and phone number</li>
                        <li>School name and class (8th-12th grade)</li>
                        <li>Parent/guardian contact information (for minors)</li>
                        <li>Profile picture (optional)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Learning Data:</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Course progress and completion status</li>
                        <li>Quiz scores and assignment submissions</li>
                        <li>Time spent on platform and learning patterns</li>
                        <li>Project submissions and portfolios</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* How We Use Data */}
                <Card>
                  <CardHeader>
                    <CardTitle>How We Use Your Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Provide personalized learning experiences and track progress</li>
                      <li>Generate certificates upon course completion</li>
                      <li>Send important updates about courses and platform features</li>
                      <li>Improve our educational content and user experience</li>
                      <li>Provide customer support and technical assistance</li>
                      <li>Communicate with parents/guardians about student progress</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Student Safety */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Student Safety & Parental Consent
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      We prioritize the safety of students under 18 years of age:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Parental consent is required for students under 18</li>
                      <li>We do not collect unnecessary personal information from minors</li>
                      <li>Student data is never used for marketing purposes</li>
                      <li>We maintain strict security measures to protect student information</li>
                      <li>Parents can request access to or deletion of their child's data</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Cookies */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Cookie className="h-5 w-5 text-primary" />
                      Cookies and Tracking
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      We use cookies and similar technologies to:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Remember your login preferences and settings</li>
                      <li>Track learning progress and course completion</li>
                      <li>Analyze platform usage to improve our services</li>
                      <li>Provide a personalized learning experience</li>
                    </ul>
                    <p className="text-muted-foreground mt-4">
                      You can control cookie settings through your browser preferences.
                    </p>
                  </CardContent>
                </Card>

                {/* Data Sharing */}
                <Card>
                  <CardHeader>
                    <CardTitle>Data Sharing and Third Parties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      We do not sell, trade, or rent your personal information. We may share data only in these limited circumstances:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>With your explicit consent</li>
                      <li>To comply with legal obligations or court orders</li>
                      <li>With trusted service providers who help us operate our platform (under strict confidentiality agreements)</li>
                      <li>In case of business transfer, with appropriate data protection measures</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Contact */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-primary" />
                      Contact Us About Privacy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      If you have questions about this Privacy Policy or want to exercise your privacy rights, contact us:
                    </p>
                    <div className="space-y-2 text-muted-foreground">
                      <p><strong>Email:</strong> privacy@sgk14.com</p>
                      <p><strong>Phone:</strong> +91 98765 43210</p>
                      <p><strong>Address:</strong> SGK14 EdTech, Indore, Madhya Pradesh</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicy;

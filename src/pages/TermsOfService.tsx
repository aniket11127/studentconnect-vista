
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, Award, RefreshCw } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Terms of Service | SGK14 EdTech</title>
      </Helmet>
      
      <main className="flex-grow pt-20 md:pt-24">
        <section className="py-12">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Terms of Service
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
                      <FileText className="h-5 w-5 text-primary" />
                      Agreement to Terms
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      By accessing and using SGK14 EdTech platform, you agree to be bound by these Terms of Service. 
                      If you are under 18, your parent or guardian must agree to these terms on your behalf.
                    </p>
                  </CardContent>
                </Card>

                {/* User Conduct */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      User Conduct and Responsibilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">You agree to:</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Provide accurate and truthful information during registration</li>
                        <li>Use the platform only for educational purposes</li>
                        <li>Respect other users and maintain a positive learning environment</li>
                        <li>Keep your login credentials secure and not share your account</li>
                        <li>Submit original work for assignments and projects</li>
                        <li>Follow community guidelines in forums and discussions</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">You agree NOT to:</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Share course content or materials outside the platform</li>
                        <li>Use the platform for any illegal or unauthorized purposes</li>
                        <li>Harass, bully, or discriminate against other users</li>
                        <li>Upload malicious software or inappropriate content</li>
                        <li>Attempt to hack or compromise platform security</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Allowed Use */}
                <Card>
                  <CardHeader>
                    <CardTitle>Permitted Use and License</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      SGK14 grants you a limited, non-exclusive, non-transferable license to:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Access and use the platform for personal educational purposes</li>
                      <li>Download course materials for offline study (where permitted)</li>
                      <li>Complete assignments and projects as part of your learning</li>
                      <li>Participate in community discussions and forums</li>
                      <li>Use SGK14 certificates in your portfolio and job applications</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Certificates */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Certificates and Credentials
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Certificate Requirements:</h4>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          <li>Complete all required modules and assignments</li>
                          <li>Achieve minimum passing scores on assessments</li>
                          <li>Submit final project with satisfactory quality</li>
                          <li>Follow academic integrity guidelines</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Certificate Terms:</h4>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          <li>Certificates are digitally signed and verifiable</li>
                          <li>SGK14 reserves the right to revoke certificates for violations</li>
                          <li>Certificates remain valid unless explicitly revoked</li>
                          <li>Students are responsible for accurately representing their achievements</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Refund Policy */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <RefreshCw className="h-5 w-5 text-primary" />
                      Refund and Cancellation Policy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Free Courses:</h4>
                        <p className="text-muted-foreground">
                          Most SGK14 courses are provided free of charge to support MP Board students' education.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Premium Services:</h4>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          <li>7-day money-back guarantee for premium mentorship programs</li>
                          <li>Refunds processed within 15 business days</li>
                          <li>No refund after course completion or certificate issuance</li>
                          <li>Technical issues will be resolved rather than refunded when possible</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Termination */}
                <Card>
                  <CardHeader>
                    <CardTitle>Account Termination</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">You may terminate your account:</h4>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          <li>At any time by contacting our support team</li>
                          <li>Your data will be deleted according to our Privacy Policy</li>
                          <li>Earned certificates will remain valid after account deletion</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">We may terminate your account for:</h4>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          <li>Violation of these Terms of Service</li>
                          <li>Inappropriate behavior or harassment of other users</li>
                          <li>Academic dishonesty or cheating</li>
                          <li>Illegal activities or security breaches</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact */}
                <Card>
                  <CardHeader>
                    <CardTitle>Questions About Terms</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      If you have questions about these Terms of Service, please contact us:
                    </p>
                    <div className="space-y-2 text-muted-foreground">
                      <p><strong>Email:</strong> legal@sgk14.com</p>
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

export default TermsOfService;

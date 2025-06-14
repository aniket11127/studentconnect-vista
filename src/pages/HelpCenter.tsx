
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Mail, MessageCircle } from 'lucide-react';

const HelpCenter = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How do I log in to my SGK14 account?',
      answer: 'You can log in using your registered email and password. If you forgot your password, click on "Forgot Password" on the login page and follow the instructions sent to your email.',
    },
    {
      question: 'I cannot access my courses. What should I do?',
      answer: 'First, ensure you are logged in with the correct account. If you still cannot access courses, check your internet connection. For technical issues, contact our support team at support@sgk14.com.',
    },
    {
      question: 'How do I get my course completion certificate?',
      answer: 'Certificates are automatically generated after you complete all modules, pass the assessments, and submit your final project. You can download your certificate from the "My Certificates" section in your profile.',
    },
    {
      question: 'I forgot my password. How can I reset it?',
      answer: 'Click on "Forgot Password" on the login page, enter your registered email address, and we will send you a password reset link. Check your spam folder if you do not receive the email within 5 minutes.',
    },
    {
      question: 'How can I contact student support?',
      answer: 'You can reach our student support team through: Email: support@sgk14.com, WhatsApp: +91 98765 43210, or use the live chat feature available on our website from 9 AM to 6 PM.',
    },
    {
      question: 'Can I download course materials for offline study?',
      answer: 'Yes, most course materials including PDFs, assignments, and reference documents can be downloaded for offline study. Video content requires an internet connection for security reasons.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Help Center | SGK14 EdTech</title>
      </Helmet>
      
      <main className="flex-grow pt-20 md:pt-24">
        <section className="py-12">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Help Center
                </h1>
                <p className="text-muted-foreground text-lg">
                  Find answers to common questions and get the support you need for your learning journey.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card className="text-center">
                  <CardHeader>
                    <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                    <CardTitle className="text-lg">Live Chat</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get instant help from our support team
                    </p>
                    <Button size="sm">Start Chat</Button>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <Mail className="h-8 w-8 text-primary mx-auto mb-2" />
                    <CardTitle className="text-lg">Email Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Send us your questions via email
                    </p>
                    <Button size="sm" variant="outline">
                      support@sgk14.com
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                    <CardTitle className="text-lg">WhatsApp</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Quick support via WhatsApp
                    </p>
                    <Button size="sm" variant="outline">
                      +91 98765 43210
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* FAQ Section */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <Card key={index}>
                      <CardHeader
                        className="cursor-pointer"
                        onClick={() => toggleFAQ(index)}
                      >
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg text-left">
                            {faq.question}
                          </CardTitle>
                          {openFAQ === index ? (
                            <ChevronUp className="h-5 w-5 text-primary" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-primary" />
                          )}
                        </div>
                      </CardHeader>
                      {openFAQ === index && (
                        <CardContent>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </div>

              {/* Still Need Help */}
              <div className="mt-12 bg-secondary/30 p-8 rounded-2xl text-center">
                <h3 className="text-xl font-bold mb-4">Still Need Help?</h3>
                <p className="text-muted-foreground mb-6">
                  Our support team is here to help you succeed. Don't hesitate to reach out with any questions about your courses, technical issues, or career guidance.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button>Contact Support</Button>
                  <Button variant="outline">Browse All FAQs</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HelpCenter;

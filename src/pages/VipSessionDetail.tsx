
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowLeft, Calendar, Clock, User, Building, MessageSquare, Award, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

// Sample VIP session data
const sessionDetails = [
  {
    id: '1',
    title: 'How AI is Changing the Future?',
    expert: 'Dr. Rajesh Sharma',
    expertRole: 'AI Scientist, IIT Bombay',
    expertBio: 'Dr. Rajesh Sharma is a leading AI researcher with over 15 years of experience in machine learning and neural networks. He completed his Ph.D. from MIT and has published numerous papers in top AI conferences.',
    date: 'April 10, 2025',
    time: '4:00 PM - 5:30 PM IST',
    duration: '1.5 hours',
    image: 'https://images.unsplash.com/photo-1677442135888-8bae225cd8c4?q=80&w=1932&auto=format&fit=crop',
    category: 'AI & Future Tech',
    status: 'Open',
    description: 'Explore the revolutionary impact of artificial intelligence across industries and how it's reshaping our future. Dr. Sharma will cover machine learning fundamentals, recent breakthroughs, and ethical considerations for future AI practitioners.',
    detailedDescription: 'This comprehensive session will take you through the evolution of artificial intelligence, from its early concepts to the cutting-edge technologies driving today's innovations. Dr. Sharma will explain complex AI concepts in simple terms, making them accessible to students at all levels.\n\nYou'll learn about how AI is transforming industries like healthcare, transportation, education, and entertainment. The session will also cover the ethical implications of AI and the responsibilities of future AI practitioners.\n\nThe interactive Q&A segment will allow you to get expert insights on your specific questions about AI career paths, learning resources, and emerging trends.',
    seats: 100,
    registered: 42,
    learningOutcomes: [
      'Understand the fundamental concepts of AI and machine learning',
      'Recognize how AI is being applied across different industries',
      'Identify emerging trends and future directions in AI research',
      'Appreciate the ethical considerations in AI development',
      'Discover potential career paths in the field of artificial intelligence'
    ],
    agenda: [
      { title: 'Introduction to AI: Past, Present, and Future', duration: '20 minutes' },
      { title: 'Key Machine Learning Concepts and Applications', duration: '25 minutes' },
      { title: 'Industry Applications and Case Studies', duration: '20 minutes' },
      { title: 'Ethical Considerations in AI Development', duration: '15 minutes' },
      { title: 'Q&A Session', duration: '10 minutes' }
    ],
    prerequisites: [
      'Basic understanding of computer science concepts',
      'Curiosity about technology and its applications',
      'No advanced mathematical knowledge required'
    ]
  },
  {
    id: '2',
    title: 'Mastering React.js & Web 3.0',
    expert: 'Neha Kapoor',
    expertRole: 'Senior Developer, Google',
    expertBio: 'Neha Kapoor is a senior developer at Google with extensive experience in building modern web applications. She specializes in React.js and has been at the forefront of Web 3.0 technologies.',
    date: 'April 15, 2025',
    time: '5:00 PM - 6:30 PM IST',
    duration: '1.5 hours',
    image: 'https://images.unsplash.com/photo-1573495612937-f02b92648e5c?q=80&w=2069&auto=format&fit=crop',
    category: 'Web Development Mastery',
    status: 'Open',
    description: 'Learn the most in-demand web development skills with Google's senior developer. This session covers React.js best practices, component architecture, and how Web 3.0 technologies are creating new opportunities for developers.',
    detailedDescription: 'This hands-on session will take you through the modern web development landscape, with a focus on React.js and emerging Web 3.0 technologies. Neha will share insider knowledge from her experience at Google, helping you understand what it takes to build professional-grade web applications.\n\nThe session will cover component-based architecture, state management strategies, performance optimization techniques, and how to integrate with blockchain and decentralized technologies.\n\nYou'll leave with practical knowledge that you can immediately apply to your own projects, as well as insights into how the web is evolving toward a more decentralized future.',
    seats: 75,
    registered: 31,
    learningOutcomes: [
      'Understand React.js component architecture and best practices',
      'Learn efficient state management techniques',
      'Explore Web 3.0 concepts and technologies',
      'Discover how to optimize React applications for performance',
      'Gain insights into professional development workflows'
    ],
    agenda: [
      { title: 'React.js Fundamentals and Component Architecture', duration: '25 minutes' },
      { title: 'State Management and Hooks', duration: '20 minutes' },
      { title: 'Introduction to Web 3.0 Technologies', duration: '20 minutes' },
      { title: 'Building Decentralized Applications (dApps)', duration: '15 minutes' },
      { title: 'Q&A and Code Review', duration: '10 minutes' }
    ],
    prerequisites: [
      'Basic JavaScript knowledge',
      'Familiarity with HTML and CSS',
      'Understanding of web development concepts',
      'No blockchain experience required'
    ]
  },
  {
    id: '3',
    title: 'How to Stay Safe Online?',
    expert: 'Rahul Mehta',
    expertRole: 'Cybersecurity Analyst, Microsoft',
    expertBio: 'Rahul Mehta is a cybersecurity analyst at Microsoft with expertise in threat detection and prevention. He has helped numerous organizations strengthen their security posture and educates users on safe online practices.',
    date: 'April 20, 2025',
    time: '3:00 PM - 4:30 PM IST',
    duration: '1.5 hours',
    image: 'https://images.unsplash.com/photo-1614064548237-096d7f2aea8d?q=80&w=2070&auto=format&fit=crop',
    category: 'Cybersecurity Essentials',
    status: 'Open',
    description: 'Discover essential cybersecurity practices to protect yourself in the digital world. This session covers threat detection, secure browsing habits, password management, and how to recognize common online scams and attacks.',
    detailedDescription: 'In this critical session, Microsoft cybersecurity expert Rahul Mehta will guide you through the essentials of staying safe in our increasingly digital world. As cyber threats continue to evolve, understanding how to protect yourself online has never been more important.\n\nYou'll learn practical strategies for securing your digital identity, recognizing phishing attempts and social engineering tactics, implementing strong password practices, and safeguarding your personal information across various platforms.\n\nThe session will include real-world examples of common cyber attacks and interactive demonstrations of security tools and techniques that you can implement immediately after the session.',
    seats: 120,
    registered: 53,
    learningOutcomes: [
      'Identify common cyber threats and attack vectors',
      'Implement strong password management techniques',
      'Recognize phishing attempts and social engineering tactics',
      'Understand encryption and secure communication methods',
      'Learn how to protect personal data across different platforms'
    ],
    agenda: [
      { title: 'The Current Cybersecurity Landscape', duration: '15 minutes' },
      { title: 'Common Threats and Attack Vectors', duration: '20 minutes' },
      { title: 'Practical Security Measures for Everyday Users', duration: '25 minutes' },
      { title: 'Tools and Resources for Enhanced Protection', duration: '15 minutes' },
      { title: 'Q&A and Security Scenarios', duration: '15 minutes' }
    ],
    prerequisites: [
      'Basic computer and internet knowledge',
      'Interest in improving personal digital security',
      'No technical cybersecurity background required'
    ]
  }
];

const VipSessionDetail = () => {
  const { id } = useParams();
  const [isRegistered, setIsRegistered] = useState(false);
  
  const session = sessionDetails.find(session => session.id === id);
  
  if (!session) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-20">
          <div className="container py-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Session Not Found</h2>
            <p className="text-muted-foreground mb-8">The session you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/vip-sessions">Browse All Sessions</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleRegister = () => {
    setIsRegistered(true);
    toast.success("Successfully registered for the session!", {
      description: "You'll receive a confirmation email with session details.",
      action: {
        label: "View My Sessions",
        onClick: () => console.log("Navigate to My Sessions"),
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20">
        <section className="bg-secondary/30 py-12">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/3 space-y-6">
                <div>
                  <Link to="/vip-sessions" className="inline-flex items-center text-sm text-primary hover:underline mb-4">
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Back to All Sessions
                  </Link>
                  <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {session.category}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                    {session.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-primary" />
                      {session.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-primary" />
                      {session.time}
                    </div>
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4 text-primary" />
                      {session.expert}
                    </div>
                  </div>
                </div>
                
                <div className="relative overflow-hidden rounded-xl">
                  <img 
                    src={session.image} 
                    alt={session.title} 
                    className="w-full h-auto object-cover rounded-xl"
                  />
                </div>
                
                <Tabs defaultValue="about" className="w-full">
                  <TabsList className="w-full max-w-md grid grid-cols-4">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="expert">Expert</TabsTrigger>
                    <TabsTrigger value="agenda">Agenda</TabsTrigger>
                    <TabsTrigger value="faq">FAQ</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="about" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">About This Session</h3>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {session.detailedDescription}
                      </p>
                      
                      <h3 className="text-xl font-semibold mt-8">What You'll Learn</h3>
                      <ul className="space-y-2">
                        {session.learningOutcomes.map((outcome, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <h3 className="text-xl font-semibold mt-8">Prerequisites</h3>
                      <ul className="space-y-2">
                        {session.prerequisites.map((prerequisite, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                            <span>{prerequisite}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="expert" className="space-y-4 mt-6">
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                          {session.expert.split(' ').map(name => name[0]).join('')}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{session.expert}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mb-4">
                          <Building className="h-4 w-4 mr-1" />
                          {session.expertRole}
                        </div>
                        <p className="text-muted-foreground">
                          {session.expertBio}
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="agenda" className="space-y-4 mt-6">
                    <h3 className="text-xl font-semibold">Session Agenda</h3>
                    <div className="space-y-4">
                      {session.agenda.map((item, index) => (
                        <div key={index} className="flex justify-between items-start border-b border-border pb-4 last:border-0">
                          <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold mr-3">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-medium">{item.title}</h4>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {item.duration}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="faq" className="space-y-4 mt-6">
                    <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Do I need to have prior knowledge in this field?</AccordionTrigger>
                        <AccordionContent>
                          This session is designed to be accessible to beginners while still providing value to those with some experience. Check the prerequisites section for specific requirements.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>Will I receive a certificate after attending?</AccordionTrigger>
                        <AccordionContent>
                          Yes, all participants who attend the full session will receive a certificate of participation that can be added to your profile and shared on LinkedIn.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>What if I can't attend live? Will there be a recording?</AccordionTrigger>
                        <AccordionContent>
                          Yes, registered participants will have access to a recording of the session for 30 days after the event. However, we recommend attending live to participate in the Q&A.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-4">
                        <AccordionTrigger>How do I prepare for the session?</AccordionTrigger>
                        <AccordionContent>
                          You'll receive a preparation email 24 hours before the session with any materials you should review and technical requirements for joining.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-5">
                        <AccordionTrigger>Can I ask questions during the session?</AccordionTrigger>
                        <AccordionContent>
                          Absolutely! There will be a dedicated Q&A segment, and you can also submit questions in advance when you register for the session.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="lg:w-1/3">
                <Card className="sticky top-24">
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div className="text-center p-4 rounded-lg bg-primary/10">
                        <div className="text-sm text-muted-foreground">Registration Status</div>
                        <div className="text-xl font-semibold text-primary">
                          {isRegistered ? "You're Registered!" : "Open for Registration"}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Available Seats</span>
                          <span className="font-medium">{session.seats - session.registered} / {session.seats}</span>
                        </div>
                        <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-primary h-full rounded-full" 
                            style={{ width: `${(session.registered / session.seats) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-3 rounded-lg bg-secondary/30">
                          <div className="text-sm text-muted-foreground">Date</div>
                          <div className="font-medium">{session.date}</div>
                        </div>
                        <div className="p-3 rounded-lg bg-secondary/30">
                          <div className="text-sm text-muted-foreground">Duration</div>
                          <div className="font-medium">{session.duration}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Award className="h-5 w-5 text-primary mr-2" />
                          <span>Certificate of Participation</span>
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="h-5 w-5 text-primary mr-2" />
                          <span>Live Q&A with Expert</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-primary mr-2" />
                          <span>Session Recording Access</span>
                        </div>
                      </div>
                      
                      {isRegistered ? (
                        <div className="space-y-3">
                          <Button className="w-full" variant="outline">
                            Add to Calendar
                          </Button>
                          <Button className="w-full" variant="outline">
                            Submit Questions
                          </Button>
                          <Button className="w-full" variant="destructive">
                            Cancel Registration
                          </Button>
                        </div>
                      ) : (
                        <Button className="w-full" onClick={handleRegister}>
                          Reserve My Spot
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default VipSessionDetail;

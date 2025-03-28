
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight, Calendar, Clock, Bell, Award, MessageSquare, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from 'react-router-dom';

// Sample VIP session data
const upcomingSessions = [
  {
    id: '1',
    title: 'How AI is Changing the Future?',
    expert: 'Dr. Rajesh Sharma',
    expertRole: 'AI Scientist, IIT Bombay',
    date: 'April 10, 2025',
    time: '4:00 PM - 5:30 PM IST',
    image: 'https://images.unsplash.com/photo-1677442135888-8bae225cd8c4?q=80&w=1932&auto=format&fit=crop',
    category: 'AI & Future Tech',
    status: 'Open',
    description: 'Explore the revolutionary impact of artificial intelligence across industries and how it\'s reshaping our future. Dr. Sharma will cover machine learning fundamentals, recent breakthroughs, and ethical considerations for future AI practitioners.',
    seats: 100,
    registered: 42,
  },
  {
    id: '2',
    title: 'Mastering React.js & Web 3.0',
    expert: 'Neha Kapoor',
    expertRole: 'Senior Developer, Google',
    date: 'April 15, 2025',
    time: '5:00 PM - 6:30 PM IST',
    image: 'https://images.unsplash.com/photo-1573495612937-f02b92648e5c?q=80&w=2069&auto=format&fit=crop',
    category: 'Web Development Mastery',
    status: 'Open',
    description: 'Learn the most in-demand web development skills with Google\'s senior developer. This session covers React.js best practices, component architecture, and how Web 3.0 technologies are creating new opportunities for developers.',
    seats: 75,
    registered: 31,
  },
  {
    id: '3',
    title: 'How to Stay Safe Online?',
    expert: 'Rahul Mehta',
    expertRole: 'Cybersecurity Analyst, Microsoft',
    date: 'April 20, 2025',
    time: '3:00 PM - 4:30 PM IST',
    image: 'https://images.unsplash.com/photo-1614064548237-096d7f2aea8d?q=80&w=2070&auto=format&fit=crop',
    category: 'Cybersecurity Essentials',
    status: 'Open',
    description: 'Discover essential cybersecurity practices to protect yourself in the digital world. This session covers threat detection, secure browsing habits, password management, and how to recognize common online scams and attacks.',
    seats: 120,
    registered: 53,
  },
];

const pastSessions = [
  {
    id: '4',
    title: 'Digital Marketing Essentials',
    expert: 'Priya Malhotra',
    expertRole: 'Marketing Director, Amazon India',
    date: 'March 25, 2025',
    time: '4:30 PM - 6:00 PM IST',
    image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=2062&auto=format&fit=crop',
    category: 'Digital Marketing',
    status: 'Completed',
    description: 'A comprehensive overview of digital marketing strategies that drive results. Learn about SEO, content marketing, social media, and analytics from an industry leader.',
    recording: 'https://example.com/recording1',
  },
  {
    id: '5',
    title: 'Financial Literacy for Students',
    expert: 'Vikram Singh',
    expertRole: 'Financial Advisor, HDFC Bank',
    date: 'March 15, 2025',
    time: '5:00 PM - 6:30 PM IST',
    image: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=2070&auto=format&fit=crop',
    category: 'Personal Finance',
    status: 'Completed',
    description: 'Essential financial knowledge every student should know. This session covers budgeting, saving, investing basics, and planning for education expenses.',
    recording: 'https://example.com/recording2',
  },
];

const registeredSessions = [
  {
    id: '1',
    title: 'How AI is Changing the Future?',
    expert: 'Dr. Rajesh Sharma',
    date: 'April 10, 2025',
    time: '4:00 PM - 5:30 PM IST',
    image: 'https://images.unsplash.com/photo-1677442135888-8bae225cd8c4?q=80&w=1932&auto=format&fit=crop',
    category: 'AI & Future Tech',
    status: 'Registered',
    countdown: '15 days',
  },
];

const VipSessionsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20">
        <section className="bg-secondary/30 py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Expert Knowledge Sharing
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                VIP Expert Sessions
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Exclusive live sessions with industry experts to accelerate your learning and career growth
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button size="lg" variant="default">
                  <Bell className="mr-2 h-4 w-4" />
                  Get Session Notifications
                </Button>
                <Button size="lg" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Add to My Calendar
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <Tabs defaultValue="upcoming" className="w-full" onValueChange={setActiveTab}>
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
                  <TabsTrigger value="registered">My Sessions</TabsTrigger>
                  <TabsTrigger value="past">Past Sessions</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="upcoming" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingSessions.map((session) => (
                    <Card key={session.id} className="h-full flex flex-col overflow-hidden">
                      <div className="relative">
                        <img 
                          src={session.image} 
                          alt={session.title} 
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-3 left-3 px-3 py-1 bg-primary/90 text-white text-xs font-medium rounded-full">
                          {session.category}
                        </div>
                        <div className="absolute top-3 right-3 px-3 py-1 bg-green-500/90 text-white text-xs font-medium rounded-full">
                          {session.status}
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{session.title}</CardTitle>
                        <CardDescription>
                          <div className="flex items-center mt-1 text-sm font-medium">
                            <User className="mr-1 h-4 w-4 text-primary" />
                            <span>{session.expert}</span>
                          </div>
                          <div className="text-xs text-muted-foreground ml-5">{session.expertRole}</div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2 flex-grow">
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-2 h-4 w-4 text-primary" />
                          {session.date}
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="mr-2 h-4 w-4 text-primary" />
                          {session.time}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-3 mt-2">
                          {session.description}
                        </p>
                        <div className="text-xs text-muted-foreground mt-2">
                          {session.registered} / {session.seats} seats registered
                        </div>
                        <div className="w-full bg-secondary/50 h-1.5 rounded-full overflow-hidden mt-1">
                          <div 
                            className="bg-primary h-full rounded-full" 
                            style={{ width: `${(session.registered / session.seats) * 100}%` }}
                          ></div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button className="w-full" asChild>
                          <Link to={`/vip-sessions/${session.id}`}>
                            Reserve My Spot
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="registered" className="space-y-6">
                {registeredSessions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {registeredSessions.map((session) => (
                      <Card key={session.id} className="h-full flex flex-col overflow-hidden">
                        <div className="relative">
                          <img 
                            src={session.image} 
                            alt={session.title} 
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-3 left-3 px-3 py-1 bg-primary/90 text-white text-xs font-medium rounded-full">
                            {session.category}
                          </div>
                          <div className="absolute top-3 right-3 px-3 py-1 bg-blue-500/90 text-white text-xs font-medium rounded-full">
                            {session.status}
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle className="text-xl">{session.title}</CardTitle>
                          <CardDescription>
                            <div className="flex items-center mt-1 text-sm font-medium">
                              <User className="mr-1 h-4 w-4 text-primary" />
                              <span>{session.expert}</span>
                            </div>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 flex-grow">
                          <div className="flex items-center text-sm">
                            <Calendar className="mr-2 h-4 w-4 text-primary" />
                            {session.date}
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="mr-2 h-4 w-4 text-primary" />
                            {session.time}
                          </div>
                          <div className="mt-4 p-3 rounded-md bg-primary/10 text-center">
                            <div className="text-sm font-medium text-primary">Starts in:</div>
                            <div className="text-2xl font-bold">{session.countdown}</div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0 flex gap-2">
                          <Button variant="outline" className="flex-1">
                            Add to Calendar
                          </Button>
                          <Button variant="outline" className="flex-1">
                            Cancel Registration
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/50">
                      <Calendar className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">No Registered Sessions Yet</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-6">
                      You haven't registered for any upcoming VIP sessions. Browse our upcoming sessions and reserve your spot!
                    </p>
                    <Button onClick={() => setActiveTab('upcoming')}>
                      View Upcoming Sessions
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="past" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastSessions.map((session) => (
                    <Card key={session.id} className="h-full flex flex-col overflow-hidden">
                      <div className="relative">
                        <img 
                          src={session.image} 
                          alt={session.title} 
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-3 left-3 px-3 py-1 bg-primary/90 text-white text-xs font-medium rounded-full">
                          {session.category}
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{session.title}</CardTitle>
                        <CardDescription>
                          <div className="flex items-center mt-1 text-sm font-medium">
                            <User className="mr-1 h-4 w-4 text-primary" />
                            <span>{session.expert}</span>
                          </div>
                          <div className="text-xs text-muted-foreground ml-5">{session.expertRole}</div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2 flex-grow">
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-2 h-4 w-4 text-primary" />
                          {session.date}
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="mr-2 h-4 w-4 text-primary" />
                          {session.time}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-3 mt-2">
                          {session.description}
                        </p>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button className="w-full" variant="secondary">
                          Watch Recording
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default VipSessionsPage;

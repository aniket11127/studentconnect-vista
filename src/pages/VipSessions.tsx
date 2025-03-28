
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
    title: 'Govt NDA Motivational Session',
    expert: 'Air Vice Marshal',
    expertRole: 'Former Defense Officer',
    date: 'April 10, 2025',
    time: '4:00 PM - 5:30 PM IST',
    image: 'https://images.unsplash.com/photo-1677442135888-8bae225cd8c4?q=80&w=1932&auto=format&fit=crop',
    category: 'Defense Career',
    status: 'Open',
    description: 'Explore the rewarding career path in the National Defence Academy. Learn about the selection process, training, and life as a defense officer from someone who\'s been there.',
    seats: 100,
    registered: 42,
  },
  {
    id: '2',
    title: 'JEE IIT & GATE Preparation',
    expert: 'Prof. Nitin Sharma',
    expertRole: 'IIT Professor',
    date: 'April 15, 2025',
    time: '5:00 PM - 6:30 PM IST',
    image: 'https://images.unsplash.com/photo-1573495612937-f02b92648e5c?q=80&w=2069&auto=format&fit=crop',
    category: 'Engineering Entrance',
    status: 'Open',
    description: 'Master the techniques needed to crack JEE and GATE exams. This session covers proven study strategies, important topics, and time management skills necessary for success.',
    seats: 75,
    registered: 31,
  },
  {
    id: '3',
    title: 'NEET & Smart Study Session',
    expert: 'Prof. MD',
    expertRole: 'Medical Sciences Expert',
    date: 'April 20, 2025',
    time: '3:00 PM - 4:30 PM IST',
    image: 'https://images.unsplash.com/photo-1614064548237-096d7f2aea8d?q=80&w=2070&auto=format&fit=crop',
    category: 'Medical Entrance',
    status: 'Open',
    description: 'Learn effective techniques for NEET preparation with smart study methods. This session covers important medical concepts, memory techniques, and exam strategies.',
    seats: 120,
    registered: 53,
  },
];

const VipSessionsPage = () => {
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
            <div className="space-y-6">
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
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default VipSessionsPage;

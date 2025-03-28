
import { ArrowRight, Calendar, Clock, Award, MessageSquare, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Sample VIP session data
const vipSessions = [
  {
    id: '1',
    title: 'How AI is Changing the Future?',
    expert: 'Dr. Rajesh Sharma',
    expertRole: 'AI Scientist, IIT Bombay',
    date: 'April 10, 2025',
    image: 'https://images.unsplash.com/photo-1677442135888-8bae225cd8c4?q=80&w=1932&auto=format&fit=crop',
    category: 'AI & Future Tech',
    status: 'Open',
  },
  {
    id: '2',
    title: 'Mastering React.js & Web 3.0',
    expert: 'Neha Kapoor',
    expertRole: 'Senior Developer, Google',
    date: 'April 15, 2025',
    image: 'https://images.unsplash.com/photo-1573495612937-f02b92648e5c?q=80&w=2069&auto=format&fit=crop',
    category: 'Web Development Mastery',
    status: 'Open',
  },
  {
    id: '3',
    title: 'How to Stay Safe Online?',
    expert: 'Rahul Mehta',
    expertRole: 'Cybersecurity Analyst, Microsoft',
    date: 'April 20, 2025',
    image: 'https://images.unsplash.com/photo-1614064548237-096d7f2aea8d?q=80&w=2070&auto=format&fit=crop',
    category: 'Cybersecurity Essentials',
    status: 'Open',
  },
];

const VipSessions = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-[-1] opacity-40">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
      </div>
      
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Expert-Led Learning
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Exclusive VIP Expert Sessions
            </h2>
            <p className="text-muted-foreground text-lg">
              Connect with industry experts in live interactive sessions designed to deepen your knowledge 
              and give you real-world insights into your field of interest.
            </p>
          </div>
          <div>
            <Button size="lg" asChild>
              <Link to="/vip-sessions">
                View All Sessions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-2xl glass hover-card-effect col-span-1 md:col-span-2 lg:col-span-1">
            <Calendar className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-xl font-medium mb-2">Live Interactive Sessions</h3>
            <p className="text-muted-foreground">Join real-time sessions with industry leaders and ask questions directly.</p>
          </div>
          <div className="p-6 rounded-2xl glass hover-card-effect">
            <MessageSquare className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-xl font-medium mb-2">Expert Mentorship</h3>
            <p className="text-muted-foreground">Get personalized feedback and guidance from seasoned professionals.</p>
          </div>
          <div className="p-6 rounded-2xl glass hover-card-effect">
            <Award className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-xl font-medium mb-2">Completion Certificates</h3>
            <p className="text-muted-foreground">Earn verified certificates to showcase your specialized learning.</p>
          </div>
          <div className="p-6 rounded-2xl glass hover-card-effect">
            <Briefcase className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-xl font-medium mb-2">Career Guidance</h3>
            <p className="text-muted-foreground">Learn about career paths and opportunities directly from professionals.</p>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-8 text-center">Upcoming VIP Sessions</h3>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {vipSessions.map((session) => (
              <CarouselItem key={session.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <Card className="h-full flex flex-col">
                  <div className="relative">
                    <img 
                      src={session.image} 
                      alt={session.title} 
                      className="w-full h-44 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 bg-primary/90 text-white text-xs font-medium rounded-full">
                      {session.category}
                    </div>
                    <div className="absolute top-3 right-3 px-3 py-1 bg-green-500/90 text-white text-xs font-medium rounded-full">
                      {session.status}
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{session.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center mt-1 text-sm font-medium">
                        <span className="text-primary">{session.expert}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{session.expertRole}</div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4 pt-0">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4 text-primary" />
                      {session.date}
                    </div>
                  </CardContent>
                  <CardFooter className="mt-auto pt-2">
                    <Button className="w-full" asChild>
                      <Link to={`/vip-sessions/${session.id}`}>
                        Register Now
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-8">
            <CarouselPrevious className="static transform-none mx-2" />
            <CarouselNext className="static transform-none mx-2" />
          </div>
        </Carousel>

        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" asChild>
            <Link to="/vip-sessions">
              Explore All VIP Sessions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VipSessions;

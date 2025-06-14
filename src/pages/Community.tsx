
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MessageCircle, Trophy, BookOpen, Calendar, ArrowRight } from 'lucide-react';

const Community = () => {
  const communityFeatures = [
    {
      icon: MessageCircle,
      title: 'Discussion Forums',
      description: 'Ask questions, share solutions, and collaborate on projects with fellow students.',
    },
    {
      icon: Trophy,
      title: 'Coding Challenges',
      description: 'Participate in weekly coding challenges and showcase your programming skills.',
    },
    {
      icon: BookOpen,
      title: 'Study Groups',
      description: 'Join subject-wise study groups for collaborative learning and peer support.',
    },
    {
      icon: Calendar,
      title: 'Live Events',
      description: 'Attend webinars, doubt-solving sessions, and career guidance workshops.',
    },
  ];

  const upcomingEvents = [
    {
      title: 'Python Programming Contest',
      date: 'Dec 20, 2024',
      time: '4:00 PM IST',
      participants: 150,
    },
    {
      title: 'Web Development Workshop',
      date: 'Dec 22, 2024',
      time: '6:00 PM IST',
      participants: 89,
    },
    {
      title: 'Career Guidance Session',
      date: 'Dec 25, 2024',
      time: '5:00 PM IST',
      participants: 200,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Community | SGK14 EdTech</title>
      </Helmet>
      
      <main className="flex-grow pt-20 md:pt-24">
        <section className="py-12">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Join SGK14 Community
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Connect with thousands of MP Board students, share knowledge, participate in coding challenges, and grow together in your learning journey.
                </p>
              </div>

              {/* Community Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">10,000+</div>
                  <div className="text-sm text-muted-foreground">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Daily Discussions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Study Groups</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">95%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
              </div>

              {/* Join Platforms */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-center">Connect With Us</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="text-center">
                    <CardHeader>
                      <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                        <MessageCircle className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle>Telegram Group</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Join our official Telegram group for instant doubt solving, study materials sharing, and community updates.
                      </p>
                      <Button className="w-full">
                        Join Telegram
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardHeader>
                      <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                        <Users className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle>Discord Server</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Join our Discord server for voice chats, screen sharing, and real-time collaboration on projects.
                      </p>
                      <Button variant="outline" className="w-full">
                        Join Discord
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Community Features */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Community Features</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {communityFeatures.map((feature, index) => {
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

              {/* Upcoming Events */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium text-lg">{event.title}</h3>
                            <p className="text-muted-foreground">
                              {event.date} at {event.time}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">
                              {event.participants} participants
                            </div>
                            <Button size="sm" className="mt-2">
                              Register
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Community Guidelines */}
              <div className="bg-secondary/30 p-8 rounded-2xl text-center">
                <h3 className="text-xl font-bold mb-4">Community Guidelines</h3>
                <p className="text-muted-foreground mb-6">
                  Our community thrives on respect, collaboration, and learning. Please be kind, helpful, and supportive to fellow students. Share knowledge, ask questions, and celebrate each other's achievements.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button>Read Full Guidelines</Button>
                  <Button variant="outline">Report Issue</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Community;

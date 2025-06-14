
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  const samplePosts = [
    {
      title: '5 Essential Python Projects Every Student Should Build',
      summary: 'Discover beginner-friendly Python projects that will strengthen your programming foundation and boost your resume.',
      author: 'Priya Sharma',
      date: 'Dec 10, 2024',
      category: 'Python',
    },
    {
      title: 'How to Create Your First Professional Website with HTML & CSS',
      summary: 'Step-by-step guide to building a responsive personal portfolio website from scratch.',
      author: 'Rahul Gupta',
      date: 'Dec 8, 2024',
      category: 'Web Development',
    },
    {
      title: 'MS Office Skills That Will Make You Stand Out in College Applications',
      summary: 'Master these advanced Excel and PowerPoint techniques to impress recruiters and professors.',
      author: 'Anjali Verma',
      date: 'Dec 5, 2024',
      category: 'MS Office',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Blog | SGK14 EdTech</title>
      </Helmet>
      
      <main className="flex-grow pt-20 md:pt-24">
        <section className="py-12">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  SGK14 Blog
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Stay updated with the latest in technology education, career guidance, and student success stories. Learn, grow, and get inspired.
                </p>
              </div>

              {/* Featured Posts */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
                <div className="space-y-6">
                  {samplePosts.map((post, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                            {post.category}
                          </span>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {post.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {post.author}
                          </div>
                        </div>
                        <CardTitle className="text-xl hover:text-primary cursor-pointer">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {post.summary}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" size="sm">
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
                <div className="flex flex-wrap gap-3">
                  {['Python Programming', 'Web Development', 'MS Office', 'SQL Database', 'Career Guidance', 'Student Stories', 'Interview Tips', 'Project Ideas'].map((category) => (
                    <Button key={category} variant="outline" size="sm">
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Contribute Section */}
              <div className="bg-secondary/30 p-8 rounded-2xl text-center">
                <h3 className="text-xl font-bold mb-4">Want to Contribute?</h3>
                <p className="text-muted-foreground mb-6">
                  Share your knowledge and experiences with fellow students. We welcome guest posts from students, teachers, and industry professionals.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button>Submit Article</Button>
                  <Button variant="outline">Writing Guidelines</Button>
                </div>
              </div>

              {/* Newsletter */}
              <div className="mt-12 text-center">
                <h3 className="text-lg font-medium mb-2">Stay Updated</h3>
                <p className="text-muted-foreground mb-4">
                  Get the latest blog posts and educational content delivered to your inbox.
                </p>
                <div className="flex gap-2 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 border border-border rounded-md"
                  />
                  <Button>Subscribe</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blog;

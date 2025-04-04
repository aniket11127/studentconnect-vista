
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Award, Calendar, Clock, Download } from 'lucide-react';
import { toast } from 'sonner';

const VipSessionDetail = () => {
  const { sessionId } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // In a real app, you would fetch this from an API
  const session = {
    id: sessionId || 'session-1',
    title: 'Digital Marketing Essentials',
    expert: 'Priya Malhotra',
    description: 'Learn the fundamentals of digital marketing from an industry expert. This session covers SEO, SEM, social media marketing, and content strategy.',
    date: 'April 10, 2025',
    time: '2:00 PM - 3:30 PM IST',
    duration: '90 minutes',
  };

  const handleCompletionCertificate = async () => {
    if (!user) {
      toast.error('You must be logged in to receive a certificate');
      return;
    }
    
    try {
      setLoading(true);
      
      const { data: sessionData } = await supabase.auth.getSession();
      
      const response = await fetch('/api/generate-certificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionData.session?.access_token}`
        },
        body: JSON.stringify({
          courseId: session.id,
          sessionTitle: session.title,
          expertName: session.expert
        })
      });
      
      const result = await response.json();
      
      if (!response.ok) throw new Error(result.error || 'Failed to generate certificate');
      
      toast.success('Certificate successfully generated!', {
        action: {
          label: 'View Certificates',
          onClick: () => window.location.href = '/certificates'
        }
      });
    } catch (error: any) {
      console.error('Error generating certificate:', error);
      toast.error('Failed to generate certificate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container">
          <Link to="/vip-sessions" className="inline-flex items-center text-sm text-primary hover:underline mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to VIP Sessions
          </Link>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">{session.title}</h1>
                <p className="text-muted-foreground mb-6">{session.description}</p>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{session.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{session.time} ({session.duration})</span>
                  </div>
                </div>
              </div>
              
              {/* Session content would go here */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Session Overview</h2>
                <Card>
                  <CardContent className="p-6">
                    <p className="mb-4">In this comprehensive VIP session, you'll learn from industry expert {session.expert} about the latest trends and strategies in digital marketing.</p>
                    <p className="mb-4">This session is designed for beginners and intermediate marketers who want to improve their digital marketing skills and stay ahead of the competition.</p>
                    <p>By the end of this session, you'll have actionable insights you can apply immediately to your marketing efforts.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div>
              <div className="sticky top-24 space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold mb-1">Session Expert</h3>
                      <p className="text-primary">{session.expert}</p>
                    </div>
                    
                    <div className="space-y-4">
                      <Button className="w-full" onClick={handleCompletionCertificate} disabled={loading}>
                        {loading ? 'Generating...' : 'Mark as Completed'}
                        <Award className="ml-2 h-4 w-4" />
                      </Button>
                      
                      <Button variant="outline" className="w-full">
                        Download Materials
                        <Download className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VipSessionDetail;

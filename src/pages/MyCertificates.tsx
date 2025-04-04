
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { CertificateCard } from '@/components/ui/Certificate';
import { Award, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Database } from '@/integrations/supabase/types';

// Define the Certificate type using the database types
interface Certificate {
  id: string;
  session_title: string;
  expert_name: string;
  completion_date: string;
  certificate_id: string;
}

const MyCertificates = () => {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCertificates() {
      if (!user) return;
      
      try {
        setLoading(true);
        // Properly type the query using the Database type
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .order('completion_date', { ascending: false });
          
        if (error) throw error;
        
        setCertificates(data || []);
      } catch (error: any) {
        console.error('Error fetching certificates:', error);
        toast.error('Failed to load certificates');
      } finally {
        setLoading(false);
      }
    }
    
    fetchCertificates();
  }, [user]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container">
          <div className="mb-8">
            <Link to="/dashboard" className="inline-flex items-center text-sm text-primary hover:underline mb-4">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold mb-2">My Certificates</h1>
            <p className="text-muted-foreground">View, download, and share your earned certificates</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-pulse text-muted-foreground">Loading certificates...</div>
            </div>
          ) : certificates.length > 0 ? (
            <div className="space-y-12">
              {certificates.map(certificate => (
                <div key={certificate.id}>
                  <h2 className="text-xl font-semibold mb-4">{certificate.session_title}</h2>
                  <CertificateCard 
                    studentName={user?.user_metadata?.name || 'Student'}
                    sessionTitle={certificate.session_title}
                    expertName={certificate.expert_name}
                    completionDate={new Date(certificate.completion_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                    certificateId={certificate.certificate_id}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-border rounded-lg">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/50">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">No Certificates Yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Complete VIP expert sessions to earn certificates that you can add to your portfolio.
              </p>
              <Button asChild>
                <Link to="/vip-sessions">Browse VIP Sessions</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyCertificates;

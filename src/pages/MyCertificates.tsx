
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CertificateCard } from '@/components/ui/Certificate';
import { Award, ArrowLeft } from 'lucide-react';

// Sample certificates data
const certificates = [
  {
    id: 'cert-001',
    sessionTitle: 'Digital Marketing Essentials',
    expertName: 'Priya Malhotra',
    completionDate: 'March 25, 2025',
    certificateId: 'SGK14-DM-2025-001',
  },
];

const MyCertificates = () => {
  const studentName = "Rahul Sharma"; // This would come from user profile in a real app
  
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
          
          {certificates.length > 0 ? (
            <div className="space-y-12">
              {certificates.map(certificate => (
                <div key={certificate.id}>
                  <h2 className="text-xl font-semibold mb-4">{certificate.sessionTitle}</h2>
                  <CertificateCard 
                    studentName={studentName}
                    sessionTitle={certificate.sessionTitle}
                    expertName={certificate.expertName}
                    completionDate={certificate.completionDate}
                    certificateId={certificate.certificateId}
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

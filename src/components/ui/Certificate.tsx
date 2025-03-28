
import { forwardRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type CertificateProps = {
  studentName: string;
  sessionTitle: string;
  expertName: string;
  completionDate: string;
  certificateId: string;
};

const Certificate = forwardRef<HTMLDivElement, CertificateProps>(
  ({ studentName, sessionTitle, expertName, completionDate, certificateId }, ref) => {
    return (
      <div 
        ref={ref}
        className="relative w-full max-w-4xl mx-auto aspect-[1.414/1] bg-white rounded-lg border border-gray-200 p-8 shadow-sm"
      >
        {/* Certificate Border */}
        <div className="absolute inset-4 border-4 border-primary/20 rounded-lg"></div>
        <div className="absolute inset-6 border border-primary/10 rounded-lg"></div>
        
        {/* Certificate Content */}
        <div className="flex flex-col items-center justify-between h-full text-center pt-10 pb-8">
          <div>
            <div className="text-primary text-xl font-medium mb-2">SGK14 EdTech</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Certificate of Completion</h1>
            <div className="w-32 h-1 bg-primary/50 mx-auto mb-8"></div>
            
            <p className="text-lg text-muted-foreground mb-6">This is to certify that</p>
            <h2 className="text-3xl font-bold text-primary mb-6">{studentName}</h2>
            <p className="text-lg text-muted-foreground mb-2">has successfully completed the VIP Expert Session</p>
            <h3 className="text-2xl font-bold mb-8">"{sessionTitle}"</h3>
            <p className="text-lg text-muted-foreground">conducted by</p>
            <h4 className="text-xl font-medium mb-8">{expertName}</h4>
          </div>
          
          <div className="w-full">
            <div className="flex justify-between items-center mt-10">
              <div className="text-left">
                <div className="text-sm text-muted-foreground mb-1">Date of Completion</div>
                <div className="font-medium">{completionDate}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground mb-1">Certificate ID</div>
                <div className="font-medium">{certificateId}</div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-6">
              <div className="w-32 border-t-2 border-gray-400 pt-1 text-left">
                <div className="text-sm font-medium">Amit Singh</div>
                <div className="text-xs text-muted-foreground">Director, SGK14</div>
              </div>
              <div className="w-32 border-t-2 border-gray-400 pt-1 text-right">
                <div className="text-sm font-medium">{expertName.split(' ')[0]}</div>
                <div className="text-xs text-muted-foreground">Session Expert</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-14 left-14 w-20 h-20 rounded-full border-8 border-primary/10 -z-10"></div>
        <div className="absolute bottom-14 right-14 w-20 h-20 rounded-full border-8 border-primary/10 -z-10"></div>
      </div>
    );
  }
);

Certificate.displayName = "Certificate";

type CertificateCardProps = {
  studentName: string;
  sessionTitle: string;
  expertName: string;
  completionDate: string;
  certificateId: string;
};

export const CertificateCard = ({ 
  studentName, 
  sessionTitle, 
  expertName, 
  completionDate, 
  certificateId 
}: CertificateCardProps) => {
  const handleDownload = () => {
    // In a real implementation, this would trigger a PDF download
    console.log('Download certificate');
  };

  const handleShare = () => {
    // In a real implementation, this would open sharing options
    console.log('Share certificate');
  };

  return (
    <div className="space-y-4">
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-4">
          <Certificate 
            studentName={studentName}
            sessionTitle={sessionTitle}
            expertName={expertName}
            completionDate={completionDate}
            certificateId={certificateId}
          />
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button className="flex-1" onClick={handleDownload}>
          Download Certificate
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" className="flex-1" onClick={handleShare}>
          Share on LinkedIn
        </Button>
      </div>
    </div>
  );
};

export default Certificate;

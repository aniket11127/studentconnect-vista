
import { Link } from 'react-router-dom';
import { Calendar, Clock, Award, MessageSquare, Briefcase } from 'lucide-react';

const VipSessions = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden" aria-labelledby="vip-sessions-heading">
      {/* Background decoration */}
      <div className="absolute inset-0 z-[-1] opacity-40" aria-hidden="true">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
      </div>
      
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Expert-Led Learning
            </div>
            <h2 id="vip-sessions-heading" className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Exclusive VIP Expert Sessions
            </h2>
            <p className="text-muted-foreground text-lg">
              Connect with industry experts in live interactive sessions designed to deepen your knowledge 
              and give you real-world insights into your field of interest.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-2xl glass hover-card-effect col-span-1 md:col-span-2 lg:col-span-1">
            <Calendar className="w-12 h-12 mb-4 text-primary" aria-hidden="true" />
            <h3 className="text-xl font-medium mb-2">Live Interactive Sessions</h3>
            <p className="text-muted-foreground">Join real-time sessions with industry leaders and ask questions directly.</p>
          </div>
          <div className="p-6 rounded-2xl glass hover-card-effect">
            <MessageSquare className="w-12 h-12 mb-4 text-primary" aria-hidden="true" />
            <h3 className="text-xl font-medium mb-2">Expert Mentorship</h3>
            <p className="text-muted-foreground">Get personalized feedback and guidance from seasoned professionals.</p>
          </div>
          <div className="p-6 rounded-2xl glass hover-card-effect">
            <Award className="w-12 h-12 mb-4 text-primary" aria-hidden="true" />
            <h3 className="text-xl font-medium mb-2">Completion Certificates</h3>
            <p className="text-muted-foreground">Earn verified certificates to showcase your specialized learning.</p>
          </div>
          <div className="p-6 rounded-2xl glass hover-card-effect">
            <Briefcase className="w-12 h-12 mb-4 text-primary" aria-hidden="true" />
            <h3 className="text-xl font-medium mb-2">Career Guidance</h3>
            <p className="text-muted-foreground">Learn about career paths and opportunities directly from professionals.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VipSessions;

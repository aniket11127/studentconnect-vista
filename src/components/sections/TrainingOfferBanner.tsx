
import { GraduationCap, Award, Briefcase, Calendar, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const TrainingOfferBanner = () => {
  return (
    <section className="py-16 relative overflow-hidden" aria-labelledby="training-program">
      {/* Animated Background decoration */}
      <div className="absolute inset-0 z-[-1] opacity-40" aria-hidden="true">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-float-slow" />
      </div>

      <div className="container">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          {/* Pill-style label on top */}
          <div className="inline-block">
            <Badge 
              variant="default" 
              className="px-4 py-1.5 text-sm font-semibold shadow-lg bg-gradient-to-r from-primary to-blue-500 border-none"
            >
              <span className="relative animate-pulse-subtle">
                Skill + Certification + Internship = Future Ready
              </span>
            </Badge>
          </div>

          <h2 id="training-program" className="text-3xl md:text-4xl font-bold relative z-10 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Skill-Based Career Training Program
          </h2>
          
          {/* Four separate cards in a responsive grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Program Duration Card */}
            <Card className="overflow-hidden border border-primary/10 bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 shadow-md rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-7 w-7 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold">Program Duration</h3>
                    <p className="text-muted-foreground mt-1">From Class 8th to 12th</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills You'll Gain Card */}
            <Card className="overflow-hidden border border-primary/10 bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 shadow-md rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="h-7 w-7 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold">Skills You'll Gain</h3>
                    <p className="text-muted-foreground mt-1">MS Office, Coding, Communication, Resume, AI, LinkedIn, HTML/CSS, Python, SQL, Presentation Skills</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Program Benefits Card */}
            <Card className="overflow-hidden border border-primary/10 bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 shadow-md rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                    <Award className="h-7 w-7 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold">Program Benefits</h3>
                    <p className="text-muted-foreground mt-1">Certification, Career Readiness, Internship, IIT/IIM Trainers</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Career Opportunities Card */}
            <Card className="overflow-hidden border border-primary/10 bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 shadow-md rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="h-7 w-7 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold">Career Opportunities</h3>
                    <p className="text-muted-foreground mt-1">Real-world projects, internship placement assistance, job-ready portfolio, resume building, early industry exposure, and placement support after 12th.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Call to Action Button */}
          <div className="pt-6">
            <Button 
              size="lg" 
              className="group relative overflow-hidden shadow-lg"
            >
              <Link to="/curriculum" className="flex items-center">
                Know More
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingOfferBanner;


import { GraduationCap, Award, Briefcase, Calendar, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const TrainingOfferBanner = () => {
  return (
    <section className="section-padding-mobile relative overflow-hidden" aria-labelledby="training-program">
      {/* Animated Background decoration */}
      <div className="absolute inset-0 z-[-1] opacity-40" aria-hidden="true">
        <div className="absolute top-1/4 right-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 left-1/4 w-40 h-40 sm:w-80 sm:h-80 bg-blue-400/20 rounded-full blur-3xl animate-float-slow" />
      </div>

      <div className="container">
        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 lg:space-y-10">
          {/* Pill-style label on top */}
          <div className="inline-block">
            <Badge 
              variant="default" 
              className="px-3 py-1.5 sm:px-4 text-xs sm:text-sm font-semibold shadow-lg bg-gradient-to-r from-primary to-blue-500 border-none"
            >
              <span className="relative animate-pulse-subtle text-center">
                Skill + Certification + Internship = Future Ready
              </span>
            </Badge>
          </div>

          <h2 id="training-program" className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent text-center">
            Skill-Based Career Training Program
          </h2>
          
          {/* Four separate cards in a responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Our Program Card */}
            <Card className="overflow-hidden border border-primary/10 bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 shadow-md rounded-xl">
              <CardContent className="card-padding-mobile flex flex-col items-center justify-center text-center h-full min-h-[200px]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/15 flex items-center justify-center mb-4 sm:mb-5 flex-shrink-0">
                  <Calendar className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                </div>
                <h3 className="font-bold mb-2 text-center">Our Program</h3>
                <p className="text-blue-600 font-semibold text-sm mb-2 text-center">
                  Designed Specifically for Class 8th to 12th Students
                </p>
                <p className="text-gray-600 text-sm text-center">
                  A step-by-step learning journey across 4 years with support, skills, and certifications at every stage.
                </p>
              </CardContent>
            </Card>

            {/* Skills You'll Gain Card */}
            <Card className="overflow-hidden border border-primary/10 bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 shadow-md rounded-xl">
              <CardContent className="card-padding-mobile flex flex-col items-center justify-center text-center h-full min-h-[200px]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/15 flex items-center justify-center mb-4 sm:mb-5 flex-shrink-0">
                  <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                </div>
                <h3 className="font-bold mb-2 text-center">Skills You'll Gain</h3>
                <p className="text-muted-foreground text-center">
                  MS Office, Coding, Communication, Resume, AI, LinkedIn, HTML/CSS, Python, SQL, Presentation Skills
                </p>
              </CardContent>
            </Card>

            {/* Program Benefits Card */}
            <Card className="overflow-hidden border border-primary/10 bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 shadow-md rounded-xl">
              <CardContent className="card-padding-mobile flex flex-col items-center justify-center text-center h-full min-h-[200px]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/15 flex items-center justify-center mb-4 sm:mb-5 flex-shrink-0">
                  <Award className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                </div>
                <h3 className="font-bold mb-2 text-center">Program Benefits</h3>
                <p className="text-muted-foreground text-center">
                  Certification, Career Readiness, Internship, IIT/IIM Trainers
                </p>
              </CardContent>
            </Card>

            {/* Career Opportunities Card */}
            <Card className="overflow-hidden border border-primary/10 bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 shadow-md rounded-xl">
              <CardContent className="card-padding-mobile flex flex-col items-center justify-center text-center h-full min-h-[200px]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/15 flex items-center justify-center mb-4 sm:mb-5 flex-shrink-0">
                  <Briefcase className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                </div>
                <h3 className="font-bold mb-2 text-center">Career Opportunities</h3>
                <p className="text-muted-foreground text-center">
                  Real-world projects, internship placement assistance, job-ready portfolio, resume building, early industry exposure, and placement support after 12th.
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Call to Action Button */}
          <div className="pt-4 sm:pt-6">
            <Button 
              size="lg" 
              className="btn-mobile group relative overflow-hidden shadow-lg w-full sm:w-auto"
            >
              <Link to="/curriculum" className="flex items-center justify-center">
                Know More
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
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

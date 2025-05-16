
import { GraduationCap, Award, Briefcase, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const TrainingOfferBanner = () => {
  return (
    <section className="py-16 relative overflow-hidden" aria-labelledby="training-program">
      {/* Animated Background decoration */}
      <div className="absolute inset-0 z-[-1] opacity-40" aria-hidden="true">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-float-slow" />
      </div>

      <div className="container">
        <div className="max-w-5xl mx-auto">
          <Card className="relative overflow-hidden border border-primary/10 bg-gradient-to-br from-white to-secondary/30 backdrop-blur-sm shadow-lg dark:from-card dark:to-secondary/10">
            {/* Glowing elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl animate-pulse-slow [animation-delay:2s]" />
            
            {/* Badge - Now positioned prominently above the card */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge variant="default" className="px-4 py-1.5 text-xs font-semibold shadow-lg bg-gradient-to-r from-primary to-blue-500 border-none">
                <span className="relative animate-pulse-subtle">
                  Skill + Certification + Internship = Future Ready
                </span>
              </Badge>
            </div>
            
            <CardHeader className="pb-2 relative">
              <h2 id="training-program" className="text-3xl md:text-4xl font-bold text-center relative z-10 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Skill-Based Career Training Program
              </h2>
            </CardHeader>
            
            <CardContent className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div className="space-y-8">
                  {/* Duration - Improved spacing and icon size */}
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Program Duration</h3>
                      <p className="text-muted-foreground mt-1">From Class 8th to 12th (6 months–4 years)</p>
                    </div>
                  </div>
                  
                  {/* Benefits - Improved spacing and icon size */}
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                      <Award className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Program Benefits</h3>
                      <p className="text-muted-foreground mt-1">Certification, Career Readiness, Internship, IIT/IIM trainers</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-8">
                  {/* Skills - Improved spacing and icon size */}
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Skills You'll Gain</h3>
                      <p className="text-muted-foreground mt-1">MS Office, Coding, Communication, Resume, AI, LinkedIn</p>
                    </div>
                  </div>
                  
                  {/* Career - Improved spacing and icon size */}
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Career Opportunities</h3>
                      <p className="text-muted-foreground mt-1">Real-world projects and internship placement assistance</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-center pb-8 pt-6 relative z-10">
              <Button size="lg" className="group relative overflow-hidden shadow-lg">
                <Link to="/curriculum" className="flex items-center">
                  Know More
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TrainingOfferBanner;

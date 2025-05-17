
import React, { useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { FileText, GraduationCap, Rocket, Medal, Code, Calendar } from 'lucide-react';

// Define the curriculum data structure
interface Module {
  name: string;
  icon: React.ElementType;
}

interface ClassData {
  className: string;
  year: number;
  isCurrent?: boolean;
  modules: Module[];
  features: string[];
}

const LearningRoadmapSGK14 = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Curriculum data for each class
  const roadmapData: ClassData[] = [
    {
      className: "Class 8",
      year: 1,
      isCurrent: true,
      modules: [
        { name: "HTML", icon: Code },
        { name: "MS Word", icon: FileText },
        { name: "Excel", icon: FileText }
      ],
      features: ["Projects", "Exercises", "Certificate"]
    },
    {
      className: "Class 9",
      year: 2,
      modules: [
        { name: "HTML", icon: Code },
        { name: "MS Word", icon: FileText },
        { name: "Excel", icon: FileText }
      ],
      features: ["Projects", "Exercises", "Certificate"]
    },
    {
      className: "Class 10",
      year: 3,
      modules: [
        { name: "HTML", icon: Code },
        { name: "CSS", icon: Code },
        { name: "Python", icon: Rocket }
      ],
      features: ["Projects", "Exercises", "Certificate"]
    },
    {
      className: "Class 11",
      year: 4,
      modules: [
        { name: "HTML/CSS", icon: Code },
        { name: "SQL", icon: FileText },
        { name: "Python", icon: Rocket }
      ],
      features: ["Projects", "Exercises", "Certificate"]
    },
    {
      className: "Class 12",
      year: 5,
      modules: [
        { name: "HTML/CSS", icon: Code },
        { name: "SQL", icon: FileText },
        { name: "Python", icon: Rocket }
      ],
      features: ["Projects", "Exercises", "Certificate"]
    }
  ];

  // Feature icon mapping
  const featureIcons: Record<string, React.ElementType> = {
    "Projects": Medal,
    "Exercises": Calendar,
    "Certificate": GraduationCap
  };

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container">
        <div className="max-w-6xl mx-auto px-4">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-4">
              Your Learning Journey
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              A structured 5-year roadmap designed specifically for MP Board students from Class 8 to 12
            </p>
          </div>
          
          {/* Roadmap timeline - Scrollable on desktop, stacked on mobile */}
          <div ref={scrollRef} className="relative mb-10">
            {!isMobile && (
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-blue-100 -translate-y-1/2 z-0">
                <div className="h-full bg-primary" style={{ width: `${20 * roadmapData.findIndex(item => item.isCurrent) + 20}%` }} />
              </div>
            )}
            
            <ScrollArea className="w-full pb-4">
              <div className={`${isMobile ? 'flex flex-col space-y-8' : 'flex space-x-6'}`}>
                {roadmapData.map((classData, index) => (
                  <div 
                    key={classData.className} 
                    className={`relative ${isMobile ? 'w-full' : 'w-72 min-w-[18rem]'} flex-shrink-0 z-10`}
                  >
                    {/* Year indicator */}
                    <div className="absolute -top-3 left-4">
                      <Badge variant="outline" className="bg-white shadow-sm">
                        Year {classData.year}
                      </Badge>
                    </div>
                    
                    {/* Class card */}
                    <div 
                      className={`
                        h-full p-5 rounded-xl border transition-all duration-300
                        ${classData.isCurrent 
                          ? 'border-primary bg-gradient-to-br from-white to-blue-50 shadow-lg shadow-blue-100/50' 
                          : 'border-border bg-card hover:border-primary/40 hover:shadow-md'}
                      `}
                    >
                      {/* Class name header */}
                      <h3 className={`text-xl font-bold mb-4 ${classData.isCurrent ? 'text-primary' : ''}`}>
                        {classData.className}
                      </h3>
                      
                      {/* Progress dot for non-mobile */}
                      {!isMobile && (
                        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white bg-primary"></div>
                      )}
                      
                      {/* Modules */}
                      <div className="space-y-4 mb-5">
                        <h4 className="text-sm font-medium text-muted-foreground">Modules Covered:</h4>
                        <div className="space-y-2">
                          {classData.modules.map((module, i) => {
                            const Icon = module.icon;
                            return (
                              <div key={i} className="flex items-center gap-2">
                                <div className="w-6 h-6 flex-shrink-0 text-primary">
                                  <Icon size={20} />
                                </div>
                                <span className="text-sm">{module.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      {/* Features */}
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-3">Special Features:</h4>
                        <div className="flex flex-wrap gap-3">
                          {classData.features.map((feature, i) => {
                            const FeatureIcon = featureIcons[feature];
                            return (
                              <Badge 
                                key={i} 
                                variant="secondary"
                                className="flex items-center gap-1 py-1 px-2 bg-blue-50"
                              >
                                {FeatureIcon && <FeatureIcon size={14} className="text-primary" />}
                                <span className="text-xs">{feature}</span>
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          {/* CTA Button */}
          <div className="text-center mt-8">
            <Button className="px-6 py-2 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary transition-all duration-300 shadow-md hover:shadow-lg group">
              Explore Full Curriculum
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningRoadmapSGK14;

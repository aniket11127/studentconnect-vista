
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { FileText, Code, Rocket } from 'lucide-react';

// Define the curriculum data structure
interface Module {
  name: string;
  icon: React.ElementType;
}

interface TermData {
  term: number;
  className: string;
  modules: Module[];
  features: string[];
}

const SGK14LearningRoadmap = () => {
  // Curriculum data for each term
  const roadmapData: TermData[] = [
    {
      term: 1,
      className: "Class 8",
      modules: [
        { name: "HTML", icon: Code },
        { name: "MS Word", icon: FileText },
        { name: "Excel", icon: FileText }
      ],
      features: ["Hands-on Exercises", "Mini Projects", "Certification"]
    },
    {
      term: 2,
      className: "Class 9",
      modules: [
        { name: "HTML", icon: Code },
        { name: "MS Word", icon: FileText },
        { name: "Excel", icon: FileText }
      ],
      features: ["Hands-on Exercises", "Mini Projects", "Certification"]
    },
    {
      term: 3,
      className: "Class 10",
      modules: [
        { name: "HTML", icon: Code },
        { name: "CSS", icon: Code },
        { name: "Python", icon: Rocket }
      ],
      features: ["Hands-on Exercises", "Mini Projects", "Certification"]
    },
    {
      term: 4,
      className: "Class 11",
      modules: [
        { name: "HTML/CSS", icon: Code },
        { name: "SQL", icon: FileText },
        { name: "Python", icon: Rocket }
      ],
      features: ["Hands-on Exercises", "Mini Projects", "Certification"]
    },
    {
      term: 5,
      className: "Class 12",
      modules: [
        { name: "HTML/CSS", icon: Code },
        { name: "SQL", icon: FileText },
        { name: "Python", icon: Rocket }
      ],
      features: ["Hands-on Exercises", "Mini Projects", "Certification"]
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-2">
            5-Year Learning Roadmap
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            A comprehensive curriculum designed specifically for MP Board students from Class 8 to 12
          </p>
        </div>
        
        {/* Grid Layout - 5 columns on desktop/tablet, 1 column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
          {roadmapData.map((termData) => (
            <Card 
              key={termData.term}
              className="border border-blue-100 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              {/* Term Header */}
              <div className="bg-gradient-to-r from-primary/10 to-blue-400/10 p-4 border-b border-blue-100">
                <Badge 
                  className="mb-2 bg-primary/20 text-primary hover:bg-primary/30 font-medium px-3 py-1"
                >
                  Term {termData.term}
                </Badge>
                <h3 className="text-xl font-bold text-primary">
                  {termData.className}
                </h3>
              </div>
              
              <CardContent className="p-5">
                {/* Modules */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Modules Covered:</h4>
                  <div className="space-y-2">
                    {termData.modules.map((module, idx) => {
                      const ModuleIcon = module.icon;
                      return (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-6 h-6 flex-shrink-0 text-primary">
                            <ModuleIcon size={18} />
                          </div>
                          <span className="text-sm">{module.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Features */}
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Includes:</h4>
                  <ul className="space-y-1">
                    {termData.features.map((feature, idx) => (
                      <li key={idx} className="text-sm flex items-center gap-1">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SGK14LearningRoadmap;

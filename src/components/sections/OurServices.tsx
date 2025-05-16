
import React from 'react';
import { 
  Code, 
  FileCode, 
  Database, 
  FileSpreadsheet, 
  Laptop, 
  MessageSquare, 
  Rocket, 
  CheckCircle, 
  FileEdit, 
  GraduationCap, 
  Mic, 
  Smile, 
  Briefcase, 
  Users, 
  Brain, 
  Calendar, 
  Settings, 
  ArrowRight 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';

const OurServices = () => {
  const serviceCategories = [
    {
      title: "Skill-Based Learning Modules",
      items: [
        { icon: Code, text: "Python" },
        { icon: FileCode, text: "HTML & CSS" },
        { icon: Database, text: "SQL" },
        { icon: FileSpreadsheet, text: "Excel" },
        { icon: Laptop, text: "MS Office" },
        { icon: MessageSquare, text: "Prompt Engineering with ChatGPT & AI Tools" },
        { icon: Rocket, text: "Real-life mini & major projects" },
        { icon: CheckCircle, text: "Hands-on exercises after every concept" },
      ]
    },
    {
      title: "Career Development Services",
      items: [
        { icon: FileEdit, text: "Resume Writing & LinkedIn Profile Building" },
        { icon: GraduationCap, text: "Govt Exam Mentorship (JEE, NEET, NDA)" },
        { icon: Mic, text: "Public Speaking, Leadership, Group Discussions" },
        { icon: Smile, text: "Confidence Building & Communication Skills" },
        { icon: Briefcase, text: "Skill portfolio to boost college & job profiles" },
      ]
    },
    {
      title: "Mentorship & Support",
      items: [
        { icon: Users, text: "Sessions with experts from IITs, Defence, MNCs" },
        { icon: Brain, text: "AI-assisted smart revision and doubt solving" },
        { icon: Calendar, text: "Quarterly / Half-Yearly / Annual plans" },
        { icon: Settings, text: "Custom weekly model (Tech + PD + AI support)" },
      ]
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-4">
              Our Services
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Comprehensive learning solutions designed to build skills, confidence, and career readiness
            </p>
          </div>
          
          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceCategories.map((category, index) => (
              <Card key={index} className="overflow-hidden border border-primary/10 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 shadow-md rounded-xl h-full">
                <div className="p-6 flex flex-col h-full">
                  <h3 className="text-xl font-bold mb-4 text-primary">
                    {category.title}
                  </h3>
                  <ul className="space-y-4 flex-grow">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <div className="w-6 h-6 flex-shrink-0 text-primary mt-0.5">
                          <item.icon size={20} />
                        </div>
                        <span className="text-gray-700">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
          
          {/* Call to action */}
          <div className="mt-12 text-center">
            <Button 
              size="lg" 
              className="group relative overflow-hidden shadow-lg"
            >
              <Link to="/curriculum" className="flex items-center">
                Explore Full Services
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

export default OurServices;

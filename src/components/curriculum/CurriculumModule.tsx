import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, FileText, Code, Database, Award, Edit, BookCheck, Brain, Wrench } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import ProgressBar from '@/components/ui/ProgressBar';

// Map module names to appropriate icons
const iconMap = {
  'MS Word': FileText,
  'MS Excel': FileText,
  'HTML & CSS': Code,
  'Web Development': Code,
  'Python': Code,
  'SQL': Database,
  'Professional Development': Award,
  'AI Tools': Brain,
  'Prompt Engineering': Brain,
  default: BookOpen
};

// Map module names to appropriate image URLs
const imageMap: Record<string, string> = {
  'MS Word': 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Microsoft_Office_Word_%282019%E2%80%93present%29.svg',
  'MS Excel': 'https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg',
  'HTML': 'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg',
  'CSS': 'https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg',
  'Python': 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg',
  'SQL': 'https://www.svgrepo.com/show/331760/sql-database-generic.svg',
  'Web Development': 'https://cdn-icons-png.flaticon.com/512/1927/1927731.png',
  'Data Science': 'https://cdn-icons-png.flaticon.com/512/2821/2821637.png',
  'AI': 'https://cdn-icons-png.flaticon.com/512/8649/8649595.png',
  'Cybersecurity': 'https://cdn-icons-png.flaticon.com/512/2092/2092757.png',
  'Professional Development': 'https://cdn-icons-png.flaticon.com/512/9796/9796811.png',
};

interface CurriculumModuleProps {
  name: string;
  description: string;
  modules: number;
  projects: number;
  topics?: string[];
  exercises?: string[];
  progress?: number;
  weeks?: {
    weekNumber: number;
    title: string;
    description: string;
  }[];
  image?: string;
}

const CurriculumModule = ({
  name,
  description,
  modules,
  projects,
  topics = [],
  exercises = [],
  progress = 0,
  weeks = [],
  image
}: CurriculumModuleProps) => {
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const Icon = Object.entries(iconMap).find(
    ([key]) => name.includes(key)
  )?.[1] || iconMap.default;

  const moduleSlug = name.toLowerCase().replace(/\s+/g, '-');
  
  // Get appropriate image for the module
  const getModuleImage = () => {
    if (image) return image;
    
    // Try to find a matching image from our map
    for (const [key, url] of Object.entries(imageMap)) {
      if (name.includes(key)) {
        return url;
      }
    }
    
    // Use a generic image if no match is found
    return 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d';
  };
  
  const moduleImage = getModuleImage();
  
  return (
    <Collapsible className="w-full">
      <Card className="hover:shadow-md transition-shadow duration-300">
        <CardHeader className="pb-2">
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Icon size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 transition-transform duration-200 group-data-[state=open]:rotate-90" />
          </CollapsibleTrigger>
        </CardHeader>

        <CardContent className="pb-2">
          <div 
            className={`mb-4 overflow-hidden rounded-lg cursor-pointer transition-all duration-300 ${isImageExpanded ? 'h-auto max-h-[400px]' : 'h-[160px]'}`}
            onClick={() => setIsImageExpanded(!isImageExpanded)}
          >
            <div className="w-full h-full relative">
              <img 
                src={moduleImage}
                alt={name}
                className="w-full h-full object-contain bg-gray-50"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d';
                }}
              />
              {!isImageExpanded && (
                <div className="absolute bottom-0 left-0 right-0 text-center text-xs text-muted-foreground bg-white/80 py-1">
                  Click to expand
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Modules</span>
            <span className="font-medium">{modules}</span>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <span className="text-muted-foreground">Projects</span>
            <span className="font-medium">{projects}</span>
          </div>
          <ProgressBar 
            value={progress} 
            max={100} 
            size="md" 
            showValue={true} 
            label="Completion" 
          />
        </CardContent>

        <CollapsibleContent>
          <CardContent className="pt-4 border-t">
            <div className="flex border-b mb-4">
              <button 
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'overview' ? 'border-b-2 border-primary' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                📘 Overview
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'exercises' ? 'border-b-2 border-primary' : ''}`}
                onClick={() => setActiveTab('exercises')}
              >
                🛠️ Exercises
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'schedule' ? 'border-b-2 border-primary' : ''}`}
                onClick={() => setActiveTab('schedule')}
              >
                📅 Schedule
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'projects' ? 'border-b-2 border-primary' : ''}`}
                onClick={() => setActiveTab('projects')}
              >
                📁 Projects
              </button>
            </div>

            {activeTab === 'overview' && topics.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  ✅ Topics & Subtopics
                </h4>
                <ul className="text-sm space-y-2">
                  {topics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-2 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'exercises' && exercises.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Wrench size={16} />
                  Practice Exercises
                </h4>
                <ul className="text-sm space-y-2">
                  {exercises.map((exercise, i) => (
                    <li key={i} className="flex items-start gap-2 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                      <span>{exercise}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'schedule' && weeks.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  📅 Weekly Schedule
                </h4>
                <div className="space-y-3">
                  {weeks.map((week) => (
                    <div key={week.weekNumber} className="border-l-2 border-primary/20 pl-3">
                      <h5 className="text-sm font-medium">Week {week.weekNumber}: {week.title}</h5>
                      <p className="text-xs text-muted-foreground">{week.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div>
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  📁 Course Projects
                </h4>
                <div className="space-y-3">
                  <div className="border rounded-md p-3">
                    <h5 className="text-sm font-medium flex items-center gap-2">
                      <Edit size={14} />
                      Main Project
                    </h5>
                    <p className="text-xs text-muted-foreground mt-1">
                      {weeks.length > 0 && weeks[weeks.length - 1]?.description}
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs bg-secondary px-2 py-0.5 rounded">Project 1</span>
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        Submit Project
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <h5 className="text-sm font-medium flex items-center gap-2">
                      <BookCheck size={14} />
                      Portfolio Project
                    </h5>
                    <p className="text-xs text-muted-foreground mt-1">
                      Showcase your skills with a comprehensive portfolio project
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs bg-secondary px-2 py-0.5 rounded">Project 2</span>
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        Submit Project
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>

        <CardFooter>
          <div className="w-full">
            <Button variant="outline" className="w-full" asChild>
              <Link to={`/module/${moduleSlug}`} state={{ 
                moduleData: {
                  name,
                  description,
                  modules,
                  projects,
                  topics,
                  exercises,
                  progress,
                  weeks,
                  image: moduleImage
                } 
              }}>
                View Module
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Collapsible>
  );
};

export default CurriculumModule;

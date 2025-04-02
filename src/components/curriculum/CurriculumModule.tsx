
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, FileText, Code, Database, Award, Edit, BookCheck, Brain, Download } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import ProgressBar from '@/components/ui/ProgressBar';
import { downloadCurriculumResource } from '@/utils/downloadUtils';

const iconMap = {
  'MS Word': FileText,
  'MS Excel': FileText,
  'HTML & CSS': Code,
  'Web Development': Code,
  'Python': Code,
  'SQL': Database,
  'Professional Development': Award,
  'AI Tools': BookOpen,
  'Prompt Engineering': Brain,
  default: BookOpen
};

interface CurriculumModuleProps {
  name: string;
  description: string;
  modules: number;
  projects: number;
  topics?: string[];
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
  
  const handleDownloadResources = () => {
    downloadCurriculumResource(name);
  };

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
          {image && (
            <div className="mb-4 overflow-hidden rounded-lg cursor-pointer transition-all duration-300" 
                 onClick={() => setIsImageExpanded(!isImageExpanded)}
                 style={{ maxHeight: isImageExpanded ? '400px' : '200px' }}>
              <img 
                src={image} 
                alt={name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          )}
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
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200"
            onClick={handleDownloadResources}
          >
            <Download className="h-4 w-4" />
            Download Course Overview
          </Button>
        </CardContent>

        <CollapsibleContent>
          <CardContent className="pt-4 border-t">
            <div className="flex border-b mb-4">
              <button 
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'overview' ? 'border-b-2 border-primary' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'schedule' ? 'border-b-2 border-primary' : ''}`}
                onClick={() => setActiveTab('schedule')}
              >
                Schedule
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'projects' ? 'border-b-2 border-primary' : ''}`}
                onClick={() => setActiveTab('projects')}
              >
                Projects
              </button>
            </div>

            {activeTab === 'overview' && topics.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Key Topics</h4>
                <ul className="text-sm space-y-1">
                  {topics.map((topic, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'schedule' && weeks.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Weekly Schedule</h4>
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
                <h4 className="text-sm font-medium mb-2">Course Projects</h4>
                <div className="space-y-3">
                  <div className="border rounded-md p-3">
                    <h5 className="text-sm font-medium flex items-center gap-2">
                      <Edit size={14} />
                      AI Assistant Design
                    </h5>
                    <p className="text-xs text-muted-foreground">Create a functioning AI assistant with effective prompts</p>
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
                      Prompt Engineering Guide
                    </h5>
                    <p className="text-xs text-muted-foreground">Develop a comprehensive guide for effective prompting</p>
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
          <div className="w-full flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="w-full sm:flex-1" asChild>
              <Link to={`/module/${moduleSlug}`} state={{ 
                moduleData: {
                  name,
                  description,
                  modules,
                  projects,
                  topics,
                  progress,
                  weeks,
                  image
                } 
              }}>
                View Module
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              variant="secondary" 
              className="w-full sm:w-auto flex items-center gap-2"
              onClick={handleDownloadResources}
            >
              <Download className="h-4 w-4" />
              Resources
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Collapsible>
  );
};

export default CurriculumModule;

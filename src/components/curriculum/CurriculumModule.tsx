
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, FileText, Code, Database, Award } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import ProgressBar from '@/components/ui/ProgressBar';

const iconMap = {
  'MS Word': FileText,
  'MS Excel': FileText,
  'HTML & CSS': Code,
  'Web Development': Code,
  'Python': Code,
  'SQL': Database,
  'Professional Development': Award,
  'AI Tools': BookOpen,
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
}

const CurriculumModule = ({
  name,
  description,
  modules,
  projects,
  topics = [],
  progress = 0,
  weeks = []
}: CurriculumModuleProps) => {
  // Choose icon based on module name, or use default
  const Icon = Object.entries(iconMap).find(
    ([key]) => name.includes(key)
  )?.[1] || iconMap.default;

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
            {topics.length > 0 && (
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

            {weeks.length > 0 && (
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
          </CardContent>
        </CollapsibleContent>

        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <Link to={`/module/${name.toLowerCase().replace(/\s+/g, '-')}`}>
              View Module
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </Collapsible>
  );
};

export default CurriculumModule;

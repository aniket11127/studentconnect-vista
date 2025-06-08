
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Check, X, Loader, Clock, AlertTriangle } from 'lucide-react';

interface ExecutionStatusProps {
  isExecuting: boolean;
  output: string;
  error: string | null;
  executionTime?: number;
  memory?: number;
}

export const ExecutionStatus = ({ 
  isExecuting, 
  output, 
  error, 
  executionTime, 
  memory 
}: ExecutionStatusProps) => {
  const getStatus = () => {
    if (isExecuting) {
      return {
        icon: <Loader size={14} className="animate-spin" />,
        text: "Executing...",
        variant: "secondary" as const
      };
    }
    
    if (error) {
      return {
        icon: <X size={14} />,
        text: "Error",
        variant: "destructive" as const
      };
    }
    
    if (output) {
      return {
        icon: <Check size={14} />,
        text: "Success",
        variant: "default" as const
      };
    }
    
    return {
      icon: <Clock size={14} />,
      text: "Ready",
      variant: "outline" as const
    };
  };

  const status = getStatus();

  return (
    <div className="flex items-center gap-2">
      <Badge variant={status.variant} className="flex items-center gap-1">
        {status.icon}
        {status.text}
      </Badge>
      
      {executionTime !== undefined && executionTime > 0 && (
        <Badge variant="outline" className="text-xs">
          {executionTime}ms
        </Badge>
      )}
      
      {memory !== undefined && memory > 0 && (
        <Badge variant="outline" className="text-xs">
          {memory}KB
        </Badge>
      )}
    </div>
  );
};

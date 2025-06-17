
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Moon, 
  Sun, 
  Play, 
  Loader, 
  Download, 
  FileUp, 
  RotateCcw, 
  Copy,
  Settings
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { CodeLanguage } from './CodingPlayground';
import { ExecutionStatus } from './ExecutionStatus';

interface CodeEditorToolbarProps {
  language: CodeLanguage;
  code: string;
  setCode: (code: string) => void;
  isExecuting: boolean;
  onExecute: () => void;
  output: string;
  error: string | null;
  currentTheme: 'light' | 'dark';
  setCurrentTheme: (theme: 'light' | 'dark') => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  tabSize: number;
  setTabSize: (size: number) => void;
  onDownload: () => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  executionTime?: number;
  memory?: number;
}

export const CodeEditorToolbar = ({
  language,
  code,
  setCode,
  isExecuting,
  onExecute,
  output,
  error,
  currentTheme,
  setCurrentTheme,
  fontSize,
  setFontSize,
  tabSize,
  setTabSize,
  onDownload,
  onUpload,
  executionTime,
  memory,
}: CodeEditorToolbarProps) => {
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast({
        title: "Code copied",
        description: "Code has been copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Failed to copy code to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleClearCode = () => {
    setCode('');
    toast({
      title: "Code cleared",
      description: "Editor has been cleared",
    });
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 md:p-4 bg-card border-b gap-3 sm:gap-2">
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <span className="font-medium capitalize text-sm md:text-base">
          {language} Playground
        </span>
        <div className="hidden sm:block">
          <ExecutionStatus
            isExecuting={isExecuting}
            output={output}
            error={error}
            executionTime={executionTime}
            memory={memory}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
        {/* Settings Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 w-9 md:h-10 md:w-10">
              <Settings size={14} className="md:w-4 md:h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Font Size</label>
                <Select value={fontSize.toString()} onValueChange={(val) => setFontSize(parseInt(val))}>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[12, 14, 16, 18, 20, 22, 24].map((size) => (
                      <SelectItem key={size} value={size.toString()}>
                        {size}px
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Tab Size</label>
                <Select value={tabSize.toString()} onValueChange={(val) => setTabSize(parseInt(val))}>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[2, 4, 8].map((size) => (
                      <SelectItem key={size} value={size.toString()}>
                        {size} spaces
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Separator orientation="vertical" className="h-6 hidden sm:block" />

        {/* File Operations */}
        <input
          type="file"
          id="file-upload"
          accept=".txt,.py,.java,.c,.cpp,.sql"
          className="hidden"
          onChange={onUpload}
        />
        
        <Button
          variant="outline"
          size="sm"
          className="h-9 w-9 md:h-10 md:w-10 min-h-[44px] sm:min-h-0"
          onClick={() => document.getElementById('file-upload')?.click()}
          title="Upload File"
        >
          <FileUp size={14} className="md:w-4 md:h-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="h-9 w-9 md:h-10 md:w-10 min-h-[44px] sm:min-h-0"
          onClick={onDownload}
          title="Download Code"
        >
          <Download size={14} className="md:w-4 md:h-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="h-9 w-9 md:h-10 md:w-10 min-h-[44px] sm:min-h-0"
          onClick={handleCopyCode}
          title="Copy Code"
        >
          <Copy size={14} className="md:w-4 md:h-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="h-9 w-9 md:h-10 md:w-10 min-h-[44px] sm:min-h-0"
          onClick={handleClearCode}
          title="Clear Code"
        >
          <RotateCcw size={14} className="md:w-4 md:h-4" />
        </Button>

        <Separator orientation="vertical" className="h-6 hidden sm:block" />

        {/* Execute Button */}
        <Button
          className="flex items-center gap-1 bg-green-600 hover:bg-green-700 px-3 py-2 md:px-4 md:py-2 min-h-[44px] text-sm md:text-base"
          onClick={onExecute}
          disabled={isExecuting}
        >
          {isExecuting ? (
            <Loader size={14} className="animate-spin md:w-4 md:h-4" />
          ) : (
            <Play size={14} className="md:w-4 md:h-4" />
          )}
          <span className="hidden sm:inline">Run Code</span>
          <span className="sm:hidden">Run</span>
        </Button>

        {/* Theme Toggle */}
        <Button
          variant="outline"
          size="sm"
          className="h-9 w-9 md:h-10 md:w-10 min-h-[44px] sm:min-h-0"
          onClick={() => setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light')}
          title="Toggle Theme"
        >
          {currentTheme === 'light' ? <Moon size={14} className="md:w-4 md:h-4" /> : <Sun size={14} className="md:w-4 md:h-4" />}
        </Button>
      </div>

      {/* Mobile execution status */}
      <div className="sm:hidden w-full">
        <ExecutionStatus
          isExecuting={isExecuting}
          output={output}
          error={error}
          executionTime={executionTime}
          memory={memory}
        />
      </div>
    </div>
  );
};


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
    <div className="flex items-center justify-between p-3 bg-card border-b">
      <div className="flex items-center gap-2">
        <span className="font-medium capitalize">
          {language} Playground
        </span>
        <ExecutionStatus
          isExecuting={isExecuting}
          output={output}
          error={error}
          executionTime={executionTime}
          memory={memory}
        />
      </div>

      <div className="flex items-center gap-2">
        {/* Settings Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Settings size={16} />
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

        <Separator orientation="vertical" className="h-6" />

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
          size="icon"
          className="h-8 w-8"
          onClick={() => document.getElementById('file-upload')?.click()}
          title="Upload File"
        >
          <FileUp size={16} />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={onDownload}
          title="Download Code"
        >
          <Download size={16} />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={handleCopyCode}
          title="Copy Code"
        >
          <Copy size={16} />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={handleClearCode}
          title="Clear Code"
        >
          <RotateCcw size={16} />
        </Button>

        <Separator orientation="vertical" className="h-6" />

        {/* Execute Button */}
        <Button
          className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
          onClick={onExecute}
          disabled={isExecuting}
        >
          {isExecuting ? (
            <Loader size={16} className="animate-spin" />
          ) : (
            <Play size={16} />
          )}
          Run Code
        </Button>

        {/* Theme Toggle */}
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light')}
          title="Toggle Theme"
        >
          {currentTheme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </Button>
      </div>
    </div>
  );
};


import React from 'react';
import { Moon, Sun, Play, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeLanguage } from './CodingPlayground';

interface ExecutionPanelProps {
  language: CodeLanguage;
  code: string;
  setCode: (code: string) => void;
  input: string;
  setInput: (input: string) => void;
  output: string;
  error: string | null;
  isExecuting: boolean;
  executeCode: () => void;
  currentTheme: 'light' | 'dark';
  setCurrentTheme: (theme: 'light' | 'dark') => void;
  height?: string;
}

export const ExecutionPanel = ({
  language,
  code,
  setCode,
  input,
  setInput,
  output,
  error,
  isExecuting,
  executeCode,
  currentTheme,
  setCurrentTheme,
  height = "600px",
}: ExecutionPanelProps) => {
  const outputWithError = error ? `Error: ${error}\n\n${output}` : output;
  
  // Get syntax highlighting class based on language
  const getLanguageClass = () => {
    switch (language) {
      case 'python': return 'language-python';
      case 'java': return 'language-java';
      case 'c': return 'language-c';
      case 'cpp': return 'language-cpp';
      case 'sql': return 'language-sql';
      default: return 'language-plaintext';
    }
  };

  const editorStyle = {
    height: `calc(${height} - 80px)`,
    overflow: 'auto',
  };
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between p-3 bg-card border-b">
        <div className="flex items-center">
          <span className="font-medium capitalize">{language} Playground</span>
        </div>
        <div className="flex gap-2">
          <Button
            className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
            onClick={executeCode}
            disabled={isExecuting}
          >
            {isExecuting ? (
              <Loader size={16} className="animate-spin" />
            ) : (
              <Play size={16} />
            )}
            Run Code
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1" 
            onClick={() => setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light')}
          >
            {currentTheme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            {currentTheme === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Code Editor */}
        <div className={`border-r ${currentTheme === 'dark' ? 'bg-gray-900' : 'bg-white'}`} style={editorStyle}>
          <textarea
            className={`w-full h-full p-4 font-mono text-sm focus:outline-none resize-none ${
              currentTheme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
            }`}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
          />
        </div>

        {/* Input/Output Tabs */}
        <div className={`${currentTheme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
          <Tabs defaultValue="input" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="input">Input</TabsTrigger>
              <TabsTrigger value="output">Output</TabsTrigger>
            </TabsList>
            <TabsContent value="input" className="p-0">
              <textarea
                className={`w-full p-4 font-mono text-sm focus:outline-none resize-none ${
                  currentTheme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
                }`}
                style={{ height: `calc(${height} - 120px)` }}
                placeholder="Enter input here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                spellCheck={false}
              />
            </TabsContent>
            <TabsContent value="output" className="p-0">
              <pre
                className={`w-full p-4 font-mono text-sm overflow-auto ${
                  error ? 'text-red-500' : currentTheme === 'dark' ? 'text-green-300' : 'text-green-700'
                }`}
                style={{ height: `calc(${height} - 120px)` }}
              >
                {isExecuting ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Loader className="animate-spin h-8 w-8 mb-4" />
                    <span>Running your code...</span>
                  </div>
                ) : outputWithError ? (
                  outputWithError
                ) : (
                  <span className="text-muted-foreground italic">Output will appear here after running your code</span>
                )}
              </pre>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { Moon, Sun, Play, Loader, Download, Upload, FileUp, Check, X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeLanguage } from './CodingPlayground';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { editorSettings } from './playgroundConfig';
import { toast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  fontSize: number;
  setFontSize: (size: number) => void;
  tabSize: number;
  setTabSize: (size: number) => void;
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
  fontSize,
  setFontSize,
  tabSize,
  setTabSize,
}: ExecutionPanelProps) => {
  const [activeTab, setActiveTab] = useState<string>("input");
  
  // Handle file download
  const handleDownload = () => {
    try {
      // Determine file extension based on language
      let fileExtension = '.txt';
      if (language === 'python') fileExtension = '.py';
      else if (language === 'java') fileExtension = '.java';
      else if (language === 'c') fileExtension = '.c';
      else if (language === 'cpp') fileExtension = '.cpp';
      else if (language === 'sql') fileExtension = '.sql';
      
      const fileName = `sgk14_${language}_code${fileExtension}`;
      
      // Create a blob with the code content
      const blob = new Blob([code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      // Create a temporary anchor element to initiate download
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
      
      toast({
        title: "Download successful",
        description: `File '${fileName}' downloaded successfully`,
      });
    } catch (err) {
      toast({
        title: "Download failed",
        description: "There was an error downloading your code",
        variant: "destructive",
      });
    }
  };
  
  // Handle file upload
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCode(event.target.result as string);
        toast({
          title: "Upload successful",
          description: `File '${file.name}' loaded successfully`,
        });
      }
    };
    reader.onerror = () => {
      toast({
        title: "Upload failed",
        description: "There was an error reading your file",
        variant: "destructive",
      });
    };
    reader.readAsText(file);
    
    // Reset the input value to allow uploading the same file again
    e.target.value = '';
  };
  
  const editorStyle = {
    height: `calc(${height})`,
    overflow: 'auto',
  };
  
  const getStatusIcon = () => {
    if (isExecuting) return <Loader size={16} className="animate-spin" />;
    if (error) return <AlertTriangle size={16} className="text-red-500" />;
    if (output) return <Check size={16} className="text-green-500" />;
    return null;
  };

  // Format the output to correctly display both output and errors
  const displayOutput = () => {
    if (isExecuting) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <Loader className="animate-spin h-8 w-8 mb-4" />
          <span>Running your code...</span>
        </div>
      );
    }
    
    if (!output && !error) {
      return (
        <span className="text-muted-foreground italic">Output will appear here after running your code</span>
      );
    }
    
    return (
      <>
        {error && (
          <div className="text-red-500 mb-2">
            {error}
          </div>
        )}
        {output && (
          <div className={error ? "mt-4" : ""}>
            {output.split('\n').map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        )}
      </>
    );
  };
  
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between p-3 bg-card border-b">
        <div className="flex items-center gap-2">
          <span className="font-medium capitalize">{language} Playground</span>
          {getStatusIcon()}
        </div>
        <div className="flex gap-2">
          <div className="hidden sm:flex items-center gap-2">
            <Select value={fontSize.toString()} onValueChange={(val) => setFontSize(parseInt(val))}>
              <SelectTrigger className="w-[80px] h-8">
                <SelectValue placeholder="Font" />
              </SelectTrigger>
              <SelectContent>
                {editorSettings.fontSize.map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}px
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={tabSize.toString()} onValueChange={(val) => setTabSize(parseInt(val))}>
              <SelectTrigger className="w-[80px] h-8">
                <SelectValue placeholder="Tab" />
              </SelectTrigger>
              <SelectContent>
                {editorSettings.tabSize.map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size} spaces
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <input 
            type="file" 
            id="file-upload" 
            accept=".txt,.py,.java,.c,.cpp,.sql"
            className="hidden" 
            onChange={handleUpload}
          />
          
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => document.getElementById('file-upload')?.click()}
              title="Upload Code"
            >
              <FileUp size={16} />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleDownload}
              title="Download Code"
            >
              <Download size={16} />
            </Button>
          </div>
          
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
            {currentTheme === 'light' ? 'Dark' : 'Light'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 flex-grow h-full">
        {/* Code Editor */}
        <div className={`border-r ${currentTheme === 'dark' ? 'bg-gray-900' : 'bg-white'}`} style={{ height: "100%", overflow: "auto" }}>
          <textarea
            className={`w-full h-full p-4 font-mono focus:outline-none resize-none ${
              currentTheme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
            }`}
            style={{ fontSize: `${fontSize}px`, tabSize: tabSize }}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            placeholder={`Write your ${language} code here...`}
          />
        </div>

        {/* Input/Output Tabs */}
        <div className={`${currentTheme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} flex flex-col h-full border-l border-border`}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full flex flex-col">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="input">Input</TabsTrigger>
              <TabsTrigger value="output">
                Output
                {error && <span className="ml-1 text-red-500">•</span>}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="input" className="p-0 flex-grow h-full">
              <textarea
                className={`w-full p-4 font-mono text-sm focus:outline-none resize-none h-full ${
                  currentTheme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
                }`}
                style={{ fontSize: `${fontSize}px` }}
                placeholder="Enter input here (for stdin)..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                spellCheck={false}
              />
            </TabsContent>
            <TabsContent value="output" className="p-0 flex-grow h-full">
              <ScrollArea className="h-full">
                <pre
                  className={`w-full p-4 font-mono text-sm`}
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {displayOutput()}
                </pre>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <div className="p-2 text-xs text-muted-foreground border-t mt-auto">
        <div className="flex items-center justify-between">
          <span>{language.toUpperCase()} • {code.split('\n').length} lines</span>
          <span className="flex items-center gap-1">
            {isExecuting ? (
              <>Running...</>
            ) : output && !error ? (
              <><Check size={12} className="text-green-500" /> Executed successfully</>
            ) : error ? (
              <><X size={12} className="text-red-500" /> Execution failed</>
            ) : (
              <>Ready</>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

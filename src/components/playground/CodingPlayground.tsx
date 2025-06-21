import React, { useState, useEffect } from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackStack,
  SandpackFileExplorer,
  useSandpack,
} from '@codesandbox/sandpack-react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Code, Play, Loader, FileText, Save, Download, Upload, FileUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LanguageSelector } from './LanguageSelector';
import { ExecutionPanel } from './ExecutionPanel';
import { languageOptions, defaultFiles, editorSettings } from './playgroundConfig';
import { toast } from '@/hooks/use-toast';
import JSZip from 'jszip';

// Type definitions
export type CodeLanguage = 'web' | 'python' | 'java' | 'c' | 'cpp' | 'sql';

interface CodingPlaygroundProps {
  defaultHeight?: string;
  showFileExplorer?: boolean;
  showRunButton?: boolean;
}

// Run button component
const RunButton = ({ onClick, isLoading }: { onClick: () => void; isLoading: boolean }) => {
  return (
    <Button
      className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader size={16} className="animate-spin" />
      ) : (
        <Play size={16} />
      )}
      Run Code
    </Button>
  );
};

// Theme switcher component
const ThemeSwitcher = ({ currentTheme, setCurrentTheme }: { 
  currentTheme: 'light' | 'dark', 
  setCurrentTheme: (theme: 'light' | 'dark') => void 
}) => {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="flex items-center gap-1" 
      onClick={() => setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light')}
    >
      {currentTheme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
      {currentTheme === 'light' ? 'Dark' : 'Light'} Mode
    </Button>
  );
};

// WebEditor component for HTML/CSS/JS - Fully responsive
const WebEditor = ({ 
  showFileExplorer = true, 
  height = "600px",
  currentTheme,
  setCurrentTheme
}: { 
  showFileExplorer?: boolean, 
  height?: string,
  currentTheme: 'light' | 'dark',
  setCurrentTheme: (theme: 'light' | 'dark') => void
}) => {
  const handleExport = () => {
    try {
      const zip = new JSZip();
      zip.file("index.html", defaultFiles['/index.html']);
      zip.file("styles.css", defaultFiles['/styles.css']);
      zip.file("index.js", defaultFiles['/index.js']);
      
      zip.generateAsync({ type: "blob" })
        .then(function(content) {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(content);
          link.download = "web-project.zip";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          toast({
            title: "Export successful",
            description: "Your web project has been exported",
          });
        });
    } catch (err) {
      toast({
        title: "Export failed",
        description: "There was an error exporting your project",
        variant: "destructive",
      });
    }
  };
  
  return (
    <SandpackProvider
      template="vanilla"
      files={defaultFiles}
      theme={currentTheme}
    >
      <div className="flex flex-col h-full w-full">
        {/* Responsive Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-card border-b gap-3 sm:gap-2">
          <div className="flex items-center">
            <Code className="text-primary mr-2" size={20} />
            <span className="font-medium text-sm sm:text-base">SGK14 Web Playground</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 text-xs sm:text-sm w-full sm:w-auto justify-center"
              onClick={handleExport}
            >
              <Download size={14} />
              Export
            </Button>
            <ThemeSwitcher currentTheme={currentTheme} setCurrentTheme={setCurrentTheme} />
          </div>
        </div>

        {/* Responsive Layout Container */}
        <div className="flex-1 flex flex-col lg:flex-row h-full min-h-0">
          <SandpackLayout className="flex-1 !rounded-none !border-0 !p-0 flex flex-col lg:flex-row min-h-0">
            {/* File Explorer - Mobile: collapsed, Desktop: sidebar */}
            {showFileExplorer && (
              <div className="lg:w-64 lg:min-w-64 border-b lg:border-b-0 lg:border-r border-border">
                <SandpackFileExplorer className="!border-0 h-full" />
              </div>
            )}
            
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col lg:flex-row min-h-0">
              {/* Code Editor */}
              <div className="flex-1 lg:flex-[1] min-h-0 border-b lg:border-b-0 lg:border-r border-border">
                <SandpackStack className="h-full">
                  <SandpackCodeEditor
                    showTabs
                    showLineNumbers
                    showInlineErrors
                    wrapContent
                    closableTabs
                    showRunButton={false}
                    style={{ 
                      height: "100%", 
                      fontSize: "13px",
                      fontFamily: "Monaco, Menlo, 'Ubuntu Mono', monospace"
                    }}
                  />
                </SandpackStack>
              </div>
              
              {/* Preview Panel */}
              <div className="flex-1 lg:flex-[1] min-h-0">
                <SandpackStack className="h-full">
                  <SandpackPreview
                    showNavigator
                    showRefreshButton
                    style={{ 
                      height: "100%",
                      minHeight: "300px"
                    }}
                  />
                </SandpackStack>
              </div>
            </div>
          </SandpackLayout>
        </div>
      </div>
    </SandpackProvider>
  );
};

const CodingPlayground = ({
  defaultHeight = "600px",
  showFileExplorer = true,
  showRunButton = true
}: CodingPlaygroundProps) => {
  // State
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
  const [selectedLanguage, setSelectedLanguage] = useState<CodeLanguage>('web');
  const [code, setCode] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<number>(editorSettings.defaultFontSize); 
  const [tabSize, setTabSize] = useState<number>(editorSettings.defaultTabSize);
  
  // Handle language change
  const handleLanguageChange = (language: CodeLanguage) => {
    setSelectedLanguage(language);
    setOutput('');
    setError(null);
    
    if (language !== 'web') {
      const defaultCode = languageOptions.find(lang => lang.id === language)?.defaultCode || '';
      setCode(defaultCode);
    }
  };
  
  // Execute code (for non-web languages)
  const executeCode = async () => {
    if (selectedLanguage === 'web') return;
    
    setIsExecuting(true);
    setError(null);
    setOutput('');
    
    try {
      const executeResult = executePythonCode(code, input, selectedLanguage);
      setTimeout(() => {
        setOutput(executeResult.output);
        if (executeResult.error) {
          setError(executeResult.error);
        }
        setIsExecuting(false);
      }, 800);
      
    } catch (err) {
      setError('An error occurred while executing your code.');
      setIsExecuting(false);
    }
  };
  
  // Execute simulation function
  const executePythonCode = (code: string, input: string, language: CodeLanguage) => {
    let result = {
      output: '',
      error: null as string | null
    };
    
    if (language === 'python') {
      const printMatches = code.match(/print\s*\((.*)\)/g);
      
      if (printMatches) {
        const printContents = printMatches.map(match => {
          const content = match.match(/print\s*\((.*)\)/)?.[1];
          if (content) {
            if (content.startsWith('"') && content.endsWith('"')) {
              return content.slice(1, -1);
            } else if (content.startsWith("'") && content.endsWith("'")) {
              return content.slice(1, -1);
            } else if (!isNaN(Number(content))) {
              return content;
            } else {
              if (content === 'input()' && input.trim()) {
                return input.trim();
              }
              return `[Variable: ${content}]`;
            }
          }
          return "";
        });
        
        result.output = printContents.join('\n');
      } else if (code.includes('input(') && !code.includes('print(')) {
        result.error = "Your code reads input but doesn't print anything.";
      } else if (!code.trim()) {
        result.output = "No code to execute.";
      } else {
        result.error = "No output generated. Did you forget to use print()?";
      }
      
      if (code.includes('print(') && !code.includes(')')) {
        result.error = "SyntaxError: unexpected EOF while parsing";
        result.output = "";
      }
      
      if (code.includes('input(') && input.trim()) {
        const lines = input.split('\n');
        result.output = `Using input: ${lines[0]}\n${result.output}`;
      }
    } else if (language === 'java') {
      if (code.includes('System.out.print')) {
        const printMatches = code.match(/System\.out\.print(?:ln)?\s*\((.*)\)/g);
        if (printMatches) {
          const printContents = printMatches.map(match => {
            const content = match.match(/System\.out\.print(?:ln)?\s*\((.*)\)/)?.[1];
            return content ? (content.startsWith('"') ? content.slice(1, -1) : `[Evaluated: ${content}]`) : "";
          });
          result.output = printContents.join('\n');
        }
      } else {
        result.error = "No output generated. Did you use System.out.print?";
      }
    } else if (language === 'c' || language === 'cpp') {
      if (code.includes('printf') || code.includes('cout')) {
        result.output = "Output from C/C++ code (simulated)";
        if (language === 'c' && code.match(/printf\s*\("(.*)"\)/)) {
          result.output = code.match(/printf\s*\("(.*)"\)/)?.[1] || "C output";
        } else if (language === 'cpp' && code.match(/cout\s*<<\s*"(.*)"/)) {
          result.output = code.match(/cout\s*<<\s*"(.*)"/)?.[1] || "C++ output";
        }
      } else {
        result.error = `No output generated. Did you use ${language === 'c' ? 'printf' : 'cout'}?`;
      }
    } else if (language === 'sql') {
      if (code.toLowerCase().includes('select')) {
        const tableMatch = code.match(/from\s+(\w+)/i);
        const tableName = tableMatch ? tableMatch[1] : "table";
        result.output = `Query executed on ${tableName}:\n\nid | name | value\n--------------------\n1  | data1 | 100\n2  | data2 | 200`;
      } else if (code.toLowerCase().includes('insert')) {
        result.output = "1 row(s) inserted successfully.";
      } else if (code.toLowerCase().includes('update')) {
        result.output = "2 row(s) updated successfully.";
      } else {
        result.output = "Query executed. No rows affected.";
      }
    }
    
    return result;
  };
  
  // Set initial code when language changes
  useEffect(() => {
    if (selectedLanguage !== 'web') {
      const langOption = languageOptions.find(lang => lang.id === selectedLanguage);
      if (langOption && !code) {
        setCode(langOption.defaultCode);
      }
    }
  }, [selectedLanguage, code]);
  
  return (
    <div className="w-full h-full flex flex-col bg-background">
      {/* Language selector - full width on mobile */}
      <div className="p-3 sm:p-4 border-b bg-card">
        <LanguageSelector 
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
        />
      </div>

      {/* Main Editor Container */}
      <div 
        className="flex-1 flex flex-col min-h-0 w-full"
        style={{ 
          height: defaultHeight === "100%" ? "100%" : `calc(${defaultHeight} - 80px)`,
          minHeight: "500px"
        }}
      >
        {selectedLanguage === 'web' ? (
          <WebEditor 
            showFileExplorer={showFileExplorer} 
            height="100%"
            currentTheme={currentTheme}
            setCurrentTheme={setCurrentTheme}
          />
        ) : (
          <ExecutionPanel
            language={selectedLanguage}
            code={code}
            setCode={setCode}
            input={input}
            setInput={setInput}
            output={output}
            error={error}
            isExecuting={isExecuting}
            executeCode={executeCode}
            currentTheme={currentTheme}
            setCurrentTheme={setCurrentTheme}
            height="100%"
            fontSize={fontSize}
            setFontSize={setFontSize}
            tabSize={tabSize}
            setTabSize={setTabSize}
          />
        )}
      </div>
    </div>
  );
};

export default CodingPlayground;

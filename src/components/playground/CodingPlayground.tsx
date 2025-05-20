
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

// WebEditor component for HTML/CSS/JS
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
      // Create a zip file with all web files
      const zip = new JSZip();
      zip.file("index.html", defaultFiles['/index.html']);
      zip.file("styles.css", defaultFiles['/styles.css']);
      zip.file("index.js", defaultFiles['/index.js']);
      
      zip.generateAsync({ type: "blob" })
        .then(function(content) {
          // Create a download link and trigger it
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
      <div className="flex items-center justify-between p-3 bg-card border-b">
        <div className="flex items-center">
          <Code className="text-primary mr-2" size={20} />
          <span className="font-medium">SGK14 Web Playground</span>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handleExport}
          >
            <Download size={16} />
            Export
          </Button>
          <ThemeSwitcher currentTheme={currentTheme} setCurrentTheme={setCurrentTheme} />
        </div>
      </div>

      <SandpackLayout
        className={cn("!rounded-none !border-0", !showFileExplorer && "!p-0")}
        style={{ height }}
      >
        {showFileExplorer && (
          <SandpackFileExplorer className="!border-r" />
        )}
        <SandpackStack>
          <SandpackCodeEditor
            showTabs
            showLineNumbers
            showInlineErrors
            wrapContent
            closableTabs
            showRunButton={false}
          />
        </SandpackStack>
        <SandpackStack>
          <SandpackPreview
            showNavigator
            showRefreshButton
          />
        </SandpackStack>
      </SandpackLayout>
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
    
    // Set default code for the selected language
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
      // For demonstration purposes, we'll simulate API call to Judge0
      // In a real implementation, you would make an actual API call
      setTimeout(() => {
        if (selectedLanguage === 'python') {
          // Simulate Python execution
          if (code.includes('print(')) {
            if (code.includes('input(') && input.trim()) {
              const lines = input.split('\n');
              let currentLineIndex = 0;
              
              const simulatedOutput = [
                "Hello, SGK14!",
                `Enter your name: ${lines[currentLineIndex] || "User"}`,
                `Hello, ${lines[currentLineIndex] || "User"}!`,
                "Welcome to SGK14 Python playground!"
              ].join('\n');
              
              setOutput(simulatedOutput);
            } else {
              setOutput('Hello, SGK14!\nYour code executed successfully.');
            }
          } else {
            setError('No output generated. Did you forget to use print()?');
          }
        } else if (selectedLanguage === 'java') {
          // Simulate Java execution
          if (code.includes('System.out.print')) {
            if (code.includes('Scanner') && input.trim()) {
              setOutput(`Hello, SGK14!\nWelcome Student! You are 15 years old.\nEnter your name: ${input.split('\n')[0] || "User"}\nHello, ${input.split('\n')[0] || "User"}!`);
            } else {
              setOutput('Hello, SGK14!\nWelcome Student! You are 15 years old.');
            }
          } else {
            setError('No output generated. Did you use System.out.print?');
          }
        } else if (selectedLanguage === 'c' || selectedLanguage === 'cpp') {
          // Simulate C/C++ execution
          if (code.includes('printf') || code.includes('cout')) {
            if ((code.includes('scanf') || code.includes('cin')) && input.trim()) {
              setOutput(`Hello, SGK14!\nWelcome Student! You are 15 years old.\nEnter your name: ${input.split('\n')[0] || "User"}\nHello, ${input.split('\n')[0] || "User"}!`);
            } else {
              setOutput(`Hello from ${selectedLanguage === 'c' ? 'C' : 'C++'}!\nYour code executed successfully.`);
            }
          } else {
            setError(`No output generated. Did you use ${selectedLanguage === 'c' ? 'printf' : 'cout'}?`);
          }
        } else if (selectedLanguage === 'sql') {
          // Simulate SQL execution
          if (code.toLowerCase().includes('select')) {
            setOutput('Query executed successfully!\n\nid | name | grade | subject\n-----------------------------\n1  | John  | 9     | Math\n2  | Emma  | 10    | Science');
          } else if (code.toLowerCase().includes('create') || code.toLowerCase().includes('insert')) {
            setOutput('Query executed. Affected rows: 3');
          } else {
            setOutput('Query executed. 0 rows affected.');
          }
        }
        setIsExecuting(false);
      }, 1200);
      
    } catch (err) {
      setError('An error occurred while executing your code.');
      setIsExecuting(false);
    }
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
    <div className="w-full space-y-6 my-8">
      {/* Header section */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-primary">Interactive Coding Playground</h2>
        <p className="text-muted-foreground">
          Write, edit, and experiment with HTML, CSS, JavaScript, Python, Java and more. See your results instantly!
        </p>
      </div>

      {/* Language selector */}
      <LanguageSelector 
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
      />

      {/* Editor section */}
      <div className="rounded-xl border shadow-lg overflow-hidden">
        {selectedLanguage === 'web' ? (
          <WebEditor 
            showFileExplorer={showFileExplorer} 
            height={defaultHeight}
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
            height={defaultHeight}
            fontSize={fontSize}
            setFontSize={setFontSize}
            tabSize={tabSize}
            setTabSize={setTabSize}
          />
        )}
      </div>

      {/* Instructions */}
      <div className="text-sm text-muted-foreground">
        <p>Use this playground to practice your programming skills. Choose a language and start coding!</p>
        <p className="mt-2">For HTML/CSS/JS, changes update automatically in the preview window. For other languages, click "Run Code".</p>
        {selectedLanguage !== 'web' && (
          <p className="mt-1">You can provide input data in the "Input" tab for languages that require stdin (like Python, Java, C/C++).</p>
        )}
      </div>
    </div>
  );
};

export default CodingPlayground;

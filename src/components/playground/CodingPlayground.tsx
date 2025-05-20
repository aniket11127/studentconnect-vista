
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
// Remove direct CSS import which doesn't exist in the package
import { Button } from '@/components/ui/button';
import { Moon, Sun, Code, Play, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LanguageSelector } from './LanguageSelector';
import { ExecutionPanel } from './ExecutionPanel';
import { languageOptions, defaultFiles } from './playgroundConfig';

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

const CodingPlayground = ({
  defaultHeight = "600px",
  showFileExplorer = true,
  showRunButton = true
}: CodingPlaygroundProps) => {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
  const [selectedLanguage, setSelectedLanguage] = useState<CodeLanguage>('web');
  const [code, setCode] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
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
            setOutput('Hello from Python!\nYour code executed successfully.');
          } else {
            setError('No output generated. Did you forget to use print()?');
          }
        } else if (selectedLanguage === 'java') {
          // Simulate Java execution
          if (code.includes('System.out.print')) {
            setOutput('Hello from Java!\nYour code executed successfully.');
          } else {
            setError('No output generated. Did you use System.out.print?');
          }
        } else if (selectedLanguage === 'c' || selectedLanguage === 'cpp') {
          // Simulate C/C++ execution
          if (code.includes('printf') || code.includes('cout')) {
            setOutput(`Hello from ${selectedLanguage === 'c' ? 'C' : 'C++'}!\nYour code executed successfully.`);
          } else {
            setError(`No output generated. Did you use ${selectedLanguage === 'c' ? 'printf' : 'cout'}?`);
          }
        } else if (selectedLanguage === 'sql') {
          // Simulate SQL execution
          if (code.toLowerCase().includes('select')) {
            setOutput('Query executed successfully!\n\nid | name | email\n------------------\n1 | John Doe | john@example.com\n2 | Jane Smith | jane@example.com');
          } else {
            setOutput('Query executed. 0 rows affected.');
          }
        }
        setIsExecuting(false);
      }, 1500);
      
    } catch (err) {
      setError('An error occurred while executing your code.');
      setIsExecuting(false);
    }
  };
  
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
          <SandpackProvider 
            template="vanilla"
            files={defaultFiles}
            theme={currentTheme}
          >
            <div className="flex items-center justify-between p-3 bg-card border-b">
              <div className="flex items-center">
                <Code className="text-primary mr-2" size={20} />
                <span className="font-medium">SGK14 Coding Playground</span>
              </div>
              <div className="flex gap-2">
                {showRunButton && <RunButton onClick={() => {}} isLoading={false} />}
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

            <SandpackLayout 
              className={cn("!rounded-none !border-0", !showFileExplorer && "!p-0")}
              style={{ height: defaultHeight }}
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
          />
        )}
      </div>

      {/* Instructions */}
      <div className="text-sm text-muted-foreground">
        <p>Use this playground to practice your programming skills. Choose a language and start coding!</p>
        <p className="mt-2">For HTML/CSS/JS, changes update automatically in the preview window. For other languages, click "Run Code".</p>
      </div>
    </div>
  );
};

export default CodingPlayground;

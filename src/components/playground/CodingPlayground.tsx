
import React, { useState } from 'react';
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
import { Moon, Sun, Code, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

// Default code for each file
const defaultFiles = {
  '/index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Coding Project</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Hello, SGK14 Coder!</h1>
    <p>Welcome to your coding playground. Edit any file and see results instantly!</p>
    <div class="card" id="card">
      <h2>Try these:</h2>
      <ul>
        <li>Change the text on this page</li>
        <li>Modify the CSS styles</li>
        <li>Add some JavaScript interactions</li>
      </ul>
      <button id="colorButton">Change Colors</button>
    </div>
  </div>
  <script src="index.js"></script>
</body>
</html>`,

  '/styles.css': `body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  margin: 0;
  padding: 20px;
  background-color: #f5f8ff;
  color: #333;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #2563eb;
  text-align: center;
}

p {
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px;
}

.card {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

h2 {
  color: #4f46e5;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 10px;
}

ul {
  padding-left: 25px;
}

li {
  margin-bottom: 10px;
  position: relative;
}

button {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  display: block;
  margin: 20px auto 0;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #1d4ed8;
}`,

  '/index.js': `// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
  console.log('Page loaded and ready!');
  
  // Get references to elements
  const heading = document.querySelector('h1');
  const paragraph = document.querySelector('p');
  const card = document.getElementById('card');
  const colorButton = document.getElementById('colorButton');
  
  // Add click event to the button
  colorButton.addEventListener('click', function() {
    // Change background color with a random color
    const randomColor = getRandomColor();
    card.style.backgroundColor = randomColor;
    
    // Change text based on color brightness
    const brightness = calculateBrightness(randomColor);
    if (brightness < 128) {
      card.style.color = 'white';
    } else {
      card.style.color = '#333';
    }
  });
  
  // Function to generate a random color
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  // Function to calculate brightness of a color
  function calculateBrightness(color) {
    // Remove # if present
    color = color.replace('#', '');
    
    // Parse the hex values
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    
    // Calculate brightness using a common formula
    return (r * 299 + g * 587 + b * 114) / 1000;
  }
});`
};

// Theme switcher component
const ThemeSwitcher = () => {
  const { sandpack } = useSandpack();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Fix: Use SandpackProvider's theme prop to control theme instead of trying to modify it directly
    // sandpack object doesn't have a setTheme method
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="flex items-center gap-1" 
      onClick={toggleTheme}
    >
      {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
      {theme === 'light' ? 'Dark' : 'Light'} Mode
    </Button>
  );
};

// Run button component
const RunButton = () => {
  const { sandpack } = useSandpack();

  return (
    <Button 
      className="flex items-center gap-1 bg-green-600 hover:bg-green-700" 
      onClick={() => sandpack.runSandpack()}
    >
      <Play size={16} />
      Run Code
    </Button>
  );
};

interface CodingPlaygroundProps {
  defaultHeight?: string;
  showFileExplorer?: boolean;
  showRunButton?: boolean;
}

const CodingPlayground = ({
  defaultHeight = "600px",
  showFileExplorer = true,
  showRunButton = true
}: CodingPlaygroundProps) => {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
  
  return (
    <div className="w-full space-y-6 my-8">
      {/* Header section */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-primary">Interactive Coding Playground</h2>
        <p className="text-muted-foreground">
          Write, edit, and experiment with HTML, CSS, and JavaScript. See your results instantly!
        </p>
      </div>

      {/* Editor section */}
      <div className="rounded-xl border shadow-lg overflow-hidden">
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
              {showRunButton && <RunButton />}
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
      </div>

      {/* Instructions */}
      <div className="text-sm text-muted-foreground">
        <p>Use this playground to practice your web development skills. You can modify the HTML structure, CSS styles, or add JavaScript functionality.</p>
        <p className="mt-2">All changes update automatically in the preview window. Click "Run Code" to refresh if needed.</p>
      </div>
    </div>
  );
};

export default CodingPlayground;

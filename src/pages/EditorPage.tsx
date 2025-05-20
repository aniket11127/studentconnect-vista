
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import CodingPlayground from '@/components/playground/CodingPlayground';

const EditorPage = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container max-w-7xl py-10 px-4 md:px-6 mx-auto">
      <Helmet>
        <title>Code Editor | SGK14 Learning Platform</title>
        <meta name="description" content="Interactive code editor for learning HTML, CSS, JavaScript, Python, Java, C, C++, and SQL" />
      </Helmet>

      <div className="space-y-4 mb-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          SGK14 Code Editor
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Write, edit and run code in multiple programming languages. Perfect for learning and practicing your coding skills.
        </p>
      </div>

      <div className="bg-card rounded-xl border p-4 md:p-6 shadow-sm">
        <CodingPlayground 
          defaultHeight="700px"
          showFileExplorer={true}
          showRunButton={true}
        />
      </div>
      
      <div className="mt-8 text-sm text-muted-foreground">
        <p className="mb-2">Tips:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Choose your programming language from the dropdown menu</li>
          <li>For HTML/CSS/JS, changes update in real-time in the preview</li>
          <li>For Python, Java, C/C++ and SQL, click "Run Code" to see the output</li>
          <li>You can download your code files or upload existing ones</li>
          <li>Use the "Input" tab to provide data for programs that require user input</li>
        </ul>
      </div>
    </div>
  );
};

export default EditorPage;


import React from 'react';
import CodingPlayground from '@/components/playground/CodingPlayground';

const CodingPlaygroundPage = () => {
  return (
    <div className="container max-w-7xl py-10 px-4 md:px-6 mx-auto">
      <div className="space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          SGK14 Coding Lab
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Practice coding with our interactive playground. A safe space for students to experiment with HTML, CSS, and JavaScript.
        </p>
      </div>

      <div className="bg-card rounded-xl border p-6 md:p-8 shadow-sm">
        <div className="space-y-4 mb-6">
          <h2 className="text-2xl font-semibold text-card-foreground">Get Started with Web Development</h2>
          <p>
            This playground provides a realistic coding environment similar to professional tools like Visual Studio Code. 
            You can write code in HTML, CSS, and JavaScript files and see the results instantly in the preview panel.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 text-sm text-muted-foreground">
            <div className="bg-accent/50 rounded p-3 flex-1">
              <strong className="text-primary">For beginners:</strong> Try modifying the text or colors to learn the basics.
            </div>
            <div className="bg-accent/50 rounded p-3 flex-1">
              <strong className="text-primary">For intermediate:</strong> Add new elements or create animations with CSS.
            </div>
            <div className="bg-accent/50 rounded p-3 flex-1">
              <strong className="text-primary">For advanced:</strong> Create interactive features using JavaScript.
            </div>
          </div>
        </div>
        
        <CodingPlayground 
          defaultHeight="650px"
          showFileExplorer={true}
          showRunButton={true}
        />
      </div>
    </div>
  );
};

export default CodingPlaygroundPage;

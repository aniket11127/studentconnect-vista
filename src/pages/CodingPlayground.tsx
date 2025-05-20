
import React from 'react';
import CodingPlayground from '@/components/playground/CodingPlayground';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CodingPlaygroundPage = () => {
  return (
    <div className="container max-w-7xl py-10 px-4 md:px-6 mx-auto">
      <div className="space-y-4 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          SGK14 Coding Lab
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Practice coding with our interactive playground. Experiment with HTML, CSS, JavaScript, Python, Java, C, C++, and SQL in a safe environment.
        </p>
      </div>

      <div className="bg-card rounded-xl border p-6 md:p-8 shadow-sm">
        <div className="space-y-4 mb-6">
          <h2 className="text-2xl font-semibold text-card-foreground">Get Started with Programming</h2>
          <p>
            Our coding playground provides a realistic coding environment similar to professional tools. 
            Select your preferred programming language, write code, and see the results instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 text-sm text-muted-foreground">
            <div className="bg-accent/50 rounded p-3 flex-1">
              <strong className="text-primary">For beginners:</strong> Try HTML/CSS/JS to learn the basics of web development.
            </div>
            <div className="bg-accent/50 rounded p-3 flex-1">
              <strong className="text-primary">For intermediate:</strong> Experiment with Python or Java to build practical projects.
            </div>
            <div className="bg-accent/50 rounded p-3 flex-1">
              <strong className="text-primary">For advanced:</strong> Challenge yourself with C, C++, or complex SQL queries.
            </div>
          </div>
        </div>
        
        <CodingPlayground 
          defaultHeight="650px"
          showFileExplorer={true}
          showRunButton={true}
        />

        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-semibold mb-3">Learning Resources</h3>
          <Tabs defaultValue="web">
            <TabsList>
              <TabsTrigger value="web">Web Dev</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="java">Java</TabsTrigger>
              <TabsTrigger value="c-cpp">C/C++</TabsTrigger>
              <TabsTrigger value="sql">SQL</TabsTrigger>
            </TabsList>
            <TabsContent value="web" className="space-y-2 mt-4">
              <h4 className="font-medium">HTML, CSS & JavaScript Resources</h4>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Mozilla Developer Network (MDN) - Comprehensive web documentation</li>
                <li>W3Schools - Interactive tutorials and examples</li>
                <li>FreeCodeCamp - Free web development courses</li>
              </ul>
            </TabsContent>
            <TabsContent value="python" className="space-y-2 mt-4">
              <h4 className="font-medium">Python Resources</h4>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Python.org - Official Python documentation</li>
                <li>Automate the Boring Stuff with Python - Free online book</li>
                <li>Real Python - Tutorials and articles</li>
              </ul>
            </TabsContent>
            <TabsContent value="java" className="space-y-2 mt-4">
              <h4 className="font-medium">Java Resources</h4>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Oracle Java Tutorials - Official documentation</li>
                <li>Codecademy - Interactive Java courses</li>
                <li>Java Brains - Video tutorials</li>
              </ul>
            </TabsContent>
            <TabsContent value="c-cpp" className="space-y-2 mt-4">
              <h4 className="font-medium">C/C++ Resources</h4>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>CPlusPlus.com - Language tutorials and reference</li>
                <li>Learn C++ - Step-by-step tutorial</li>
                <li>Geeks for Geeks - C and C++ articles and examples</li>
              </ul>
            </TabsContent>
            <TabsContent value="sql" className="space-y-2 mt-4">
              <h4 className="font-medium">SQL Resources</h4>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>SQLZoo - Interactive SQL tutorials</li>
                <li>W3Schools SQL Tutorial - Comprehensive guide</li>
                <li>SQL Bolt - Learn SQL with interactive exercises</li>
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CodingPlaygroundPage;

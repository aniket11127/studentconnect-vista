
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeLanguage } from "./CodingPlayground";
import { toast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { executeCode, CodeExecutionResult } from "@/lib/codeExecution";
import { CodeEditorToolbar } from "./CodeEditorToolbar";
import { CodeTemplates } from "./CodeTemplates";

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
    currentTheme: "light" | "dark";
    setCurrentTheme: (theme: "light" | "dark") => void;
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
    executeCode: propExecuteCode,
    currentTheme,
    setCurrentTheme,
    height = "600px",
    fontSize,
    setFontSize,
    tabSize,
    setTabSize,
}: ExecutionPanelProps) => {
    const [activeTab, setActiveTab] = useState<string>("input");
    const [showMobileToggle, setShowMobileToggle] = useState<boolean>(false);
    const [executionStats, setExecutionStats] = useState<{
        time: number;
        memory: number;
    } | null>(null);

    // Handle file download
    const handleDownload = () => {
        try {
            let fileExtension = ".txt";
            if (language === "python") fileExtension = ".py";
            else if (language === "java") fileExtension = ".java";
            else if (language === "c") fileExtension = ".c";
            else if (language === "cpp") fileExtension = ".cpp";
            else if (language === "sql") fileExtension = ".sql";

            const fileName = `sgk14_${language}_code${fileExtension}`;
            const blob = new Blob([code], { type: "text/plain" });
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();

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
        e.target.value = "";
    };

    // Execute code using Judge0
    const handleExecuteCode = async () => {
        try {
            const result = await executeCode(code, language, input);

            if (result.error) {
                toast({
                    title: "Execution Error",
                    description: result.error,
                    variant: "destructive",
                });
                setActiveTab("output");
            } else {
                setExecutionStats({
                    time: result.executionTime,
                    memory: result.memory,
                });
                setActiveTab("output");
            }

            propExecuteCode();
        } catch (err) {
            toast({
                title: "Execution Error",
                description: "An error occurred while executing your code",
                variant: "destructive",
            });
        }
    };

    const displayOutput = () => {
        if (error) {
            return (
                <div className="text-red-500 font-mono text-sm">
                    <div className="font-semibold mb-2">❌ Execution Error:</div>
                    <pre className="whitespace-pre-wrap text-xs sm:text-sm">{error}</pre>
                </div>
            );
        }
        if (output) {
            return (
                <div>
                    <div className="text-green-600 font-semibold mb-2 text-sm">✅ Output:</div>
                    <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm">{output}</pre>
                    {executionStats && (
                        <div className="mt-4 pt-2 border-t text-xs text-muted-foreground">
                            <div>⏱️ Execution Time: {executionStats.time}ms</div>
                            <div>💾 Memory Used: {executionStats.memory}KB</div>
                        </div>
                    )}
                </div>
            );
        }
        return (
            <div className="text-muted-foreground text-center py-8">
                <div className="text-4xl mb-2">🚀</div>
                <div className="text-sm">Run your code to see the output here</div>
            </div>
        );
    };

    return (
        <div className="w-full h-full flex flex-col bg-background">
            {/* Responsive Toolbar */}
            <CodeEditorToolbar
                language={language}
                code={code}
                setCode={setCode}
                isExecuting={isExecuting}
                onExecute={handleExecuteCode}
                output={output}
                error={error}
                currentTheme={currentTheme}
                setCurrentTheme={setCurrentTheme}
                fontSize={fontSize}
                setFontSize={setFontSize}
                tabSize={tabSize}
                setTabSize={setTabSize}
                onDownload={handleDownload}
                onUpload={handleUpload}
                executionTime={executionStats?.time}
                memory={executionStats?.memory}
            />

            {/* Code Templates */}
            <div className="px-3 py-2 border-b bg-card/50">
                <CodeTemplates
                    language={language}
                    onTemplateSelect={(templateCode) => {
                        setCode(templateCode);
                        toast({
                            title: "Template loaded",
                            description: "Code template has been loaded into the editor",
                        });
                    }}
                />
            </div>

            {/* Mobile Toggle for Editor/Output */}
            <div className="sm:hidden p-2 border-b bg-card">
                <div className="flex gap-2">
                    <Button
                        variant={!showMobileToggle ? "default" : "outline"}
                        size="sm"
                        className="flex-1"
                        onClick={() => setShowMobileToggle(false)}
                    >
                        📝 Editor
                    </Button>
                    <Button
                        variant={showMobileToggle ? "default" : "outline"}
                        size="sm"
                        className="flex-1"
                        onClick={() => setShowMobileToggle(true)}
                    >
                        📤 Output
                        {error && <span className="ml-1 text-red-500">•</span>}
                        {output && !error && <span className="ml-1 text-green-500">•</span>}
                    </Button>
                </div>
            </div>

            {/* Main Content Area - Responsive Grid */}
            <div className="flex-1 flex flex-col sm:grid sm:grid-cols-2 gap-0 min-h-0">
                {/* Code Editor Section */}
                <div 
                    className={`flex flex-col min-h-0 border-b sm:border-b-0 sm:border-r border-border bg-background ${
                        showMobileToggle ? 'hidden sm:flex' : 'flex'
                    }`}
                >
                    <div className="p-2 border-b text-xs text-muted-foreground bg-card/30">
                        💻 Code Editor
                    </div>
                    <div className="flex-1 relative min-h-0">
                        <textarea
                            className={`w-full h-full p-3 font-mono focus:outline-none resize-none border-0 ${
                                currentTheme === "dark"
                                    ? "bg-gray-900 text-white"
                                    : "bg-white text-black"
                            }`}
                            style={{ 
                                fontSize: `${Math.max(fontSize - 3, 11)}px`,
                                tabSize: tabSize,
                                lineHeight: 1.4,
                                whiteSpace: "pre-wrap",
                                wordWrap: "break-word",
                                fontFamily: "Monaco, Menlo, 'Ubuntu Mono', monospace"
                            }}
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            spellCheck={false}
                            placeholder={`// Welcome to SGK14 ${language.toUpperCase()} Editor
// Start typing your code here...
// Use the templates above for quick examples!`}
                        />
                    </div>
                </div>

                {/* Input/Output Section */}
                <div 
                    className={`flex flex-col min-h-0 bg-background ${
                        !showMobileToggle ? 'hidden sm:flex' : 'flex'
                    }`}
                >
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="w-full h-full flex flex-col min-h-0"
                    >
                        {/* Horizontal Scrollable Tabs */}
                        <div className="border-b bg-card/30 overflow-x-auto">
                            <TabsList className="w-full sm:w-auto grid grid-cols-2 sm:inline-flex h-10 m-2 rounded-lg">
                                <TabsTrigger 
                                    value="input" 
                                    className="text-xs sm:text-sm px-2 sm:px-4 py-2 whitespace-nowrap"
                                >
                                    📝 Input
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="output"
                                    className="text-xs sm:text-sm px-2 sm:px-4 py-2 whitespace-nowrap"
                                >
                                    📤 Output
                                    {error && <span className="ml-1 text-red-500">•</span>}
                                    {output && !error && <span className="ml-1 text-green-500">•</span>}
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        {/* Tab Content */}
                        <TabsContent
                            value="input"
                            className="flex-1 p-0 m-0 min-h-0"
                        >
                            <div className="h-full flex flex-col">
                                <div className="p-2 border-b text-xs text-muted-foreground bg-accent/20">
                                    💡 Enter input data for your program (stdin)
                                </div>
                                <textarea
                                    className={`flex-1 p-3 font-mono text-xs sm:text-sm focus:outline-none resize-none border-0 ${
                                        currentTheme === "dark"
                                            ? "bg-gray-900 text-white"
                                            : "bg-white text-black"
                                    }`}
                                    style={{ 
                                        fontSize: `${Math.max(fontSize - 3, 11)}px`,
                                        fontFamily: "Monaco, Menlo, 'Ubuntu Mono', monospace",
                                        whiteSpace: "pre-wrap"
                                    }}
                                    placeholder="Enter input here (each line will be sent to your program)..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    spellCheck={false}
                                />
                            </div>
                        </TabsContent>

                        <TabsContent
                            value="output"
                            className="flex-1 p-0 m-0 min-h-0"
                        >
                            <ScrollArea className="h-full">
                                <div className="p-3 text-xs sm:text-sm min-h-full">
                                    {displayOutput()}
                                </div>
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {/* Status Bar */}
            <div className="p-2 text-xs text-muted-foreground border-t bg-card/30">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <span>
                        📄 {language.toUpperCase()} • {code.split("\n").length} lines • {code.length} chars
                    </span>
                    <span className="flex items-center gap-1">
                        {isExecuting ? (
                            <>⏳ Running...</>
                        ) : output && !error ? (
                            <>✅ Executed successfully</>
                        ) : error ? (
                            <>❌ Execution failed</>
                        ) : (
                            <>🎯 Ready to run</>
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
};

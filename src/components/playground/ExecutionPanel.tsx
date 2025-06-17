
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
                setActiveTab("output"); // Switch to output tab to show error
            } else {
                setExecutionStats({
                    time: result.executionTime,
                    memory: result.memory,
                });
                setActiveTab("output"); // Switch to output tab to show results
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
                <div className="text-red-500 font-mono">
                    <div className="font-semibold mb-2">❌ Execution Error:</div>
                    <pre className="whitespace-pre-wrap">{error}</pre>
                </div>
            );
        }
        if (output) {
            return (
                <div>
                    <div className="text-green-600 font-semibold mb-2">✅ Output:</div>
                    <pre className="whitespace-pre-wrap font-mono">{output}</pre>
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
                <div>Run your code to see the output here</div>
            </div>
        );
    };

    return (
        <div className="w-full h-full flex flex-col">
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

            <div className="p-3 md:p-4">
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

            {/* Mobile-first responsive layout */}
            <div className="flex flex-col md:grid md:grid-cols-2 gap-0 flex-grow h-full">
                {/* Code Editor */}
                <div
                    className={`order-1 md:order-1 border-b md:border-b-0 md:border-r ${
                        currentTheme === "dark" ? "bg-gray-900" : "bg-white"
                    } min-h-[300px] md:min-h-0`}
                    style={{ height: "auto", minHeight: "300px" }}
                >
                    <div className="p-2 md:p-3 border-b text-xs md:text-sm text-muted-foreground bg-card">
                        💻 Code Editor - Scroll horizontally if needed
                    </div>
                    <div className="relative h-full">
                        <textarea
                            className={`w-full h-full p-3 md:p-4 font-mono focus:outline-none resize-none ${
                                currentTheme === "dark"
                                    ? "bg-gray-900 text-white"
                                    : "bg-white text-black"
                            } min-h-[250px]`}
                            style={{ 
                                fontSize: `${Math.max(fontSize - 2, 12)}px`, 
                                tabSize: tabSize,
                                lineHeight: 1.5,
                                overflowX: "auto",
                                whiteSpace: "pre"
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

                {/* Input/Output Tabs */}
                <div
                    className={`order-2 md:order-2 ${
                        currentTheme === "dark"
                            ? "bg-gray-900 text-white"
                            : "bg-white text-black"
                    } flex flex-col h-auto md:h-full border-t md:border-t-0 md:border-l border-border min-h-[300px]`}
                >
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="w-full h-full flex flex-col"
                    >
                        <TabsList className="w-full grid grid-cols-2 m-2 md:m-3 rounded-lg h-10 md:h-12">
                            <TabsTrigger 
                                value="input" 
                                className="text-xs md:text-sm px-2 md:px-3 py-2 md:py-3 min-h-[40px] md:min-h-[44px]"
                            >
                                📝 Input
                            </TabsTrigger>
                            <TabsTrigger 
                                value="output"
                                className="text-xs md:text-sm px-2 md:px-3 py-2 md:py-3 min-h-[40px] md:min-h-[44px]"
                            >
                                📤 Output
                                {error && (
                                    <span className="ml-1 text-red-500">•</span>
                                )}
                                {output && !error && (
                                    <span className="ml-1 text-green-500">•</span>
                                )}
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent
                            value="input"
                            className="p-0 flex-grow h-full mx-2 md:mx-3 mb-2 md:mb-3 mt-0"
                        >
                            <div className="p-2 md:p-3 border-b text-xs md:text-sm text-muted-foreground bg-accent/20 rounded-t">
                                💡 Enter input data for your program (stdin)
                            </div>
                            <textarea
                                className={`w-full p-3 md:p-4 font-mono text-xs md:text-sm focus:outline-none resize-none border rounded-b ${
                                    currentTheme === "dark"
                                        ? "bg-gray-900 text-white border-gray-700"
                                        : "bg-white text-black border-gray-200"
                                } min-h-[200px]`}
                                style={{ 
                                    fontSize: `${Math.max(fontSize - 2, 12)}px`,
                                    height: "calc(100% - 50px)"
                                }}
                                placeholder="Enter input here (each line will be sent to your program)..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                spellCheck={false}
                            />
                        </TabsContent>
                        <TabsContent
                            value="output"
                            className="p-0 flex-grow h-full mx-2 md:mx-3 mb-2 md:mb-3 mt-0"
                        >
                            <ScrollArea className="h-full border rounded">
                                <div
                                    className="w-full p-3 md:p-4 text-xs md:text-sm min-h-[200px]"
                                    style={{ fontSize: `${Math.max(fontSize - 2, 12)}px` }}
                                >
                                    {displayOutput()}
                                </div>
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            <div className="p-2 md:p-3 text-xs text-muted-foreground border-t mt-auto bg-card">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <span className="text-center sm:text-left">
                        📄 {language.toUpperCase()} • {code.split("\n").length} lines • {code.length} characters
                    </span>
                    <span className="flex items-center gap-1 text-center sm:text-right">
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

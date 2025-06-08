
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

            <div className="p-4">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 flex-grow h-full">
                {/* Code Editor */}
                <div
                    className={`border-r ${
                        currentTheme === "dark" ? "bg-gray-900" : "bg-white"
                    }`}
                    style={{ height: "100%", overflow: "auto" }}
                >
                    <textarea
                        className={`w-full h-full p-4 font-mono focus:outline-none resize-none ${
                            currentTheme === "dark"
                                ? "bg-gray-900 text-white"
                                : "bg-white text-black"
                        }`}
                        style={{ 
                            fontSize: `${fontSize}px`, 
                            tabSize: tabSize,
                            lineHeight: 1.5
                        }}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        spellCheck={false}
                        placeholder={`// Welcome to SGK14 ${language.toUpperCase()} Editor
// Start typing your code here...
// Use the templates above for quick examples!`}
                    />
                </div>

                {/* Input/Output Tabs */}
                <div
                    className={`${
                        currentTheme === "dark"
                            ? "bg-gray-900 text-white"
                            : "bg-white text-black"
                    } flex flex-col h-full border-l border-border`}
                >
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="w-full h-full flex flex-col"
                    >
                        <TabsList className="w-full grid grid-cols-2">
                            <TabsTrigger value="input">📝 Input</TabsTrigger>
                            <TabsTrigger value="output">
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
                            className="p-0 flex-grow h-full"
                        >
                            <div className="p-3 border-b text-sm text-muted-foreground">
                                💡 Enter input data for your program (stdin)
                            </div>
                            <textarea
                                className={`w-full p-4 font-mono text-sm focus:outline-none resize-none ${
                                    currentTheme === "dark"
                                        ? "bg-gray-900 text-white"
                                        : "bg-white text-black"
                                }`}
                                style={{ 
                                    fontSize: `${fontSize}px`,
                                    height: "calc(100% - 60px)"
                                }}
                                placeholder="Enter input here (each line will be sent to your program)..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                spellCheck={false}
                            />
                        </TabsContent>
                        <TabsContent
                            value="output"
                            className="p-0 flex-grow h-full"
                        >
                            <ScrollArea className="h-full">
                                <div
                                    className="w-full p-4 text-sm"
                                    style={{ fontSize: `${fontSize}px` }}
                                >
                                    {displayOutput()}
                                </div>
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            <div className="p-2 text-xs text-muted-foreground border-t mt-auto">
                <div className="flex items-center justify-between">
                    <span>
                        📄 {language.toUpperCase()} • {code.split("\n").length} lines • {code.length} characters
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

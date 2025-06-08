
import axios from "axios";

// Judge0 API configuration
const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com";
const RAPIDAPI_KEY = "f91cc74719msh5fc795277f1c193p196528jsn1016b7950e62";

// Language IDs for Judge0
const LANGUAGE_IDS = {
    python: 71,
    java: 62,
    c: 50,
    cpp: 54,
    sql: 82,
};

// API headers
const headers = {
    "content-type": "application/json",
    "X-RapidAPI-Key": RAPIDAPI_KEY,
    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
};

export interface CodeExecutionResult {
    output: string;
    error: string | null;
    executionTime: number;
    memory: number;
    status?: string;
}

export async function executeCode(
    code: string,
    language: string,
    input: string = ""
): Promise<CodeExecutionResult> {
    try {
        console.log(`Executing ${language} code...`);
        
        // Validate language
        if (!(language in LANGUAGE_IDS)) {
            throw new Error(`Unsupported language: ${language}`);
        }

        // Create submission
        const submissionData = {
            source_code: btoa(code), // Base64 encode the source code
            language_id: LANGUAGE_IDS[language as keyof typeof LANGUAGE_IDS],
            stdin: input ? btoa(input) : "", // Base64 encode input if provided
            expected_output: null,
        };

        console.log("Submitting code for execution...");
        const createSubmissionResponse = await axios.post(
            `${JUDGE0_API_URL}/submissions`,
            submissionData,
            { 
                headers,
                timeout: 10000 // 10 second timeout
            }
        );

        const token = createSubmissionResponse.data.token;
        console.log(`Submission token: ${token}`);

        // Poll for execution result
        let result;
        let attempts = 0;
        const maxAttempts = 20; // Increased max attempts
        
        while (attempts < maxAttempts) {
            console.log(`Polling attempt ${attempts + 1}/${maxAttempts}...`);
            
            const response = await axios.get(
                `${JUDGE0_API_URL}/submissions/${token}`,
                { 
                    headers,
                    timeout: 5000 // 5 second timeout for polling
                }
            );

            const status = response.data.status;
            console.log(`Execution status: ${status.description} (ID: ${status.id})`);

            // Status meanings:
            // 1: In Queue, 2: Processing, 3: Accepted, 4: Wrong Answer, 5: Time Limit Exceeded
            // 6: Compilation Error, 7: Runtime Error (SIGSEGV), 8: Runtime Error (SIGXFSZ)
            // 9: Runtime Error (SIGFPE), 10: Runtime Error (SIGABRT), 11: Runtime Error (NZEC)
            // 12: Runtime Error (Other), 13: Internal Error, 14: Exec Format Error
            if (status.id > 2) {
                result = response.data;
                break;
            }

            await new Promise((resolve) => setTimeout(resolve, 1500)); // Wait 1.5 seconds
            attempts++;
        }

        if (!result) {
            console.error("Execution timed out after polling");
            return {
                output: "",
                error: "Code execution timed out. Please try again or check your code for infinite loops.",
                executionTime: 0,
                memory: 0,
                status: "timeout"
            };
        }

        // Process the result
        const output = result.stdout ? atob(result.stdout) : "";
        const stderr = result.stderr ? atob(result.stderr) : null;
        const compileOutput = result.compile_output ? atob(result.compile_output) : null;
        
        let error = null;
        if (stderr) error = stderr;
        else if (compileOutput) error = compileOutput;
        else if (result.status.id !== 3) {
            // Status is not "Accepted"
            error = `Runtime Error: ${result.status.description}`;
        }

        const executionTime = parseFloat(result.time) * 1000 || 0; // Convert to milliseconds
        const memory = parseInt(result.memory) || 0;

        console.log("Execution completed:", {
            status: result.status.description,
            hasOutput: !!output,
            hasError: !!error,
            executionTime,
            memory
        });

        return {
            output,
            error,
            executionTime: Math.round(executionTime),
            memory,
            status: result.status.description
        };
    } catch (error) {
        console.error("Code execution error:", error);
        
        if (axios.isAxiosError(error)) {
            if (error.code === 'ECONNABORTED') {
                return {
                    output: "",
                    error: "Request timed out. Please check your internet connection and try again.",
                    executionTime: 0,
                    memory: 0,
                    status: "network_timeout"
                };
            } else if (error.response?.status === 429) {
                return {
                    output: "",
                    error: "Rate limit exceeded. Please wait a moment and try again.",
                    executionTime: 0,
                    memory: 0,
                    status: "rate_limited"
                };
            } else if (error.response?.status >= 500) {
                return {
                    output: "",
                    error: "Judge0 service is temporarily unavailable. Please try again later.",
                    executionTime: 0,
                    memory: 0,
                    status: "service_unavailable"
                };
            }
        }

        return {
            output: "",
            error: "An unexpected error occurred while executing your code. Please try again.",
            executionTime: 0,
            memory: 0,
            status: "unknown_error"
        };
    }
}

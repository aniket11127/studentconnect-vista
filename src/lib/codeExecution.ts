import axios from "axios";

// Judge0 API configuration
const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com";
const RAPIDAPI_KEY = "f91cc74719msh5fc795277f1c193p196528jsn1016b7950e62"; // You'll need to get this from RapidAPI

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
}

export async function executeCode(
    code: string,
    language: string,
    input: string = ""
): Promise<CodeExecutionResult> {
    try {
        // Create submission
        const createSubmissionResponse = await axios.post(
            `${JUDGE0_API_URL}/submissions`,
            {
                source_code: code,
                language_id:
                    LANGUAGE_IDS[language as keyof typeof LANGUAGE_IDS],
                stdin: input,
            },
            { headers }
        );

        const token = createSubmissionResponse.data.token;

        // Wait for execution to complete
        let result;
        let attempts = 0;
        const maxAttempts = 10;

        while (attempts < maxAttempts) {
            const response = await axios.get(
                `${JUDGE0_API_URL}/submissions/${token}`,
                { headers }
            );

            if (response.data.status.id > 2) {
                // Status > 2 means execution is complete
                result = response.data;
                break;
            }

            await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before next attempt
            attempts++;
        }

        if (!result) {
            throw new Error("Execution timed out");
        }

        // Process the result
        const output = result.stdout || "";
        const error = result.stderr || result.compile_output || null;
        const executionTime = result.time || 0;
        const memory = result.memory || 0;

        return {
            output,
            error,
            executionTime,
            memory,
        };
    } catch (error) {
        console.error("Code execution error:", error);
        return {
            output: "",
            error: "An error occurred while executing your code. Please try again.",
            executionTime: 0,
            memory: 0,
        };
    }
}

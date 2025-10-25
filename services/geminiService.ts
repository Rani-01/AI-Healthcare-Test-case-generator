
import { GoogleGenAI, Type } from "@google/genai";
import { TestCase, ComplianceStandard, AlmTool } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const testCaseSchema = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING, description: 'A unique identifier for the test case, e.g., TC-001.' },
    title: { type: Type.STRING, description: 'A concise, descriptive title for the test case.' },
    description: { type: Type.STRING, description: 'A brief description of the test objective.' },
    steps: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'A list of clear, sequential steps to execute the test.'
    },
    expectedResult: { type: Type.STRING, description: 'The expected outcome if the test passes.' },
    traceability: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'A list of requirement IDs or compliance clauses this test case traces back to.'
    },
  },
  required: ['id', 'title', 'description', 'steps', 'expectedResult', 'traceability']
};

export const generateTestCases = async (
  requirements: string,
  standards: ComplianceStandard[],
  tool: AlmTool
): Promise<TestCase[]> => {
  const standardNames = standards.map(s => s.name).join(', ');

  const systemInstruction = `You are a world-class AI specialized in software quality assurance for the regulated healthcare industry. Your task is to generate comprehensive, traceable, and compliant test cases from a given set of software requirements.
  - Analyze the requirements with a focus on functionality, security, performance, and usability.
  - The generated test cases MUST adhere to the following compliance standards: ${standardNames}.
  - The output format should be suitable for integration with the ALM tool: ${tool.name}.
  - Ensure each test case has a unique ID, a clear title, actionable steps, a precise expected result, and traceability links to the requirements or standards.
  - ONLY output a valid JSON array of test case objects adhering to the provided schema. Do not output any other text, explanation, or markdown formatting.`;

  const prompt = `
    Please generate test cases for the following software requirements:

    --- REQUIREMENTS START ---
    ${requirements}
    --- REQUIREMENTS END ---
    `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: testCaseSchema,
        },
        temperature: 0.5,
        topP: 0.9,
      },
    });

    const jsonText = response.text.trim();
    const parsedResult = JSON.parse(jsonText);
    
    if (!Array.isArray(parsedResult)) {
        throw new Error("API did not return a valid JSON array.");
    }
    
    // Simple validation
    return parsedResult.filter(item => item.id && item.title && Array.isArray(item.steps));

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
};

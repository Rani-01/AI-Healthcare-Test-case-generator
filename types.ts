
export interface TestCase {
  id: string;
  title: string;
  description: string;
  steps: string[];
  expectedResult: string;
  traceability: string[]; 
}

export interface ComplianceStandard {
  id: string;
  name: string;
  description: string;
}

export interface AlmTool {
  id: string;
  name: string;
}

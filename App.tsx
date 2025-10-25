
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { RequirementInput } from './components/RequirementInput';
import { ConfigurationPanel } from './components/ConfigurationPanel';
import { TestCaseOutput } from './components/TestCaseOutput';
import { TestCase, ComplianceStandard, AlmTool } from './types';
import { COMPLIANCE_STANDARDS, ALM_TOOLS } from './constants';
import { generateTestCases } from './services/geminiService';
import { ArrowRightIcon } from './components/icons/ArrowRightIcon';

const App: React.FC = () => {
  const [requirements, setRequirements] = useState<string>('');
  const [selectedStandards, setSelectedStandards] = useState<string[]>([COMPLIANCE_STANDARDS[0].id]);
  const [selectedTool, setSelectedTool] = useState<string>(ALM_TOOLS[0].id);
  const [generatedTestCases, setGeneratedTestCases] = useState<TestCase[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateClick = useCallback(async () => {
    if (!requirements.trim()) {
      setError('Please enter some requirements to generate test cases.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedTestCases([]);

    try {
      const standards = COMPLIANCE_STANDARDS.filter(s => selectedStandards.includes(s.id));
      const tool = ALM_TOOLS.find(t => t.id === selectedTool);
      
      if (!tool) {
        throw new Error('Selected tool not found.');
      }
      
      const results = await generateTestCases(requirements, standards, tool);
      setGeneratedTestCases(results);
    } catch (err) {
      console.error(err);
      setError('Failed to generate test cases. Please check your connection and API key, then try again.');
    } finally {
      setIsLoading(false);
    }
  }, [requirements, selectedStandards, selectedTool]);
  
  const isGenerateButtonDisabled = !requirements.trim() || isLoading;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-4 space-y-6">
            <RequirementInput value={requirements} onChange={setRequirements} />
            <ConfigurationPanel
              selectedStandards={selectedStandards}
              onStandardChange={setSelectedStandards}
              selectedTool={selectedTool}
              onToolChange={setSelectedTool}
            />
          </div>

          <div className="lg:col-span-1 flex flex-col items-center justify-center">
             <div className="w-full flex items-center justify-center">
                 <button
                    onClick={handleGenerateClick}
                    disabled={isGenerateButtonDisabled}
                    className="w-16 h-16 bg-brand-primary text-white rounded-full shadow-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-accent focus:ring-opacity-50 flex items-center justify-center"
                    aria-label="Generate test cases"
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <ArrowRightIcon className="w-8 h-8" />
                    )}
                  </button>
              </div>
          </div>

          <div className="lg:col-span-7">
            <TestCaseOutput
              testCases={generatedTestCases}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;

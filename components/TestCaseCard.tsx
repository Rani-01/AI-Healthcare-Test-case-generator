
import React from 'react';
import { TestCase } from '../types';

interface TestCaseCardProps {
  testCase: TestCase;
}

export const TestCaseCard: React.FC<TestCaseCardProps> = ({ testCase }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(testCase, null, 2));
    };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start">
            <div>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                {testCase.id}
                </span>
                <h3 className="text-lg font-bold text-brand-secondary mt-1">{testCase.title}</h3>
            </div>
            <button onClick={handleCopy} className="text-gray-400 hover:text-brand-primary" title="Copy JSON">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            </button>
        </div>
        <p className="text-sm text-gray-600 mt-2">{testCase.description}</p>
        
        <div className="mt-4">
            <h4 className="font-semibold text-gray-700 text-sm">Steps:</h4>
            <ol className="list-decimal list-inside mt-1 text-sm text-gray-600 space-y-1">
                {testCase.steps.map((step, index) => <li key={index}>{step}</li>)}
            </ol>
        </div>

        <div className="mt-4">
            <h4 className="font-semibold text-gray-700 text-sm">Expected Result:</h4>
            <p className="mt-1 text-sm text-gray-600 bg-green-50 p-2 rounded border border-green-200">{testCase.expectedResult}</p>
        </div>
        
        {testCase.traceability && testCase.traceability.length > 0 && (
            <div className="mt-4">
                <h4 className="font-semibold text-gray-700 text-sm">Traceability:</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                {testCase.traceability.map((trace, index) => (
                    <span key={index} className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-md">
                    {trace}
                    </span>
                ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

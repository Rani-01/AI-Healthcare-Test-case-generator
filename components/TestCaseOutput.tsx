
import React from 'react';
import { TestCase } from '../types';
import { TestCaseCard } from './TestCaseCard';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { ExclamationIcon } from './icons/ExclamationIcon';

interface TestCaseOutputProps {
  testCases: TestCase[];
  isLoading: boolean;
  error: string | null;
}

const LoadingSkeleton: React.FC = () => (
    <div className="space-y-4 animate-pulse">
        {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-200 p-4 rounded-lg">
                <div className="h-4 bg-gray-300 rounded w-1/3 mb-3"></div>
                <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-5/6"></div>
            </div>
        ))}
    </div>
);


export const TestCaseOutput: React.FC<TestCaseOutputProps> = ({ testCases, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return <LoadingSkeleton />;
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-red-50 border border-red-200 rounded-lg">
          <ExclamationIcon className="w-12 h-12 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold text-red-800">An Error Occurred</h3>
          <p className="text-red-600 mt-2">{error}</p>
        </div>
      );
    }
    
    if (testCases.length > 0) {
      return (
        <div className="space-y-4">
          {testCases.map((tc, index) => (
            <TestCaseCard key={tc.id || index} testCase={tc} />
          ))}
        </div>
      );
    }

    return (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg h-full">
            <CheckCircleIcon className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Generated Test Cases</h3>
            <p className="text-gray-500 mt-2">Your AI-generated test cases will appear here once generated.</p>
        </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-full">
      <h2 className="text-lg font-semibold text-brand-secondary flex items-center mb-4">
        3. Review Output
      </h2>
      <div className="mt-4 h-[calc(100%-2rem)] overflow-y-auto pr-2">
        {renderContent()}
      </div>
    </div>
  );
};

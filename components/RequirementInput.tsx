import React from 'react';
import { DocumentTextIcon } from './icons/DocumentTextIcon';

interface RequirementInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const RequirementInput: React.FC<RequirementInputProps> = ({ value, onChange }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col">
      <h2 className="text-lg font-semibold text-brand-secondary flex items-center mb-4">
        <DocumentTextIcon className="w-6 h-6 mr-2 text-brand-primary" />
        1. Provide Requirements
      </h2>
      <div className="flex-grow flex flex-col">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste your software requirements here, or upload a document..."
            className="w-full flex-grow p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-shadow duration-200 resize-none"
            rows={10}
          />
        <div className="mt-4">
            <label htmlFor="file-upload" className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Upload File (.txt, .md)
            </label>
            <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".txt,.md,.xml" onChange={handleFileChange} />
        </div>
      </div>
    </div>
  );
};
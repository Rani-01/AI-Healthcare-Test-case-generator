import React from 'react';
import { COMPLIANCE_STANDARDS, ALM_TOOLS } from '../constants';
import { GearIcon } from './icons/GearIcon';

interface ConfigurationPanelProps {
  selectedStandards: string[];
  onStandardChange: (selected: string[]) => void;
  selectedTool: string;
  onToolChange: (tool: string) => void;
}

export const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({
  selectedStandards,
  onStandardChange,
  selectedTool,
  onToolChange
}) => {
  const handleStandardToggle = (standardId: string) => {
    const newSelection = selectedStandards.includes(standardId)
      ? selectedStandards.filter((id) => id !== standardId)
      : [...selectedStandards, standardId];
    onStandardChange(newSelection);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-brand-secondary flex items-center mb-4">
        <GearIcon className="w-6 h-6 mr-2 text-brand-primary" />
        2. Configure Generation
      </h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Compliance Standards
          </label>
          <p className="text-xs text-gray-500 mt-1 mb-2">Select all standards the test cases must adhere to.</p>
          <div className="space-y-2">
            {COMPLIANCE_STANDARDS.map((standard) => (
              <div key={standard.id} className="flex items-center">
                <input
                  id={standard.id}
                  name={standard.id}
                  type="checkbox"
                  checked={selectedStandards.includes(standard.id)}
                  onChange={() => handleStandardToggle(standard.id)}
                  className="h-4 w-4 text-brand-primary focus:ring-brand-accent border-gray-300 rounded"
                />
                <label htmlFor={standard.id} className="ml-3 block text-sm text-gray-800">
                  {standard.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <label htmlFor="alm-tool" className="block text-sm font-medium text-gray-700">
            Target Toolchain
          </label>
          <p className="text-xs text-gray-500 mt-1 mb-2">Choose the ALM tool for format compatibility.</p>
          <select
            id="alm-tool"
            name="alm-tool"
            value={selectedTool}
            onChange={(e) => onToolChange(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm rounded-md"
          >
            {ALM_TOOLS.map((tool) => (
              <option key={tool.id} value={tool.id}>
                {tool.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

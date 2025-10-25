
import React from 'react';
import { LogoIcon } from './icons/LogoIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-brand-secondary shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <LogoIcon className="h-8 w-8 text-brand-accent" />
            <h1 className="text-xl font-bold text-white tracking-tight">
              AI Healthcare Test Case Generator
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

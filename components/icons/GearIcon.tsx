
import React from 'react';

export const GearIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.007 1.11-.95.542.057 1.007.56 1.065 1.11L12 12l.231.625c.058.542.523 1.058 1.065 1.11.542.057 1.02-.407 1.11-.95L15.405 12l-1.06-2.894c-.09-.542-.56-1.007-1.11-.95-.542.057-1.007.56-1.065 1.11L12 12l-.231.625c-.058.542-.523 1.058-1.065 1.11-.542.057-1.02-.407-1.11-.95L8.595 12l1.06-2.894Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18ZM12 3.75v.008v-.008Z" />
  </svg>
);


import { ComplianceStandard, AlmTool } from './types';

export const COMPLIANCE_STANDARDS: ComplianceStandard[] = [
  { id: 'fda_21_cfr_part_820', name: 'FDA 21 CFR Part 820', description: 'Quality System Regulation for medical devices.' },
  { id: 'iec_62304', name: 'IEC 62304', description: 'Software life cycle processes for medical device software.' },
  { id: 'iso_13485', name: 'ISO 13485', description: 'Quality management systems for medical devices.' },
  { id: 'iso_9001', name: 'ISO 9001', description: 'General quality management systems.' },
  { id: 'iso_27001', name: 'ISO 27001', description: 'Information security management.' },
  { id: 'gdpr', name: 'GDPR', description: 'General Data Protection Regulation for data privacy.' },
];

export const ALM_TOOLS: AlmTool[] = [
  { id: 'jira', name: 'Jira' },
  { id: 'polarion', name: 'Polarion' },
  { id: 'azure_devops', name: 'Azure DevOps' },
  { id: 'generic', name: 'Generic / CSV' },
];

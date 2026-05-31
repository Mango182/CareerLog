export const APPLICATION_STATUSES = [
  'Saved',
  'Applied',
  'Interview',
  'Offer',
  'Rejected',
  'Ghosted',
] as const;

export type ApplicationStatus = typeof APPLICATION_STATUSES[number];

export type JobApplication = {
  id: string;
  company: string;
  position: string;
  status: ApplicationStatus;
  location?: string;
  jobType?: 'Internship' | 'Full-time' | 'Part-time' | 'Contract';
  workMode?: 'Remote' | 'Hybrid' | 'On-site';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
};
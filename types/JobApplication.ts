export type ApplicationStatus =
  | 'Saved'
  | 'Applied'
  | 'Interview'
  | 'Offer'
  | 'Rejected'
  | 'Ghosted';

export type JobApplication = {
  id: string;
  company: string;
  position: string;
  status: ApplicationStatus;
  location?: string;
  jobType?: 'Internship' | 'Full-time' | 'Part-time' | 'Contract';
  workMode?: 'Remote' | 'Hybrid' | 'On-site';
  dateApplied?: string;
  followUpDate?: string;
  notes?: string;
};
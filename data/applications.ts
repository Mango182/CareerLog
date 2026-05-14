import { JobApplication } from '@/types/JobApplication';

export const applications: JobApplication[] = [
  {
    id: '1',
    company: 'Symbotic',
    position: 'Software Engineer New Grad',
    status: 'Applied',
    location: 'Wilmington, MA',
    jobType: 'Full-time',
    workMode: 'Hybrid',
    dateApplied: '2026-05-09',
  },
  {
    id: '2',
    company: 'Longwood Collective',
    position: 'Data Intern',
    status: 'Interview',
    location: 'Boston, MA',
    jobType: 'Internship',
    workMode: 'On-site',
    dateApplied: '2026-05-07',
  },
  {
    id: '3',
    company: 'UMass Lowell',
    position: 'IT Support Intern',
    status: 'Saved',
    location: 'Lowell, MA',
    jobType: 'Internship',
    workMode: 'On-site',
  },
];
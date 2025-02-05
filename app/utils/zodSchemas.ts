import { z } from 'zod';

const DegreeEnum = z.enum([
  'HIGH_SCHOOL_DIPLOMA',
  'BACHELORS',
  'MASTERS',
  'DOCTORATE',
]);

const jobTypeEnum = z.enum([
  'FULL_TIME',
  'PART_TIME',
  'CONTRACT',
  'INTERNSHIP',
]);

const seniorityEnum = z.enum(['JUNIOR', 'MEDIOR', 'SENIOR']);

const remoteEnum = z.enum(['AVAILABLE', 'NOT_AVAILABLE']);

const statusEnum = z.enum(['EMPLOYED', 'UNEMPLOYED', 'OPENTOWORK']);

export const educationSchema = z.object({
  institution: z.string().min(1, 'Institution is required'),
  degree: DegreeEnum,
  startYear: z.string(),
  endYear: z.string(),
});

export const experienceSchema = z.object({
  company: z.string().min(1, 'Company is required').max(25),
  role: z.string().min(1, 'Role is required').max(20),
  startYear: z.string(),
  endYear: z.string(),
  roleDescription: z.string().min(1).max(200),
});

export const profileSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  currentStatus: z.enum(['opentowork', 'employed', 'unemployed']).optional(),
  skills: z.array(z.string()).optional(),
  location: z.string().min(2).max(50),
  contact: z.string().email({ message: 'Invalid email address' }),
  status: statusEnum,
});

export const companySchema = z.object({
  companyName: z.string().min(1).max(50),
  industry: z.string().min(1).max(100),
  location: z.string().min(2).max(50),
  companySize: z.number().min(1),
  companyDescription: z.string().min(1).max(500),
  website: z.string(),
  coverImage: z.string().min(1),
});

export const jobAlertSchema = z.object({
  jobTitle: z.string().min(1).max(50),
  salary: z.string(),
  jobDescription: z.string().min(5).max(2000),
  location: z.string().min(1).max(50),
  remote: remoteEnum,
  level: seniorityEnum,
  jobType: jobTypeEnum,
});

export const applicationSchema = z.object({
  fullName: z.string().min(1).max(30),
  email: z.string(),
  coverLetter: z.string().min(1).max(750),
  jobId: z.string(),
});

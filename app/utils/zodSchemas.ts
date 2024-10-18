import { z } from 'zod';

const DegreeEnum = z.enum([
  'HIGH_SCHOOL_DIPLOMA',
  'BACHELORS',
  'MASTERS',
  'DOCTORATE',
]);

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
});

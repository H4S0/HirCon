import { z } from 'zod';

// Degree enum for validation
const DegreeEnum = z.enum([
  'HIGH_SCHOOL_DIPLOMA',
  'BACHELORS',
  'MASTERS',
  'DOCTORATE',
]);

// Education schema
export const educationSchema = z
  .object({
    institution: z.string().min(1, 'Institution is required'),
    degree: DegreeEnum, // Use the enum for degree
    startYear: z.number().int().min(1900).max(new Date().getFullYear()),
    endYear: z
      .number()
      .int()
      .min(1900)
      .max(new Date().getFullYear())
      .optional()
      .refine(
        (val) => {
          return typeof val === 'undefined' || val >= 1900;
        },
        {
          message: 'End year must be after the start year',
        }
      ),
  })
  .refine(
    (data) => {
      return !data.endYear || data.endYear >= data.startYear;
    },
    {
      message: 'End year cannot be earlier than the start year',
      path: ['endYear'], // This will target the specific field that fails validation
    }
  );

// Experience schema
export const experienceSchema = z
  .object({
    company: z.string().min(1, 'Company is required'),
    role: z.string().min(1, 'Role is required'),
    startYear: z.number().int().min(1900).max(new Date().getFullYear()),
    endYear: z
      .number()
      .int()
      .min(1900)
      .max(new Date().getFullYear())
      .optional()
      .refine(
        (val) => {
          return typeof val === 'undefined' || val >= 1900;
        },
        {
          message: 'End year must be after the start year',
        }
      ),
  })
  .refine(
    (data) => {
      return !data.endYear || data.endYear >= data.startYear;
    },
    {
      message: 'End year cannot be earlier than the start year',
      path: ['endYear'],
    }
  );

// Profile schema
export const profileSchema = z.object({
  description: z.string().optional(),
  currentStatus: z.enum(['opentowork', 'employed', 'unemployed']).optional(),
  skills: z.array(z.string()).optional(),
});

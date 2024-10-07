import { z } from 'zod';

export const profileSchema = z.object({
  description: z.string(),
  currentStatus: z.enum(['opentowork', 'employed', 'unemployed']).optional(),
  skills: z.array(z.string()).optional(),
  education: z
    .array(
      z.object({
        institution: z.string(),
        degree: z.string(),
        startYear: z.number().int().min(1900).max(new Date().getFullYear()),
        endYear: z
          .number()
          .int()
          .min(1900)
          .max(new Date().getFullYear())
          .optional(),
      })
    )
    .optional(),
  experience: z
    .array(
      z.object({
        company: z.string(),
        role: z.string(),
        startYear: z.number().int().min(1900).max(new Date().getFullYear()),
        endYear: z
          .number()
          .int()
          .min(1900)
          .max(new Date().getFullYear())
          .optional(),
      })
    )
    .optional(),
});

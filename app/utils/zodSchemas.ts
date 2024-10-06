import { z } from 'zod';

export const profileSchema = z.object({
  description: z.string().min(1).max(150),
  currentStatus: z.enum(['OpenToWork,Employed,Unemployed']),
  skills: z.array(z.string()).min(1),
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
  experience: z.array(
    z.object({
      company: z.string(),
      position: z.string(),
      startYear: z.number().int().min(1900).max(new Date().getFullYear()),
      endYear: z
        .number()
        .int()
        .min(1900)
        .max(new Date().getFullYear())
        .optional(),
    })
  ),
});

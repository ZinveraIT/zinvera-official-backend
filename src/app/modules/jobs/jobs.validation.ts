import { z } from 'zod'

export const jobValidationSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long'),
  keyFeatured: z
    .array(z.string())
    .min(1, 'At least one key feature is required'),
  experienceNeed: z
    .array(z.string())
    .min(1, 'At least one experience requirement is required'),
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
  companyName: z
    .string()
    .min(2, 'Company name must be at least 2 characters long'),
  location: z.string().min(2, 'Location must be at least 2 characters long'),
  employmentType: z.enum(['Full-time', 'Part-time', 'Internship']),
  salary: z.union([z.string(), z.number()]).optional(),
  Vacancy: z.number().min(1, 'Vacancy must be at least 1'),
  Location: z
    .string()
    .min(2, 'Job location must be at least 2 characters long'),
  isAvailable: z.boolean().optional(),
  submissionDate: z.date(),
})

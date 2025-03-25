import { z } from 'zod'

export const jobValidationSchema = z.object({
  title: z
    .string()
    .min(3, 'Job title must be at least 3 characters long')
    .trim(),
  description: z
    .string()
    .min(10, 'Job description must be at least 10 characters long'),
  category: z
    .string()
    .uuid('Invalid category ID format')
    .min(2, 'Category is required'),
  keyFeatured: z
    .array(z.string())
    .min(1, 'At least one key feature is required'),
  experienceNeed: z
    .array(z.string())
    .min(1, 'At least one experience requirement is required'),
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
  companyName: z
    .string()
    .min(2, 'Company name must be at least 2 characters long')
    .trim(),
  location: z
    .string()
    .min(2, 'Location must be at least 2 characters long')
    .trim(),
  employmentType: z.enum(['Full-time', 'Part-time', 'Internship']),
  salary: z.union([z.string(), z.number()]).optional().default('Negotiable'),
  Vacancy: z.number().min(1, 'Vacancy count must be at least 1'),
  Location: z
    .string()
    .min(2, 'Job location must be at least 2 characters long')
    .trim(),
  status: z.enum(['completed', 'pending']).default('pending'),
  isDeleted: z.boolean().default(false),
  submissionDate: z
    .string()
    .transform((val) => new Date(val))
    .refine((date) => !isNaN(date.getTime()), {
      message: 'Invalid date format',
    }),
})

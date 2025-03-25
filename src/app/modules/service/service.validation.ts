import { z } from 'zod'

export const serviceValidationSchema = z.object({
  image: z.string().optional(), // Icon will be handled separately
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  keyFeatured: z
    .array(z.string())
    .min(1, 'At least one key feature is required'),
  benifits: z.array(z.string()).min(1, 'At least one benefit is required'),
  isDeleted: z.boolean().optional().default(false),
})

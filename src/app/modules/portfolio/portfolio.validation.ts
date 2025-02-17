import { z } from 'zod'

// Define the Zod schema for PortfolioItem
export const PortfolioItemSchema = z.object({
  title: z.string().min(1, 'Title is required'), // Title must be a non-empty string
  description: z.string().min(1, 'Description is required'), // Description must be a non-empty string
  imageUrl: z
    .array(z.string().url())
    .min(1, 'At least one image URL is required'), // Image URLs must be an array of valid URLs
  liveLink: z.string().url('Live link must be a valid URL'), // Live link must be a valid URL
  tags: z.array(z.string()).min(1, 'At least one tag is required'), // Tags must be an array of strings with at least one element
})

// Type inference from the schema
export const PortfolioItemValidation = {
  PortfolioItemSchema,
}

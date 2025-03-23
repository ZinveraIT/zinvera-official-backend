import { z } from 'zod'

// Define the Zod schema for portfolioItem
const PortfolioItemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  vedio: z.string().min(1, 'Video URL is required'),
  description: z.string().min(1, 'Description is required'),
  keyFeatured: z
    .array(z.string())
    .min(1, 'At least one key feature is required'),
  team: z
    .array(
      z.object({
        name: z.string().min(1, 'Team member name is required'),
        image: z.string().min(1, 'Team member image URL is required'),
      })
    )
    .min(1, 'At least one team member is required'),
  techStack: z.array(z.string()).min(1, 'At least one tech stack is required'),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  isDeleted: z.boolean().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

// Type inference from the schema
export const PortfolioItemValidation = {
  PortfolioItemSchema,
}

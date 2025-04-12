import { z } from 'zod'

export const applicationValidationSchema = z.object({
  jobId: z.string().min(1, 'Job ID is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  salaryExpectation: z.string().min(1, 'Salary expectation is required'),
  githubUrl: z.string().url('Invalid GitHub URL'),
  linkedinUrl: z.string().url('Invalid LinkedIn URL'),
  portfolioUrl: z.string().url('Invalid portfolio URL'),
  resumeLink: z.string().url('Invalid resume link'),
  location: z.string().min(1, 'Location is required'),
  yearsOfExperience: z.string().min(1, 'Years of experience is required'),
  problemSolvingExperience: z
    .string()
    .min(1, 'Problem solving experience is required'),
  whyHireYou: z.string().min(1, 'This field is required'),
})

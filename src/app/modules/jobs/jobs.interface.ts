import { Schema } from 'mongoose'

export interface IJob {
  title: string
  category: Schema.Types.ObjectId
  description: string
  keyFeatured: string[]
  experienceNeed: string[]
  skills: string[]
  companyName?: string
  location: string
  employmentType: 'Full-time' | 'Part-time' | 'Internship'
  salary: number | string
  Vacancy: number
  Location: string
  status?: 'pending' | 'completed'
  isDeleted?: boolean
  submissionDate: Date
}

/*
Job Title /Job Position
Job description
Key featured
Last Date (Submission Deadline)
Post date
Skills
Experience
Salary
Job Type ( Remote / On-site / Hybrid)
Employment Type ( Full-time / Part-time / intern )
Vacancy ( Number / not available)
Location

*/

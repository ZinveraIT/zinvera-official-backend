export interface IJob {
  title: string
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
  status?: boolean
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

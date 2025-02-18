export interface IJob {
  title: string
  description: string
  companyName: string
  location: string
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship'
  salary?: string
}

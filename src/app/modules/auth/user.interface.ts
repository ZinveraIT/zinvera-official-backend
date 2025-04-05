interface IUser {
  userName: string
  email: string
  image?: string // Optional field
  password: string
  role?: 'user'
  position?: string
  phone?: string
  location?: string
  jobType?: 'Full-time' | 'Part-time' | 'Internship'
  socialLinks?: string[]
  isBlocked?: boolean
  isDeleted?: boolean
}

export default IUser

export interface IloginUser {
  email: string
  password: string
}

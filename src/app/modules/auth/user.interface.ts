interface IUser {
  userName: string
  email: string
  image?: string // Optional field
  password: string
  role?: 'user'
  Position?: string
  isBlocked?: boolean
  isDeleted?: boolean
}

export default IUser

export interface IloginUser {
  email: string
  password: string
}

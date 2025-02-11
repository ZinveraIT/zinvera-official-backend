interface IUser {
  userName: string
  email: string
  picture?: string // Optional field
  password: string
  role: 'admin' | 'user'
  isBlocked?: boolean
  isDeleted?: boolean
}

export default IUser

export interface IloginUser {
  email: string
  password: string
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import config from '../../config'
import AppError from '../../error/AppError'
import IUser, { IloginUser } from './user.interface'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { user } from './user.model'
import QueryBuilder from '../../builder/builder'
import sendMail from '../../utils/sendMail'

const createUserIntroDB = async (payload: IUser) => {
  const isExist = await user.findOne({ email: payload.email })
  if (isExist) {
    throw new AppError(400, 'Email already exists')
  }
  const result = await user.create(payload)
  return result
}

const loginUserIntroDB = async (payload: IloginUser) => {
  const UserData = await user
    .findOne({ email: payload.email })
    .select('+password')
  if (!UserData) {
    throw new AppError(401, 'Invalid credentials')
  }
  // console.log(UserData)
  const verifyPassword = await bcrypt.compare(
    payload.password,
    UserData.password
  )

  if (!verifyPassword) {
    throw new AppError(401, 'Invalid credentials')
  }

  const VerifiedUser = {
    email: UserData.email,
    role: UserData.role,
    userName: UserData.userName,
    _id: UserData._id,
    image: UserData.image,
    position: UserData.position,
    location: UserData.location,
    phone: UserData.phone,
    socialLinks: UserData.socialLinks,
    isBlocked: UserData.isBlocked,
    isDeleted: UserData.isDeleted,
  }

  const secret = config.JWT_SECRET as string

  const token = jwt.sign(VerifiedUser, secret, { expiresIn: '1h' })

  return { token }
}

const getAllUsersIntroDB = async (queryParams: Record<string, unknown>) => {
  // const result = await user.find()
  // return result
  const query = new QueryBuilder(user.find({ isDeleted: false }), queryParams)
    .search(['userName', 'email'])
    .paginate()

  const result = await query.modelQuery
  return result
}
const blockUsersIntroDB = async (id: string) => {
  const isExist = await user.findById(id)
  if (!isExist) {
    throw new AppError(404, 'User not found')
  }
  if (isExist.isDeleted) {
    throw new AppError(404, 'User already deleted')
  }
  const result = await user.findByIdAndUpdate(id, {
    isBlocked: !isExist.isBlocked,
  })
  return result
}
const deleteUserIntoDB = async (id: string) => {
  const isExist = await user.findById(id)
  if (!isExist) {
    throw new AppError(404, 'User not found')
  }
  if (isExist.isDeleted) {
    throw new AppError(404, 'User already deleted')
  }
  const result = await user.findByIdAndUpdate(id, {
    isDeleted: true,
  })
  return result
}
const updateUserInfoIntoDB = async (
  id: string,
  payload: Pick<
    IUser,
    | 'userName'
    | 'email'
    | 'image'
    | 'role'
    | 'phone'
    | 'position'
    | 'location'
    | 'password'
    | 'socialLinks'
    | 'isBlocked'
    | 'isDeleted'
  >
) => {
  if (payload?.email) {
    throw new Error('Email cannot be updated')
  }
  const isExist = await user.findById(id)
  if (!isExist) {
    throw new AppError(404, 'user not found')
  }
  if (isExist.isDeleted) {
    throw new AppError(404, 'unAuthorized user already deleted')
  }
  const result = await user.findByIdAndUpdate(id, payload, {
    new: true,
    runvalidate: true,
  })
  return result
}

const updatePasswordIntoDB = async (
  id: string,
  payload: { oldPassword: string; newPassword: string }
) => {
  const userData = await user.findById(id).select('+password')
  if (!userData) {
    throw new AppError(404, 'User not found')
  }
  let isMatch = false

  try {
    isMatch = await bcrypt.compare(payload.oldPassword, userData.password)
  } catch (error: any) {
    throw new AppError(500, error.message)
  }
  console.log(isMatch)
  if (!isMatch) {
    throw new AppError(401, 'Invalid credentials')
  }
  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.BCRYPT_SALT)
  )
  const result = await user.findByIdAndUpdate(
    id,
    { password: hashedPassword },
    { new: true }
  )
  return result
}

const tokenValidation = (token: string) => {
  // console.log(token)
  const secret = config.JWT_SECRET as string

  try {
    const decoded = jwt.verify(token, secret)
    return decoded
  } catch (error: any) {
    throw new AppError(401, 'Invalid token')
  }
}
const forgotPassword = async (payload: { email: string }) => {
  const User = await user.findOne({ email: payload.email })

  if (!User) {
    throw new AppError(404, 'User not found')
  }
  if (User.isBlocked) {
    throw new AppError(404, 'User is blocked')
  }
  if (User.isDeleted) {
    throw new AppError(404, 'User is deleted')
  }

  const jwtPayload = {
    email: User.email,
    userName: User.userName,
    _id: User._id,
    role: User.role,
  }

  const token = jwt.sign(jwtPayload, config.JWT_SECRET as string, {
    expiresIn: '1h',
  })

  const resetLink = `http://localhost:3000/resetPassword/?id=${User._id}&token=${token}`

  const html = `
    <div>
      <h2>Password Reset Request</h2>
      <p>Hello ${User.userName},</p>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link will expire in 1 hour.</p>
    </div>
  `

  const text = `Hello ${User.userName},\nReset your password using this link: ${resetLink}\nThis link will expire in 1 hour.`

  await sendMail(
    User.email, // to
    'zinverait@gmail.com', // from (Gmail account)
    'Reset your password - Zinvera IT', // subject                       // plain text version
    html // html body
  )

  return {}
}

const resetPass = async (
  userId: string,
  payload: { password: string; token: string }
) => {
  const userData = await user.findById(userId).select('+password')
  if (!userData) {
    throw new AppError(404, 'User not found')
  }
  if (userData.isBlocked) {
    throw new AppError(404, 'User is blocked')
  }
  if (userData.isDeleted) {
    throw new AppError(404, 'User is deleted')
  }
  const secret = config.JWT_SECRET as string

  try {
    const decoded = jwt.verify(payload.token, secret)
    console.log(decoded)
  } catch (error: any) {
    throw new AppError(401, ' token time out', error)
  }

  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.BCRYPT_SALT)
  )
  const result = await user.findByIdAndUpdate(
    userId,
    { password: hashedPassword },
    { new: true }
  )
  return result
}

const sendEmail = async (payload: any) => {
  const html = `
    <h3>New Contact Message</h3>
    <p><strong>Name:</strong> ${payload.name}</p>
    <p><strong>subject:</strong> ${payload.subject}</p>
    <p><strong>Email:</strong> ${payload.email}</p>
    <p><strong>Message:</strong> ${payload.html}</p>
  `

  await sendMail(
    'zinverait@gmail.com',
    payload.email, // This is the user's email, used in replyTo
    payload.subject,
    html
  )

  return {}
}

export const userServcies = {
  createUserIntroDB,
  loginUserIntroDB,
  blockUsersIntroDB,
  getAllUsersIntroDB,
  deleteUserIntoDB,
  updateUserInfoIntoDB,
  updatePasswordIntoDB,
  tokenValidation,
  forgotPassword,
  resetPass,
  sendEmail,
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import config from '../../config'
import AppError from '../../error/AppError'
import IUser, { IloginUser } from './user.interface'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { user } from './user.model'
import QueryBuilder from '../../builder/builder'

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
    throw new AppError(404, 'User already blocked')
  }
  const result = await user.findByIdAndUpdate(id, {
    isBlocked: true,
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

export const userServcies = {
  createUserIntroDB,
  loginUserIntroDB,
  blockUsersIntroDB,
  getAllUsersIntroDB,
  deleteUserIntoDB,
  updateUserInfoIntoDB,
  updatePasswordIntoDB,
  tokenValidation,
}

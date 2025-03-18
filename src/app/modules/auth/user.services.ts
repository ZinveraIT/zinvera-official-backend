import config from '../../config'
import AppError from '../../error/AppError'
import IUser, { IloginUser } from './user.interface'
import { user } from './user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

const getAllUsersIntroDB = async () => {
  const result = await user.find()
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
const updateUserInfoIntoDB = async (id: string, payload: Partial<IUser>) => {
  const isExist = await user.findById(id)
  if (!isExist) {
    throw new AppError(404, 'user not found')
  }
  if (isExist.isDeleted) {
    throw new AppError(404, 'unAuthorized user already deleted')
  }
  const result = await user.updateOne(
    { _id: id },
    {
      $set: payload,
    }
  )
  return result
}

export const userServcies = {
  createUserIntroDB,
  loginUserIntroDB,
  blockUsersIntroDB,
  getAllUsersIntroDB,
  deleteUserIntoDB,
  updateUserInfoIntoDB,
}

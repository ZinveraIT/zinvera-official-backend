/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import { userServcies } from './user.services'
import sendResponse from '../../utils/sendResponse'
import { uploadToCloudinary } from '../../utils/sendImageCloudinary'

const createUser = catchAsync(async (req: Request, res: Response) => {
  // const payload = req.body
  const data = JSON.parse(req.body.data)
  if (
    req.files &&
    (req.files as { [fieldname: string]: Express.Multer.File[] })['image']
  ) {
    const imagePath = (
      (req.files as { [fieldname: string]: Express.Multer.File[] })[
        'image'
      ][0] as Express.Multer.File
    ).path
    data.image = await uploadToCloudinary(imagePath, 'image')
  }
  const result = await userServcies.createUserIntroDB(data)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: result,
  })
})

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body
  const result = await userServcies.loginUserIntroDB(payload)
  res.cookie('token', result.token, {
    httpOnly: true, // Helps prevent XSS attacks
    secure: true, // Only set cookies over HTTPS in production
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    sameSite: 'none', // Mitigate CSRF attacks
  })
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Login successful',
    data: result,
  })
})
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userServcies.getAllUsersIntroDB(req.query)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User retirived successfully',
    data: result,
  })
})
const validToken = catchAsync(async (req: Request, res: Response) => {
  const token = req.cookies.token
  const result = await userServcies.tokenValidation(token)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'token validation successfully',
    data: result,
  })
})
const blockUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.userId
  const result = await userServcies.blockUsersIntroDB(id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User blocking status update successfully',
    data: result,
  })
})
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.params.userId
  const result = await userServcies.deleteUserIntoDB(payload)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User deleted successfully',
  })
})
const updateuser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.params.userId
  let data
  if (req.body?.data) {
    data = JSON.parse(req.body.data)
  }
  if (
    req.files &&
    (req.files as { [fieldname: string]: Express.Multer.File[] })['image']
  ) {
    const imagePath = (
      (req.files as { [fieldname: string]: Express.Multer.File[] })[
        'image'
      ][0] as Express.Multer.File
    ).path
    data.image = await uploadToCloudinary(imagePath, 'image')
  }
  // console.log(data)
  const result = await userServcies.updateUserInfoIntoDB(payload, data)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User update successfully',
    data: result,
  })
})
const updatePass = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.userId
  const payload = req.body
  const result = await userServcies.updatePasswordIntoDB(id, payload)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'password change  successfully',
    data: result,
  })
})
const logout = catchAsync(async (req: Request, res: Response) => {
  res.cookie('token', '', {
    httpOnly: true, // Helps prevent XSS attacks
    secure: true, // Only set cookies over HTTPS in production
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    sameSite: 'none', // Mitigate CSRF attacks
  })

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'logout  successfully',
  })
})

export const userControlloer = {
  createUser,
  loginUser,
  blockUser,
  getAllUsers,
  deleteUser,
  updateuser,
  updatePass,
  validToken,
  logout,
}

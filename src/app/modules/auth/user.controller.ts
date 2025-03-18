/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import { userServcies } from './user.services'
import sendResponse from '../../utils/sendResponse'
import { cloudinaryImage } from '../../utils/sendImageCloudinary'

const createUser = catchAsync(async (req: Request, res: Response) => {
  // const payload = req.body
  const data = JSON.parse(req.body.data)
  if (req.file) {
    const imageName = 'roton'
    const path = req.file?.path
    const { secure_url } = (await cloudinaryImage(imageName, path)) as {
      secure_url: string
    }
    // console.log('image secure url', secure_url)
    data.picture = secure_url
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
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Login successful',
    data: result,
  })
})
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userServcies.getAllUsersIntroDB()
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User retirived successfully',
    data: result,
  })
})
const blockUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.params.userId
  const result = await userServcies.blockUsersIntroDB(payload)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User blocked successfully',
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
  const data = req?.body
  console.log(data)
  const result = await userServcies.updateUserInfoIntoDB(payload, data)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User deleted successfully',
  })
})

export const userControlloer = {
  createUser,
  loginUser,
  blockUser,
  getAllUsers,
  deleteUser,
  updateuser,
}

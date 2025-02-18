/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { zinveraServices } from './services.services'

const createService = catchAsync(async (req: Request, res: Response) => {
  const serviceData = req.body
  const result = await zinveraServices.createServiceIntroDB(serviceData)
  sendResponse(res, {
    success: true,
    message: 'Service created successfully',
    statusCode: 201,
    data: result,
  })
})
const updateService = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const blogData = req.body
  const result = await zinveraServices.updateServiceIntroDB(id, blogData)
  sendResponse(res, {
    success: true,
    message: 'service updated successfully',
    statusCode: 200,
    data: result,
  })
})
const deleteService = catchAsync(async (req: Request, res: Response) => {
  const extractedToken = req.headers.authorization
  const token = (extractedToken as string).split(' ')[1]
  const id = req.params.id
  const result = await zinveraServices.deleteServiceIntroDB(id)
  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: 200,
  })
})
const getAllService = catchAsync(async (req: Request, res: Response) => {
  const result = await zinveraServices.getAllServiceIntroDB()
  sendResponse(res, {
    success: true,
    message: 'Blogs fetched successfully',
    statusCode: 200,
    data: result,
  })
})

export const servicesControllers = {
  createService,
  updateService,
  deleteService,
  getAllService,
}

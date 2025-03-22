import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { serviceServices } from './serrvice.service'
import { uploadToCloudinary } from '../../utils/sendImageCloudinary'

const createService = catchAsync(async (req: Request, res: Response) => {
  if (!req.body.data) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Missing data field in the request body',
    })
  }
  if (!req.body.image) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'No files uploaded',
    })
  }
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

  const result = await serviceServices.createServiceInDB(data)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Service created successfully',
    data: result,
  })
})

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const result = await serviceServices.getAllServicesFromDB()
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Fetched all services successfully',
    data: result,
  })
})

const getServiceById = catchAsync(async (req: Request, res: Response) => {
  const result = await serviceServices.getServiceByIdFromDB(req.params.id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Fetched service successfully',
    data: result,
  })
})

const updateService = catchAsync(async (req: Request, res: Response) => {
  const result = await serviceServices.updateServiceInDB(
    req.params.id,
    req.body
  )
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Updated service successfully',
    data: result,
  })
})

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const result = await serviceServices.deleteServiceFromDB(req.params.id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Deleted service successfully',
    data: result,
  })
})

export const serviceController = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
}

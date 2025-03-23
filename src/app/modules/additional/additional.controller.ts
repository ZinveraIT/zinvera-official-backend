import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { additionalService } from './addistional.service'

const createAdditional = catchAsync(async (req: Request, res: Response) => {
  const result = await additionalService.createAdditionalInDB(req.body)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Additional item created successfully',
    data: result,
  })
})

const getAllAdditional = catchAsync(async (req: Request, res: Response) => {
  const result = await additionalService.getAllAdditionalFromDB()
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Fetched all additional items successfully',
    data: result,
  })
})

const getAdditionalById = catchAsync(async (req: Request, res: Response) => {
  const result = await additionalService.getAdditionalByIdFromDB(req.params.id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Fetched additional item successfully',
    data: result,
  })
})

const updateAdditional = catchAsync(async (req: Request, res: Response) => {
  const result = await additionalService.updateAdditionalInDB(
    req.params.id,
    req.body
  )
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Updated additional item successfully',
    data: result,
  })
})

const deleteAdditional = catchAsync(async (req: Request, res: Response) => {
  const result = await additionalService.deleteAdditionalFromDB(req.params.id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Deleted additional item successfully',
    data: result,
  })
})

export const additionalController = {
  createAdditional,
  getAllAdditional,
  getAdditionalById,
  updateAdditional,
  deleteAdditional,
}

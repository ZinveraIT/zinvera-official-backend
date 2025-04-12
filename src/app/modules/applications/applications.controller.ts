import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { ApplicationService } from './applications.service'

const createApplication = catchAsync(async (req: Request, res: Response) => {
  const result = await ApplicationService.createApplicationIntoDB(req.body)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Application submitted successfully',
    data: result,
  })
})

const getAllApplications = catchAsync(async (req: Request, res: Response) => {
  const result = await ApplicationService.getAllApplicationsFromDB()
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Applications retrieved successfully',
    data: result,
  })
})

const getSingleApplication = catchAsync(async (req: Request, res: Response) => {
  const result = await ApplicationService.getSingleApplicationFromDB(
    req.params.id
  )
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Application retrieved successfully',
    data: result,
  })
})

const deleteApplication = catchAsync(async (req: Request, res: Response) => {
  const result = await ApplicationService.deleteApplicationFromDB(req.params.id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Application deleted successfully',
    data: result,
  })
})

export const ApplicationController = {
  createApplication,
  getAllApplications,
  getSingleApplication,
  deleteApplication,
}

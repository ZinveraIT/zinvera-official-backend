import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { JobServcies } from './jobs.service'

const createJob = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body
  const result = await JobServcies.createJobIntroDB(payload)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Job created successfully',
    data: result,
  })
})

const deleteJob = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await JobServcies.deleteJobIntoDB(id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Job deleted successfully',
    data: result,
  })
})

const updateJob = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const payload = req.body
  const result = await JobServcies.updateJobIntoDB(id, payload)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Job updated successfully',
    data: result,
  })
})

const getAllJobs = catchAsync(async (req: Request, res: Response) => {
  const result = await JobServcies.getAllJobsIntoDB()
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All jobs retrieved successfully',
    data: result,
  })
})

const getSingleJob = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await JobServcies.getSingleJobIntoDB(id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Single job retrieved successfully',
    data: result,
  })
})

export const JobControlloer = {
  createJob,
  deleteJob,
  updateJob,
  getAllJobs,
  getSingleJob,
}

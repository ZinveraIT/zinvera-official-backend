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
    message: 'Job inserted  successfull',
    data: result,
  })
})
const deleteJOb = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  // console.log(id)
  const result = await JobServcies.deletejobIntoDB(id)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'job deleted  successfull',
    data: result,
  })
})
const updateJob = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const payload = req.body
  const result = await JobServcies.updatejobIntoDB(id, payload)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'job deleted  successfull',
    data: result,
  })
})
const getAllJob = catchAsync(async (req: Request, res: Response) => {
  const result = await JobServcies.getAlljobIntoDB()
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'all job retrivied  successfull',
    data: result,
  })
})
const getSingleJob = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await JobServcies.getSinglejobIntoDB(id)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'single job retrivied  successfull',
    data: result,
  })
})

export const JobControlloer = {
  createJob,
  getAllJob,
  deleteJOb,
  getSingleJob,
  updateJob,
}

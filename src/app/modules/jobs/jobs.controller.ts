import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { portfolioServcies } from './jobs.service'

const createJob = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body
  const result = await portfolioServcies.createPortfolioItemIntroDB(payload)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'portfolio inserted  successfull',
    data: result,
  })
})
const deleteJOb = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  // console.log(id)
  const result = await portfolioServcies.deletePortfolioIntroDB(id)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'portfolio deleted  successfull',
    data: result,
  })
})
const getAllJob = catchAsync(async (req: Request, res: Response) => {
  const result = await portfolioServcies.getAllPortfolioIntroDB()
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'portfolio retrivied  successfull',
    data: result,
  })
})
const getSingleJob = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await portfolioServcies.getSinglePortfolioIntroDB(id)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'All portfolio retrivied  successfull',
    data: result,
  })
})

export const JobControlloer = {
  createJob,
  getAllJob,
  deleteJOb,
  getSingleJob,
}

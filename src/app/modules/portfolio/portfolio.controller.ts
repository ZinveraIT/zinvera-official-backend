import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { portfolioServcies } from './portfolio.service'

const createPortfolioItem = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body
  const result = await portfolioServcies.createPortfolioItemIntroDB(payload)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: result,
  })
})

export const portfolioControlloer = {
  createPortfolioItem,
}

import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { categoryServices } from './categories.service'

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryServices.createCategoryIntoDB(req.body)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'create category successfully',
    data: result,
  })
})

export const categoryController = {
  createCategory,
}

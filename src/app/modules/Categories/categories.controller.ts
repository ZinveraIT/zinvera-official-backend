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

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryServices.getAllCategoriesFromDB()
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Fetched all categories successfully',
    data: result,
  })
})

const getCategoryById = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryServices.getCategoryByIdFromDB(req.params.id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Fetched category successfully',
    data: result,
  })
})

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryServices.updateCategoryInDB(
    req.params.id,
    req.body
  )
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Updated category successfully',
    data: result,
  })
})

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryServices.deleteCategoryFromDB(req.params.id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Deleted category successfully',
    data: result,
  })
})

export const categoryController = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
}

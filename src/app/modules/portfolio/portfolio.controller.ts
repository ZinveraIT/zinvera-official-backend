/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { portfolioServcies } from './portfolio.service'
import { uploadToCloudinary } from '../../utils/sendImageCloudinary'

const createPortfolioItem = catchAsync(async (req: Request, res: Response) => {
  if (!req.body.data) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Missing data field in the request body',
    })
  }
  let data
  try {
    data = JSON.parse(req.body.data)
  } catch (error) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Invalid JSON format in data field',
    })
  }

  if (!req.files) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'No files uploaded',
    })
  }

  // Handle image upload
  if (
    req.files &&
    (req.files as { [fieldname: string]: Express.Multer.File[] })['image']
  ) {
    const imagePath = (
      req.files as { [fieldname: string]: Express.Multer.File[] }
    )['image'][0].path
    data.image = await uploadToCloudinary(imagePath, 'image')
  }

  // Handle video upload
  if (
    req.files &&
    (req.files as { [fieldname: string]: Express.Multer.File[] })['video']
  ) {
    const videoPath = (
      req.files as { [fieldname: string]: Express.Multer.File[] }
    )['video'][0].path
    data.video = await uploadToCloudinary(videoPath, 'video')
  }

  const result = await portfolioServcies.createPortfolioItemIntroDB(data)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Portfolio item created successfully',
    data: result,
  })
})
const deletePortfolioItem = catchAsync(async (req: Request, res: Response) => {
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
const updatePortfolioItem = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const payload = req.body
  // console.log(id)
  const result = await portfolioServcies.updatePortfolioIntroDB(id, payload)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'portfolio update  successfull',
    data: result,
  })
})
const getAllPortfolio = catchAsync(async (req: Request, res: Response) => {
  const result = await portfolioServcies.getAllPortfolioIntroDB()
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'portfolio retrivied  successfull',
    data: result,
  })
})
const getSinglePortfolio = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await portfolioServcies.getSinglePortfolioIntroDB(id)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'All portfolio retrivied  successfull',
    data: result,
  })
})

export const portfolioControlloer = {
  createPortfolioItem,
  getAllPortfolio,
  deletePortfolioItem,
  getSinglePortfolio,
  updatePortfolioItem,
}

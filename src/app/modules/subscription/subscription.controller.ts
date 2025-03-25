import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { subscriptionServices } from './subscription.service'

const requestSubscription = catchAsync(async (req: Request, res: Response) => {
  const result = await subscriptionServices.requsetIntoDBForSubsciption(
    req.body
  )
  console.log('result from controlers', result)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Subscription request submitted successfully',
    data: result,
  })
})

const updateSubscription = catchAsync(async (req: Request, res: Response) => {
  const result = await subscriptionServices.updateSubscription(
    req.params.subscriptionId
  )
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Subscription updated successfully',
    data: result,
  })
})
const getAllSubscriptions = catchAsync(async (req: Request, res: Response) => {
  const result = await subscriptionServices.getAllSubscriptions()
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'get all subscription successfully',
    data: result,
  })
})
const getSingleSubsciption = catchAsync(async (req: Request, res: Response) => {
  const result = await subscriptionServices.getSingleSubsIntoDb(
    req.params.subscriptionId
  )
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Subscription retireived successfully',
    data: result,
  })
})
const deleteSubscription = catchAsync(async (req: Request, res: Response) => {
  const result = await subscriptionServices.deleteSubscription(
    req.params.subscriptionId
  )
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Subscription delete successfully',
    data: result,
  })
})
export const subscriptionControllers = {
  requestSubscription,
  updateSubscription,
  getAllSubscriptions,
  deleteSubscription,
  getSingleSubsciption,
}

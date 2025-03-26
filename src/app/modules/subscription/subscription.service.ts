import AppError from '../../error/AppError'
import { ISubsription } from './subscription.interface'
import { subscriptionModel } from './subscription.model'

const requsetIntoDBForSubsciption = async (payload: ISubsription) => {
  //c57ae384bafe4fe3beb1d9ea35303ec4
  // const Verifier = require('email-verifier')

  const isExist = await subscriptionModel.findOne({ email: payload.email })
  if (isExist) {
    throw new AppError(400, 'Email already exists')
  }
  const result = await subscriptionModel.create(payload)
  console.log(result)
  return result
}

const updateSubscription = async (id: string) => {
  const isExist = await subscriptionModel.findById(id)
  if (!isExist) {
    throw new AppError(404, 'Subscription not found')
  }
  const result = await subscriptionModel.findByIdAndUpdate(
    id,
    {
      subscriptionType: !isExist.subscriptionType,
    },
    {
      new: true,
    }
  )
  return result
}

const getAllSubscriptions = async () => {
  const result = await subscriptionModel.find()
  return result
}
const getSingleSubsIntoDb = async (id: string) => {
  const result = await subscriptionModel.findById(id)
  return result
}
const deleteSubscription = async (id: string) => {
  const result = await subscriptionModel.findByIdAndDelete(id)
  return result
}

export const subscriptionServices = {
  requsetIntoDBForSubsciption,
  updateSubscription,
  getAllSubscriptions,
  deleteSubscription,
  getSingleSubsIntoDb,
}

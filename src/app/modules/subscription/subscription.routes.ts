import { Router } from 'express'
import { subscriptionControllers } from './subscription.controller'
import auth from '../../middleware/auth'

const SubscriptionRouter = Router()

SubscriptionRouter.post('/', subscriptionControllers.requestSubscription)
SubscriptionRouter.patch(
  '/:subscriptionId',
  auth('admin'),
  subscriptionControllers.updateSubscription
)
SubscriptionRouter.get(
  '/:subscriptionId',
  auth('admin'),
  subscriptionControllers.getSingleSubsciption
)
SubscriptionRouter.get(
  '/',
  auth('admin'),
  subscriptionControllers.getAllSubscriptions
)
SubscriptionRouter.delete(
  '/:subscriptionId',
  auth('admin'),
  subscriptionControllers.deleteSubscription
)
export default SubscriptionRouter

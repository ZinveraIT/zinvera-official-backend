import { Router } from 'express'
import { subscriptionControllers } from './subscription.controller'

const SubscriptionRouter = Router()

SubscriptionRouter.post('/', subscriptionControllers.requestSubscription)
SubscriptionRouter.patch(
  '/:subscriptionId',
  subscriptionControllers.updateSubscription
)
SubscriptionRouter.get(
  '/:subscriptionId',
  subscriptionControllers.getSingleSubsciption
)
SubscriptionRouter.get('/', subscriptionControllers.getAllSubscriptions)
SubscriptionRouter.delete(
  '/:subscriptionId',
  subscriptionControllers.deleteSubscription
)
export default SubscriptionRouter

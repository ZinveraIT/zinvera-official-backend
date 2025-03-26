import { Router } from 'express'
import userRouter from '../modules/auth/user.routes'
import portfolioRouter from '../modules/portfolio/portfolio.routes'
import JobRouter from '../modules/jobs/jobs.routes'
import { categoryRouter } from '../modules/Categories/categories.router'
import serviceRouter from '../modules/service/service.routes'
import additionalRouter from '../modules/additional/additional.routes'
import SubscriptionRouter from '../modules/subscription/subscription.routes'

const router = Router()

const routers = [
  {
    path: '/',
    router: userRouter,
  },
  {
    path: '/portfolio',
    router: portfolioRouter,
  },
  {
    path: '/job',
    router: JobRouter,
  },
  {
    path: '/category',
    router: categoryRouter,
  },
  {
    path: '/service',
    router: serviceRouter,
  },
  {
    path: '/additional',
    router: additionalRouter,
  },
  {
    path: '/subscription',
    router: SubscriptionRouter,
  },
]

routers.forEach((route) => router.use(route.path, route.router))

export default router

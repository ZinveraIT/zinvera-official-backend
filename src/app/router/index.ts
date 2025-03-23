import { Router } from 'express'
import userRouter from '../modules/auth/user.routes'
import portfolioRouter from '../modules/portfolio/portfolio.routes'
import JobRouter from '../modules/jobs/jobs.routes'
import { categoryRouter } from '../modules/Categories/categories.router'
import serviceRouter from '../modules/service/service.routes'
import additionalRouter from '../modules/additional/additional.routes'

const router = Router()

const routers = [
  {
    path: '/',
    router: userRouter,
  },
  {
    path: '/',
    router: portfolioRouter,
  },
  {
    path: '/',
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
]

routers.forEach((route) => router.use(route.path, route.router))

export default router

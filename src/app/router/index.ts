import { Router } from 'express'
import userRouter from '../modules/auth/user.routes'
import portfolioRouter from '../modules/portfolio/portfolio.routes'
import JobRouter from '../modules/jobs/jobs.routes'
import { categoryRouter } from '../modules/Categories/categories.router'

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
]

routers.forEach((route) => router.use(route.path, route.router))

export default router

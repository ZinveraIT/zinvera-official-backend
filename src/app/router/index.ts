import { Router } from 'express'
import userRouter from '../modules/Admin/auth/user.routes'
import portfolioRouter from '../modules/portfolio/portfolio.routes'
import serviceRouter from '../modules/services/services.routes'

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
    router: serviceRouter,
  },
]

routers.forEach((route) => router.use(route.path, route.router))

export default router

import { Router } from 'express'
import userRouter from '../modules/auth/user.routes'
import portfolioRouter from '../modules/portfolio/portfolio.routes'

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
]

routers.forEach((route) => router.use(route.path, route.router))

export default router

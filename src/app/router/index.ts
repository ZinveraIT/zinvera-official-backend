import { Router } from 'express'
import userRouter from '../modules/auth/user.routes'
import blogRouter from '../modules/services/blog.routes'

const router = Router()

const routers = [
  {
    path: '/blogs',
    router: blogRouter,
  },
  {
    path: '/',
    router: userRouter,
  },
]

routers.forEach((route) => router.use(route.path, route.router))

export default router

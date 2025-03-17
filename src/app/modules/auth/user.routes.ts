import { Router } from 'express'
import { userControlloer } from './user.controller'
import zodValidator from '../../middleware/validator'
import { authValidation } from './user.validation'
import auth from '../../middleware/auth'
import upload from '../../utils/sendImageCloudinary'

const userRouter = Router()

userRouter.post(
  '/auth/register',
  // zodValidator(authValidation.userValidationSchema),
  upload.single('file'),
  userControlloer.createUser
)
userRouter.post(
  '/auth/login',
  zodValidator(authValidation.loginUserVaidation),
  userControlloer.loginUser
)
userRouter.get('/admin/users', auth('admin'), userControlloer.getAllUsers)
userRouter.delete(
  '/admin/users/:userId',
  auth('admin'),
  userControlloer.deleteUser
)
userRouter.patch(
  '/admin/users/:userId',
  auth('admin'),
  userControlloer.blockUser
)
userRouter.patch('/user/:userId', auth('user'), userControlloer.blockUser)

// /api/admin/users/:userId/block

export default userRouter

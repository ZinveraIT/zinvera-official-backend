import { Router } from 'express'
import { userControlloer } from './user.controller'
import zodValidator from '../../middleware/validator'
import { authValidation } from './user.validation'
import auth from '../../middleware/auth'

import multer from 'multer'
const upload = multer({ dest: 'uploads/' })

const userRouter = Router()

userRouter.post(
  '/auth/register',
  zodValidator(authValidation.userValidationSchema),
  upload.single('picture'),
  userControlloer.createUser
)
userRouter.post(
  '/auth/login',
  zodValidator(authValidation.loginUserVaidation),
  userControlloer.loginUser
)
userRouter.patch(
  '/admin/users/:userId',
  auth('admin'),
  userControlloer.blockUser
)

// /api/admin/users/:userId/block

export default userRouter

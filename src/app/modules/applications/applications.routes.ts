import { Router } from 'express'
import { ApplicationController } from './applications.controller'
import zodValidator from '../../middleware/validator'
import { applicationValidationSchema } from './applications.validation'
import auth from '../../middleware/auth'

const applicationRouter = Router()

applicationRouter.post(
  '/',
  zodValidator(applicationValidationSchema),
  ApplicationController.createApplication
)

applicationRouter.get(
  '/',
  auth('admin'),
  ApplicationController.getAllApplications
)

applicationRouter.get(
  '/:id',
  auth('admin'),
  ApplicationController.getSingleApplication
)

applicationRouter.delete(
  '/:id',
  auth('admin'),
  ApplicationController.deleteApplication
)

export default applicationRouter

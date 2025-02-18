import { Router } from 'express'
import { servicesControllers } from './services.controller'
import { BlogValidation } from './services.validation'
import zodValidator from '../../middleware/validator'
import auth from '../../middleware/auth'

const serviceRouter = Router()
serviceRouter.patch(
  '/:id',
  auth('admin'),
  zodValidator(BlogValidation.blogUpdateValidation),
  servicesControllers.updateService
)
serviceRouter.delete('/:id', auth('admin'), servicesControllers.deleteService)

serviceRouter.post(
  '/',
  auth('admin'),
  zodValidator(BlogValidation.blogCreateValidation),
  servicesControllers.createService
)

serviceRouter.get('/', servicesControllers.getAllService)

export default serviceRouter
///api/blogs/:id

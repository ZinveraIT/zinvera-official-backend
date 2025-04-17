import { Router } from 'express'
import { serviceController } from './service.controller'
// import zodValidator from '../../middleware/validator'
// import { serviceValidationSchema } from './service.validation'
import { upload } from '../../utils/sendImageCloudinary'
import auth from '../../middleware/auth'

const serviceRouter = Router()

serviceRouter.post(
  '/',
  upload,
  // zodValidator(serviceValidationSchema),
  auth('admin'),
  serviceController.createService
)
serviceRouter.get('/', serviceController.getAllServices)
serviceRouter.get('/:id', serviceController.getServiceById)
serviceRouter.put(
  '/:id',
  auth('admin'),
  upload,
  serviceController.updateService
)
serviceRouter.delete('/:id', auth('admin'), serviceController.deleteService)
serviceRouter.patch('/:id', auth('admin'), serviceController.updateStatus)

export default serviceRouter

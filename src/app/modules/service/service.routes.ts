import { Router } from 'express'
import { serviceController } from './service.controller'
// import zodValidator from '../../middleware/validator'
// import { serviceValidationSchema } from './service.validation'
import { upload } from '../../utils/sendImageCloudinary'

const serviceRouter = Router()

serviceRouter.post(
  '/',
  upload,
  // zodValidator(serviceValidationSchema),
  serviceController.createService
)
serviceRouter.get('/', serviceController.getAllServices)
serviceRouter.get('/:id', serviceController.getServiceById)
serviceRouter.put('/:id', upload, serviceController.updateService)
serviceRouter.delete('/:id', serviceController.deleteService)

export default serviceRouter

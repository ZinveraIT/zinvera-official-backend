import { Router } from 'express'
import { additionalController } from './additional.controller'

const additionalRouter = Router()

additionalRouter.post('/', additionalController.createAdditional)
additionalRouter.get('/', additionalController.getAllAdditional)
additionalRouter.get('/:id', additionalController.getAdditionalById)
additionalRouter.put('/:id', additionalController.updateAdditional)
additionalRouter.delete('/:id', additionalController.deleteAdditional)

export default additionalRouter

import { Router } from 'express'
import { additionalController } from './additional.controller'
import auth from '../../middleware/auth'

const additionalRouter = Router()

additionalRouter.post('/', auth('admin'), additionalController.createAdditional)
additionalRouter.get('/', additionalController.getAllAdditional)
additionalRouter.get('/:id', additionalController.getAdditionalById)
additionalRouter.put(
  '/:id',
  auth('admin'),
  additionalController.updateAdditional
)
additionalRouter.delete(
  '/:id',
  auth('admin'),
  additionalController.deleteAdditional
)

export default additionalRouter

import { Router } from 'express'
import { categoryController } from './categories.controller'
// import zodValidator from '../../middleware/validator'

const categoryRoutes = Router()

categoryRoutes.post(
  '/create-category',categoryController.createCategory
)

// /api/admin/users/:userId/block

export default categoryRoutes

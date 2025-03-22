import { Router } from 'express'
import { categoryController } from './categories.controller'

const router = Router()

router.post('/', categoryController.createCategory)
router.get('/', categoryController.getAllCategories)
router.get('/:id', categoryController.getCategoryById)
router.put('/:id', categoryController.updateCategory)
router.delete('/:id', categoryController.deleteCategory)

export const categoryRouter = router

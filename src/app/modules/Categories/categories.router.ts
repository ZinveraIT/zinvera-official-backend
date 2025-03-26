import { Router } from 'express'
import { categoryController } from './categories.controller'
import auth from '../../middleware/auth'

const router = Router()

router.post('/', auth('admin'), categoryController.createCategory)
router.get('/', categoryController.getAllCategories)
router.get('/:id', categoryController.getCategoryById)
router.put('/:id', auth('admin'), categoryController.updateCategory)
router.delete('/:id', auth('admin'), categoryController.deleteCategory)

export const categoryRouter = router

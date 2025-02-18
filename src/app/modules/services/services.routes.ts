import { Router } from 'express'
import { blogControllers } from './services.controller'
import { BlogValidation } from './services.validation'
import zodValidator from '../../middleware/validator'

const serviceRouter = Router()

serviceRouter.post(
  '/',
  zodValidator(BlogValidation.blogCreateValidation),
  blogControllers.createBlog
)

serviceRouter.get('/', blogControllers.getAllBlog)

export default serviceRouter
///api/blogs/:id

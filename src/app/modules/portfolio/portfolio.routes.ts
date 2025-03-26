import { Router } from 'express'
// import zodValidator from '../../middleware/validator'
import { portfolioControlloer } from './portfolio.controller'
import { upload } from '../../utils/sendImageCloudinary'
import auth from '../../middleware/auth'
// import { PortfolioItemValidation } from './portfolio.validation'

const portfolioRouter = Router()

portfolioRouter.post(
  '/',
  // zodValidator(PortfolioItemValidation.PortfolioItemSchema),
  upload,
  auth('admin'),
  portfolioControlloer.createPortfolioItem
)
portfolioRouter.delete(
  '/:id',
  auth('admin'),
  portfolioControlloer.deletePortfolioItem
)
portfolioRouter.patch(
  '/:id',
  upload,
  auth('admin'),
  portfolioControlloer.updatePortfolioItem
)
portfolioRouter.get('/:id', portfolioControlloer.getSinglePortfolio)
portfolioRouter.get('/', portfolioControlloer.getAllPortfolio)

// /api/admin/users/:userId/block

export default portfolioRouter

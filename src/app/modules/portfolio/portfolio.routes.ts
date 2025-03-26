import { Router } from 'express'
// import zodValidator from '../../middleware/validator'
import { portfolioControlloer } from './portfolio.controller'
import { upload } from '../../utils/sendImageCloudinary'
import auth from '../../middleware/auth'
// import { PortfolioItemValidation } from './portfolio.validation'

const portfolioRouter = Router()

portfolioRouter.post(
  '/create-portfolio',
  // zodValidator(PortfolioItemValidation.PortfolioItemSchema),
  upload,
  auth('admin'),
  portfolioControlloer.createPortfolioItem
)
portfolioRouter.delete(
  '/delete-portfolio/:id',
  auth('admin'),
  portfolioControlloer.deletePortfolioItem
)
portfolioRouter.patch(
  '/update-portfolio/:id',
  upload,
  auth('admin'),
  portfolioControlloer.updatePortfolioItem
)
portfolioRouter.get(
  '/get-portfolio/:id',
  portfolioControlloer.getSinglePortfolio
)
portfolioRouter.get('/get-portfolio', portfolioControlloer.getAllPortfolio)

// /api/admin/users/:userId/block

export default portfolioRouter

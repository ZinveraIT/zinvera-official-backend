import { Router } from 'express'
// import zodValidator from '../../middleware/validator'
import { portfolioControlloer } from './portfolio.controller'
import { upload } from '../../utils/sendImageCloudinary'
// import { PortfolioItemValidation } from './portfolio.validation'

const portfolioRouter = Router()

portfolioRouter.post(
  '/create-portfolio',
  // zodValidator(PortfolioItemValidation.PortfolioItemSchema),
  upload,
  portfolioControlloer.createPortfolioItem
)
portfolioRouter.delete(
  '/delete-portfolio/:id',
  portfolioControlloer.deletePortfolioItem
)
portfolioRouter.patch(
  '/update-portfolio/:id',
  portfolioControlloer.updatePortfolioItem
)
portfolioRouter.get(
  '/get-portfolio/:id',
  portfolioControlloer.getSinglePortfolio
)
portfolioRouter.get('/get-portfolio', portfolioControlloer.getAllPortfolio)

// /api/admin/users/:userId/block

export default portfolioRouter

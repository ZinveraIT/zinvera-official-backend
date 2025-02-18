import { Router } from 'express'
import zodValidator from '../../middleware/validator'
import { portfolioControlloer } from './portfolio.controller'
import { PortfolioItemValidation } from './portfolio.validation'

const portfolioRouter = Router()

portfolioRouter.post(
  '/create-portfolio',
  zodValidator(PortfolioItemValidation.PortfolioItemSchema),
  portfolioControlloer.createPortfolioItem
)
portfolioRouter.delete(
  '/delete-portfolio/:id',
  portfolioControlloer.deletePortfolioItem
)
portfolioRouter.get(
  '/get-portfolio/:id',
  portfolioControlloer.getAllSinglePortfolio
)
portfolioRouter.get('/get-portfolio', portfolioControlloer.getAllPortfolio)

// /api/admin/users/:userId/block

export default portfolioRouter

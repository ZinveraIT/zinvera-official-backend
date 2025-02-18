import { Router } from 'express'
import zodValidator from '../../middleware/validator'
import { portfolioControlloer } from './jobs.controller'
import { PortfolioItemValidation } from './jobs.validation'

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
  portfolioControlloer.getSinglePortfolio
)
portfolioRouter.get('/get-portfolio', portfolioControlloer.getAllPortfolio)

// /api/admin/users/:userId/block

export default portfolioRouter

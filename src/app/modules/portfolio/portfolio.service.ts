import { IPortfolio } from './portfolio.interface'
import PortfolioItemModel from './portfolio.model'

const createPortfolioItemIntroDB = async (payload: IPortfolio) => {
  const result = await PortfolioItemModel.create(payload)
  return result
}
const getAllPortfolioIntroDB = async () => {
  const result = await PortfolioItemModel.find()
  return result
}

export const portfolioServcies = {
  createPortfolioItemIntroDB,
  getAllPortfolioIntroDB,
}

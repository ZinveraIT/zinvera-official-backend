import { IPortfolio } from './portfolio.interface'
import PortfolioItem from './portfolio.model'

const createPortfolioItemIntroDB = async (payload: IPortfolio) => {
  const result = await PortfolioItem.create(payload)
  return result
}
const deletePortfolioIntroDB = async (id: string) => {
  console.log(id)
  const result = await PortfolioItem.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    { new: true }
  )
  return result
}
const getAllPortfolioIntroDB = async () => {
  const result = await PortfolioItem.find({ isDeleted: false })
  return result
}

export const portfolioServcies = {
  createPortfolioItemIntroDB,
  getAllPortfolioIntroDB,
  deletePortfolioIntroDB,
}

import { IPortfolio } from './jobs.interface'
import PortfolioItem from './jobs.model'

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
const getSinglePortfolioIntroDB = async (id: string) => {
  const result = await PortfolioItem.findById(id)
  if (result?.isDeleted) {
    throw new Error('Portfolio not found')
  }
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
  getSinglePortfolioIntroDB,
}

import mongoose, { Schema } from 'mongoose'
import { IPortfolio, ITeam } from './portfolio.interface'

const portfolioItemSchema = new Schema<IPortfolio>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    liveLink: { type: String, required: true },
    tags: { type: [String], required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
) // timestamps will automatically add createdAt and updatedAt fields

// Create and export the model based on the schema
const PortfolioItem = mongoose.model<IPortfolio>(
  'PortfolioItem',
  portfolioItemSchema
)

export default PortfolioItem

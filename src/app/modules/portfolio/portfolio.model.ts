import mongoose, { Schema } from 'mongoose'
import { IPortfolio } from './portfolio.interface'

const portfolioItemSchema = new Schema<IPortfolio>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: [String], required: true },
    liveLink: { type: String, required: true },
    tags: { type: [String], required: true },
  },
  { timestamps: true }
) // timestamps will automatically add createdAt and updatedAt fields

// Create and export the model based on the schema
const PortfolioItemModel = mongoose.model<IPortfolio>(
  'PortfolioItem',
  portfolioItemSchema
)

export default PortfolioItemModel

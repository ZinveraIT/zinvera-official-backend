import mongoose, { Schema } from 'mongoose'
import { IPortfolio } from './portfolio.interface'

const portfolioItemSchema = new Schema<IPortfolio>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    video: { type: String, required: true },
    keyFeatured: { type: [String], required: true },
    team: { type: [mongoose.Types.ObjectId], ref: 'user' },
    techStack: { type: [String], required: true }, // Array of tech stacks
    tags: { type: [String], required: true },
    category: { type: Schema.Types.ObjectId, ref: 'category', required: true },
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

/*
Project Name
Project Image
Project vedio
Project Team ( Add new team members dynamically)
Name
Image
Project Description
Project key featured - array
tech Stack - array 
Hash Tag - array 

*/

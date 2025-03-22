import mongoose, { Schema } from 'mongoose'
import { TCategory } from './categories.interface'

const categorySchema = new Schema<TCategory>(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
) // timestamps will automatically add createdAt and updatedAt fields

// Create and export the model based on the schema
const category = mongoose.model<TCategory>('category', categorySchema)

export default category

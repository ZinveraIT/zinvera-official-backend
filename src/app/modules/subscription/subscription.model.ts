import mongoose, { Schema } from 'mongoose'
import { ISubsription } from './subscription.interface'

const subscriptionSchema = new Schema<ISubsription>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  subscriptionType: {
    type: Boolean,
    default: false,
  },
})

export const subscriptionModel = mongoose.model(
  'subscriptionModel',
  subscriptionSchema
)

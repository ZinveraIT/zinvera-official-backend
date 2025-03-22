import mongoose, { Schema } from 'mongoose'
import { IService } from './service.interface'

const serviceschema = new Schema<IService>(
  {
    image: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    keyFeatured: {
      type: [String],
      required: true,
    },
    benifits: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const service = mongoose.model<IService>('service', serviceschema)

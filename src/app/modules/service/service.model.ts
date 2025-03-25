import mongoose, { Schema } from 'mongoose'
import { IService } from './service.interface'

const serviceschema = new Schema<IService>(
  {
    image: {
      type: String,
    },
    title: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'category',
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const service = mongoose.model<IService>('service', serviceschema)

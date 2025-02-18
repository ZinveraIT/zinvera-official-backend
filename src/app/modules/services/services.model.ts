import { model, Schema } from 'mongoose'
import IService from './services.interface'

const serviceSchema = new Schema<IService>(
  {
    title: {
      type: String,
      required: [true, 'blog title is required '],
      trim: true,
    },
    shortDescription: {
      type: String,
      required: [true, 'blog content is required'],
      trim: true,
    },
    keyFeatured: { type: [String] },
    longDescription: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const service = model<IService>('service', serviceSchema)

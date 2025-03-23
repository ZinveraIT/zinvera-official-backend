import mongoose, { Schema } from 'mongoose'
import { IAdditional } from './additional.interface'

const additionalSchema = new Schema<IAdditional>({
  video: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
  },
})

export const additionalModel = mongoose.model<IAdditional>(
  'additionalModel',
  additionalSchema
)

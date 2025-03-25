import { Schema } from 'mongoose'

export interface IService {
  image: string
  title: Schema.Types.ObjectId
  description: string
  keyFeatured: string[]
  benifits: string[]
  isDeleted?: boolean
}

import { TCategory } from './categories.interface'
import categoryModel from './categories.model'

const createCategoryIntoDB = async (payload: TCategory) => {
  const isExist = await categoryModel.findOne({ name: payload.name })
  if (isExist) {
    throw new Error('Category already exists')
  }
  const result = await categoryModel.create(payload)
  return result
}

export const categoryServices = {
  createCategoryIntoDB,
}

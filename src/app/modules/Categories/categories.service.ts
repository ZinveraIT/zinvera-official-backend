import { TCategory } from './categories.interface'
import category from './categories.model'

const createCategoryIntoDB = async (payload: TCategory) => {
  const isExist = await category.findOne({ name: payload.name })
  if (isExist) {
    throw new Error('Category already exists')
  }
  const result = await category.create(payload)
  return result
}

const getAllCategoriesFromDB = async () => {
  const result = await category.find()
  return result
}

const getCategoryByIdFromDB = async (id: string) => {
  const result = await category.findById(id)
  if (!result) {
    throw new Error('Category not found')
  }
  return result
}

const updateCategoryInDB = async (
  id: string,
  updateData: Partial<TCategory>
) => {
  const result = await category.findByIdAndUpdate(id, updateData, { new: true })
  if (!result) {
    throw new Error('Category not found or update failed')
  }
  return result
}

const deleteCategoryFromDB = async (id: string) => {
  const result = await category.findByIdAndDelete(id)
  if (!result) {
    throw new Error('Category not found or delete failed')
  }
  return result
}

export const categoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
  getCategoryByIdFromDB,
  updateCategoryInDB,
  deleteCategoryFromDB,
}

import { IAdditional } from './additional.interface'
import { additionalModel } from './additional.model'

const createAdditionalInDB = async (payload: IAdditional) => {
  const result = await additionalModel.create(payload)
  return result
}

const getAllAdditionalFromDB = async () => {
  const result = await additionalModel.find()
  return result
}

const getAdditionalByIdFromDB = async (id: string) => {
  const result = await additionalModel.findById(id)
  if (!result) {
    throw new Error('Additional item not found')
  }
  return result
}

const updateAdditionalInDB = async (
  id: string,
  updateData: Partial<IAdditional>
) => {
  const result = await additionalModel.findByIdAndUpdate(id, updateData, {
    new: true,
  })
  if (!result) {
    throw new Error('Additional item not found or update failed')
  }
  return result
}

const deleteAdditionalFromDB = async (id: string) => {
  const result = await additionalModel.findByIdAndDelete(id)
  if (!result) {
    throw new Error('Additional item not found or delete failed')
  }
  return result
}

export const additionalService = {
  createAdditionalInDB,
  getAllAdditionalFromDB,
  getAdditionalByIdFromDB,
  updateAdditionalInDB,
  deleteAdditionalFromDB,
}

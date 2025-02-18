import IService from './services.interface'
import IBlog from './services.interface'
import { service } from './services.model'

const createServiceIntroDB = async (payload: IService) => {
  const result = await service.create(payload)
  return result
}
const updateServiceIntroDB = async (id: string, payload: Partial<IBlog>) => {
  const result = await service
    .findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    })
    .populate('author')
  return result
}
const deleteServiceIntroDB = async (id: string) => {
  const result = await service.findByIdAndDelete(id)
  return result
}
const getAllServiceIntroDB = async () => {
  const result = await service.find()
  return result
}

export const zinveraServices = {
  createServiceIntroDB,
  updateServiceIntroDB,
  deleteServiceIntroDB,
  getAllServiceIntroDB,
}

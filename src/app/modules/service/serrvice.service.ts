import { IService } from './service.interface'
import { service } from './service.model'

const createServiceInDB = async (payload: IService) => {
  const isExist = await service.findOne({ title: payload?.title })
  if (isExist) {
    throw new Error('Service already exists')
  }
  const result = await service.create(payload)
  return result
}

const getAllServicesFromDB = async () => {
  const result = await service.find().populate('title')
  return result
}

const getServiceByIdFromDB = async (id: string) => {
  const result = await service.findById(id).populate('title')
  if (!result) {
    throw new Error('Service not found')
  }
  return result
}

const updateServiceInDB = async (id: string, updateData: Partial<IService>) => {
  const result = await service.findByIdAndUpdate(id, updateData, { new: true })
  if (!result) {
    throw new Error('Service not found or update failed')
  }
  return result
}

const deleteServiceFromDB = async (id: string) => {
  const data = await service.findById(id)
  if (!data) {
    throw new Error('Service not found or delete failed')
  }
  const result = await service.findByIdAndUpdate(id, {
    isDeleted: !data.isDeleted,
  })
  return result
}

const updateStatusFromDB = async (id: string) => {
  const data = await service.findById(id)
  if (!data) {
    throw new Error('Service not found or update failed')
  }
  const result = await service.findByIdAndUpdate(id, {
    isActive: !data.isActive,
  })
  return result
}

export const serviceServices = {
  createServiceInDB,
  getAllServicesFromDB,
  getServiceByIdFromDB,
  updateServiceInDB,
  deleteServiceFromDB,
  updateStatusFromDB,
}

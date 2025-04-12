import { IApplication } from './applications.interface'
import { ApplicationModel } from './applications.model'

const createApplicationIntoDB = async (payload: IApplication) => {
  const result = await ApplicationModel.create(payload)
  return result
}

const getAllApplicationsFromDB = async () => {
  const result = await ApplicationModel.find()
  return result
}

const getSingleApplicationFromDB = async (id: string) => {
  const result = await ApplicationModel.findById(id)
  if (!result) {
    throw new Error('Application not found')
  }
  return result
}

const deleteApplicationFromDB = async (id: string) => {
  const result = await ApplicationModel.findByIdAndDelete(id)
  if (!result) {
    throw new Error('Application not found')
  }
  return result
}

export const ApplicationService = {
  createApplicationIntoDB,
  getAllApplicationsFromDB,
  getSingleApplicationFromDB,
  deleteApplicationFromDB,
}

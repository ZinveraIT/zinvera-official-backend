import category from '../Categories/categories.model'
import { IJob } from './jobs.interface'
import JobModel from './jobs.model'

const createJobIntroDB = async (payload: IJob) => {
  const isExist = await category.findById(payload.category)
  if (!isExist) {
    throw new Error('Category not found')
  }
  const result = await JobModel.create(payload)
  return result
}

const deleteJobIntoDB = async (id: string) => {
  const result = await JobModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  )
  return result
}

const updateJobIntoDB = async (id: string, updateData: Partial<IJob>) => {
  const isExist = await JobModel.findById(id)
  if (isExist?.isDeleted) {
    throw new Error('Job not found')
  }
  const result = await JobModel.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  )
  return result
}

const getSingleJobIntoDB = async (id: string) => {
  const result = await JobModel.findById(id).populate('category')
  if (result?.isDeleted) {
    throw new Error('Job not found')
  }
  return result
}

const getAllJobsIntoDB = async () => {
  const result = await JobModel.find({ isDeleted: false }).populate('category')
  return result
}

export const JobServcies = {
  createJobIntroDB,
  deleteJobIntoDB,
  updateJobIntoDB,
  getSingleJobIntoDB,
  getAllJobsIntoDB,
}

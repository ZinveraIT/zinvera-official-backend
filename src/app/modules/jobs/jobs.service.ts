import { IJob } from './jobs.interface'
import JobModel from './jobs.model'

const createJobIntroDB = async (payload: IJob) => {
  const result = await JobModel.create(payload)
  return result
}
const deletejobIntoDB = async (id: string) => {
  const result = await JobModel.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    { new: true }
  )
  return result
}
const updatejobIntoDB = async (id: string, updateData: Partial<IJob>) => {
  const result = await JobModel.findByIdAndUpdate(
    id,
    { $set: updateData }, // শুধু নির্দিষ্ট ফিল্ড আপডেট করবে
    { new: true, runValidators: true } // নতুন ডাটা রিটার্ন করবে এবং ভ্যালিডেশন চেক করবে
  )

  return result
}
const getSinglejobIntoDB = async (id: string) => {
  const result = await JobModel.findById(id)
  if (result?.isDeleted) {
    throw new Error('Portfolio not found')
  }
  return result
}
const getAlljobIntoDB = async () => {
  const result = await JobModel.find({ isDeleted: false })
  return result
}

export const JobServcies = {
  createJobIntroDB,
  getAlljobIntoDB,
  deletejobIntoDB,
  getSinglejobIntoDB,
  updatejobIntoDB,
}

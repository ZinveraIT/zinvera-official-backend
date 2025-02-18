import mongoose, { Schema } from 'mongoose'
import { IJob } from './jobs.interface'

const jobSchema = new Schema<IJob>(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
    },
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    employmentType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
      required: [true, 'Employment type is required'],
    },
    salary: {
      type: String,
      default: 'Negotiable',
    },
  },
  { timestamps: true, versionKey: false }
) // timestamps will automatically add createdAt and updatedAt fields

// Create and export the model based on the schema
const JobModel = mongoose.model<IJob>('JobModel', jobSchema)

export default JobModel

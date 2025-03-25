import mongoose, { Schema } from 'mongoose'
import { IJob } from './jobs.interface'

const jobSchema = new Schema<IJob>(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'category',
      required: [true, 'Category is required'],
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
    },
    keyFeatured: {
      type: [String],
      required: [true, 'Key features are required'],
    },
    experienceNeed: {
      type: [String],
      required: [true, 'Experience requirements are required'],
    },
    skills: {
      type: [String],
      required: [true, 'Skills are required'],
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
      enum: ['Full-time', 'Part-time', 'Internship'],
      required: [true, 'Employment type is required'],
    },
    salary: {
      type: Schema.Types.Mixed, // Supports both number and string
      default: 'Negotiable',
    },
    Vacancy: {
      type: Number,
      required: [true, 'Vacancy count is required'],
    },
    Location: {
      type: String,
      required: [true, 'Job location is required'],
    },
    status: {
      type: String,
      enum: {
        values: ['completed', 'pending'],
      },
      default: 'pending',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    submissionDate: {
      type: Date,
      required: [true, 'Submission deadline is required'],
    },
  },
  { timestamps: true, versionKey: false }
)

const JobModel = mongoose.model<IJob>('JobModel', jobSchema)

export default JobModel

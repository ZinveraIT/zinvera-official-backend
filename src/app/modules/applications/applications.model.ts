import mongoose, { Schema } from 'mongoose'
import { IApplication } from './applications.interface'

const applicationSchema = new Schema<IApplication>(
  {
    jobId: {
      type: String,
      required: [true, 'Job ID is required'],
    },
    jobTitle: {
      type: String,
      required: [true, 'Job title is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    salaryExpectation: {
      type: String,
      required: [true, 'Salary expectation is required'],
    },
    githubUrl: {
      type: String,
      required: [true, 'GitHub URL is required'],
    },
    linkedinUrl: {
      type: String,
      required: [true, 'LinkedIn URL is required'],
    },
    portfolioUrl: {
      type: String,
      required: [true, 'Portfolio URL is required'],
    },
    resumeLink: {
      type: String,
      required: [true, 'Resume link is required'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    yearsOfExperience: {
      type: String,
      required: [true, 'Years of experience is required'],
    },
    problemSolvingExperience: {
      type: String,
      required: [true, 'Problem solving experience is required'],
    },
    whyHireYou: {
      type: String,
      required: [true, 'This field is required'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const ApplicationModel = mongoose.model<IApplication>(
  'Application',
  applicationSchema
)

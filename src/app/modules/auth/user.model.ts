import { model, Schema } from 'mongoose'
import IUser from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const userSchema = new Schema<IUser>(
  {
    userName: {
      type: String,
      required: [true, 'UserName is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    image: {
      type: String,
      default: '', // Default empty string if no picture is provided
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false, // Hide password from query results
    },
    role: {
      type: String,
      default: 'user',
    },
    position: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Internship'],
    },
    socialLinks: {
      type: [String],
      default: [], // Default to an empty array if no social links are provided
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next() // Hash only if password is modified
  const salt_round = Number(config.BCRYPT_SALT)
  this.password = await bcrypt.hash(this.password, salt_round)
  next()
})

// Ensure password is not sent in response
userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

export const user = model<IUser>('user', userSchema)

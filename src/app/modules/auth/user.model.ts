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
    Position: { type: String, default: '' },
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

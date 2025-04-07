import { z } from 'zod'

const userValidationSchema = z.object({
  data: z.object({
    userName: z.string({
      required_error: 'UserName is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email address'),
    password: z.string({
      required_error: 'Password is required',
    }),
    role: z.string().default('user'),
    position: z.string().optional(), // Optional field
    isBlocked: z.boolean().default(false),
    isDeleted: z.boolean().default(false),
  }),
})

const loginUserVaidation = z.object({
  email: z.string({
    required_error: 'Email is required',
  }),
  password: z.string({
    required_error: 'Password is required',
  }),
})

const forgotPasswordValidation = z.object({
  email: z
    .string({ invalid_type_error: 'email is required ' })
    .email('Invalid email address'),
})
const resetPasswordValidation = z.object({
  password: z.string({ invalid_type_error: 'password is required' }),
  token: z.string({ invalid_type_error: 'token is required' }),
})

export const authValidation = {
  userValidationSchema,
  loginUserVaidation,
  resetPasswordValidation,
  forgotPasswordValidation,
}

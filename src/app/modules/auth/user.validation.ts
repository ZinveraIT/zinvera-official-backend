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

// to: string,
//   from: string,
//   subject: string,
//   text: string,
//   html: string
const emailSendingValidation = z.object({
  email: z.string({ invalid_type_error: 'email address is required' }),
  subject: z.string({ invalid_type_error: 'subject line is required' }),
  html: z.string({ invalid_type_error: 'html line is required' }),
  name: z.string({ invalid_type_error: 'name line is required' }),
})

export const authValidation = {
  userValidationSchema,
  loginUserVaidation,
  resetPasswordValidation,
  forgotPasswordValidation,
  emailSendingValidation,
}

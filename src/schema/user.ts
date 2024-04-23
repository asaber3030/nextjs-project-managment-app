import { usernameRegEx } from '@/lib/regex'
import { z } from 'zod'

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  username: z.string().min(1, { message: 'Username is required' }).regex(usernameRegEx, { message: 'Invalid username type only characters and numbers' }).toLowerCase(),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  jobTitle: z.string().min(3, { message: 'Job title must be at least 3 characters' }),
  email: z.string().email(),
})
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: 'Password is required!' }),
})
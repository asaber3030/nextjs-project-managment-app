import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/lib/constants'
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
export const UserDetailsSchema = z.object({
  displayName: z.string().min(3, { message: 'Name is too short' }).max(50, { message: 'Name is too long' }),
  username: z.string().min(3, { message: 'Name is too short' }).max(50, { message: 'Name is too long' }),
  email: z.string().email(),
  jobTitle: z.string().min(3, { message: 'Job title must be at least 3 characters' }).max(50, { message: 'Job title is too long' }),
  city: z.string().min(3, { message: 'City must be at least 3 characters' }).max(50, { message: 'City is too long' }),
  phone: z.any(),
})

export const AccountPrivacySchema = z.object({
  allowUsingDirectCode: z.boolean(),
  private: z.boolean(),
  showDetails: z.boolean(),
})

export const ProfilePictureSchema = z.object({
  picture: z
    .any()
    .refine((file) => file?.length == 1, 'File is required.')
})
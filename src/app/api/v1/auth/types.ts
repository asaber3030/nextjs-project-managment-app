import { z } from "zod"

export type LoginBodyType = {
  email: string
  password: string
}

export const loginSchema = z.object({
  email: z.string().min(1, { message: "E-mail is required" }).email(),
  password: z.string().min(1, { message: "Password is required" })
})
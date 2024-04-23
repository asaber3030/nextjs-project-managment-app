import { NextRequest } from "next/server";

import db from "@/services/prisma";
import bcrypt from 'bcrypt'
import response from "@/lib/response";
import { RegisterSchema } from "@/schema/user";

export async function POST(req: NextRequest) {

  try {

    const { name, jobTitle, email, username, password } = await req.json()

    const schema = RegisterSchema.safeParse({ name, password, email, jobTitle, username })

    if (!schema.success) {
      return response(409, 'Validation errors!', schema.error.format())
    }

    const findByEmail = await db.user.findUnique({ where: { email } })
    const findByUsername = await db.user.findUnique({ where: { username } })

    if (findByEmail) {
      return response(409, 'E-mail Already exists')
    }
    if (findByUsername) {
      return response(409, 'Username already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await db.user.create({
      data: {
        username,
        email,
        jobTitle,
        name,
        password: hashedPassword
      }
    })

    const { password: userPassword, ...rest } = newUser

    return response(201, 'User registered', rest)

  } catch (error) {

    return response(500, 'Something went wrong')
    
  }
}
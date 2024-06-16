import { NextRequest } from "next/server";

import db from "@/services/prisma";
import bcrypt from 'bcrypt'
import response from "@/lib/response";

import { randomUUID } from "crypto";
import { signIn } from "next-auth/react";
import { RegisterSchema } from "@/schema/user";

export async function POST(req: NextRequest) {
  try {

    const { name, jobTitle, email, username, password, photo } = await req.json()

    const schema = RegisterSchema.safeParse({ name, password, email, jobTitle, username, photo })

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
        displayName: name,
        email,
        jobTitle,
        name,
        photo,
        password: hashedPassword,
        directCode: randomUUID()
      }
    })

    const { password: userPassword, ...rest } = newUser

    return response(201, 'User registered', rest)

  } catch (error) {
    return response(500, 'Something went wrong ', error)
  }
}
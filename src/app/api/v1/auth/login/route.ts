import { NextRequest, NextResponse } from "next/server";

import { LoginBodyType } from "../types";
import { LoginSchema } from "@/schema/user";

import { findUserByEmail } from "@/actions/auth";
import { response } from "@/lib/api-utils";

import jwt from 'jsonwebtoken'

import bcrypt from 'bcrypt'

export async function POST(request: NextRequest) {

  const { email, password }: LoginBodyType = await request.json()

  const schema = LoginSchema.safeParse({ email, password })

  if (!schema.success) {
    return response(schema.error.format(), 401)
  }

  const findUser = await findUserByEmail(email)

  if (!findUser) {
    return response('Invalid E-mail or password', 401)
  }

  const { password: userPassword, ...user } = findUser

  const comparePasswords = await bcrypt.compare(password, findUser.password)

  if (!comparePasswords) {
    return response('Invalid password.', 401)
  }

  try {
    const secret = process.env.NEXTAUTH_SECRET
    const token = jwt.sign({ user }, secret!, {
      expiresIn: '10d'
    })
  
    return response('User was found.', 200, {
      token
    })
  } catch (error) {
    return response('Something went wrong!', 500)
  }

}
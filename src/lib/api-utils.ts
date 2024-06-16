import jwt from 'jsonwebtoken'

import { NextRequest, NextResponse } from "next/server";
import { User } from "@/types";

export function response<T>(message: T, statusCode: number, data?: any, errors?: any) {
  return NextResponse.json({
    message,
    status: statusCode,
    data,
    errors
  }, { 
    status: statusCode 
  })
}

export function verifyJWT(request: NextRequest) {
  const token = extractToken(request)!
  try {
    const verify = jwt.verify(token, process.env.NEXTAUTH_SECRET!)
    if (verify) {
      return true
    } else {
      return response('Unauthorized___action', 403)
    }
  } catch (err) {
    return false
  }
}

export function extractToken(request: NextRequest) {
  const authHeader = request.headers.get('Authorization')
  const token = authHeader?.split('Bearer ')[1]
  return token
}

export function extractUser(request: NextRequest) {
  const token = extractToken(request)!
  try {
    const verify = jwt.verify(token, process.env.NEXTAUTH_SECRET!)
    if (verify) {
      return verify as { user: User }
    } else {
      return null
    }
  } catch (err) {
    return null
  }
}

export function createPagination(page: number | null, take: number = 1) {
  let skip = 0;
  if (page) {
    skip = page * take
  }
  return { skip, take }
}
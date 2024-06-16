import { NextRequest, NextResponse } from "next/server";
import { extractUser, verifyJWT } from "@/lib/api-utils";
import { unauthorizedResponse } from "@/lib/api-responses";

export async function GET(request: NextRequest) {
  const isVerified = verifyJWT(request)

  if (isVerified) {
    return NextResponse.json(extractUser(request))
  } else {
    return unauthorizedResponse()
  }
}
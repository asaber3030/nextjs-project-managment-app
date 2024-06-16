import { NextRequest } from "next/server";
import { extractUser, response, verifyJWT } from "@/lib/api-utils";
import { unauthorizedResponse } from "@/lib/api-responses";

import db from "@/services/prisma";

export async function GET(request: NextRequest) {
  const isVerified = verifyJWT(request)
  const session = extractUser(request)

  if (isVerified) {
    const userPlan = await db.plan.findUnique({ where: { id: session?.user?.planId } })
    return response('User plan was found', 200, userPlan)
  } else {
    return unauthorizedResponse()
  }
}
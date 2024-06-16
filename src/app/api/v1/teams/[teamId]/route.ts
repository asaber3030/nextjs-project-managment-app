import db from "@/services/prisma";

import { NextRequest } from "next/server";
import { extractUser, response, verifyJWT } from "@/lib/api-utils";
import { notFoundResponse, unauthorizedResponse } from "@/lib/api-responses";

export type Props = { 
  params: { teamId: string } 
}

export async function GET(request: NextRequest, { params }: Props) {

  const isVerified = verifyJWT(request)
  const session = extractUser(request)

  if (isVerified && session) {

    const team = await db.team.findUnique({ where: { id: +params.teamId } })

    if (!team || team.ownerId != session.user.id) return notFoundResponse()
    
    return response('Team Found', 200, team)

  } else {
    return unauthorizedResponse()
  }
}
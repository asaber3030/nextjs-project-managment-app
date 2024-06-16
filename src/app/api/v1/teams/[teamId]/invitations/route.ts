import db from "@/services/prisma";

import { NextRequest } from "next/server";
import { createPagination, extractUser, response, verifyJWT } from "@/lib/api-utils";
import { notFoundResponse, unauthorizedResponse } from "@/lib/api-responses";
import { userSelect } from "@/actions/config";

export type Props = { 
  params: { teamId: string } 
}

export async function GET(request: NextRequest, { params }: Props) {

  const isVerified = verifyJWT(request)
  const session = extractUser(request)

  if (isVerified && session) {

    const team = await db.team.findUnique({ where: { id: +params.teamId } })
    
    if (!team || team.ownerId != session.user.id) return notFoundResponse()

    const members = await db.teamInvite.findMany({ 
      where: { teamId: team.id },
      orderBy: { id: 'desc' },
      include: { user: { select: userSelect } }
    })

    return response('Team Members', 200, members)
  }

  return unauthorizedResponse()
}
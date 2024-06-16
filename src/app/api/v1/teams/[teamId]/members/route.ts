import db from "@/services/prisma";

import { NextRequest } from "next/server";
import { createPagination, extractUser, response, verifyJWT } from "@/lib/api-utils";
import { notFoundResponse, unauthorizedResponse } from "@/lib/api-responses";

export type Props = { 
  params: { teamId: string } 
}

export async function GET(request: NextRequest, { params }: Props) {

  const isVerified = verifyJWT(request)
  const session = extractUser(request)

  const searchParams = request.nextUrl.searchParams
  const page = searchParams.get('page')
  const limit = searchParams.get('limit')

  if (isVerified && session) {
    const team = await db.team.findUnique({ where: { id: +params.teamId } })
    
    if (!team || team.ownerId != session.user.id) return notFoundResponse()

    const { take, skip } = createPagination(page ? +page : 0, limit ? +limit : 10)
    
    const members = await db.teamMember.findMany({ 
      where: { teamId: team.id },
      orderBy: { id: 'desc' },
      take,
      skip
    })

    return response('Team Members', 200, members)
  }

  return unauthorizedResponse()
}
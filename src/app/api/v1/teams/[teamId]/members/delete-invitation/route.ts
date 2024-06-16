import db from "@/services/prisma";

import { NextRequest } from "next/server";
import { extractUser, response, verifyJWT } from "@/lib/api-utils";
import { accessDeniedResponse, notFoundResponse, unauthorizedResponse } from "@/lib/api-responses";
import { hasAccessTo } from "@/lib/api-permissions";

export type Props = { 
  params: { teamId: string } 
}

export async function DELETE(request: NextRequest, { params }: Props) {

  const isVerified = verifyJWT(request)
  const session = extractUser(request)

  const { userId }: { userId: number } = await request.json()

  if (isVerified && session) {
    const team = await db.team.findUnique({ where: { id: +params.teamId } })
    const member = await db.user.findUnique({ where: { id: userId } })

    if (!team) return notFoundResponse()
    if (!member) return response('User with this code was not found.', 404)

    const hasAccess = await hasAccessTo('members', 'invite-members', { teamId: team.id, userId: session.user.id }) || team.ownerId === session.user.id
    const findInvitation = await db.teamInvite.findFirst({ where: { teamId: team.id, userId: member.id } })

    if (!findInvitation) return response('No invitation found to remove.', 200)

    if (hasAccess) {
      await db.teamInvite.deleteMany({
        where: { userId: member.id, teamId: team.id }
      })
      return response(`Member ${member.name} invitation has been removed from team ${team.name}`, 201)
    }

    return accessDeniedResponse()
    
  }

  return unauthorizedResponse()
}
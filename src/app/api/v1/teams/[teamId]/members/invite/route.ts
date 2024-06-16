import db from "@/services/prisma";

import { NextRequest } from "next/server";
import { extractUser, response, verifyJWT } from "@/lib/api-utils";
import { accessDeniedResponse, notFoundResponse, unauthorizedResponse } from "@/lib/api-responses";
import { findUserByCode, notify } from "@/actions/user-data";
import { hasAccessTo } from "@/lib/api-permissions";
import { route } from "@/lib/route";

export type Props = { 
  params: { teamId: string } 
}

export async function POST(request: NextRequest, { params }: Props) {

  const isVerified = verifyJWT(request)
  const session = extractUser(request)

  const { userId }: { userId: number } = await request.json()

  if (isVerified && session) {
    const team = await db.team.findUnique({ where: { id: +params.teamId } })
    const member = await db.user.findUnique({ where: { id: userId } })

    if (!team) return notFoundResponse()
    if (!member) return response('User with this code was not found.', 404)

    const hasAccess = await hasAccessTo('members', 'invite-members', { teamId: team.id, userId: session.user.id }) || team.ownerId === session.user.id
    const findMembership = await db.teamInvite.findFirst({ where: { teamId: team.id, userId: member.id } })

    if (findMembership) return response('User has been invited already.', 200)

    if (hasAccess) {
      const newMember = await db.teamInvite.create({
        data: { userId: member.id, teamId: team.id }
      })
      await notify(`You have been invited to join team: ${team.name}`, route.myInvitations(), member.id)
      return response(`Member ${member.name} has been invited to team ${team.name}`, 201, newMember)
    }

    return accessDeniedResponse()
    
  }

  return unauthorizedResponse()
}
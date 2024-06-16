import db from "@/services/prisma";

import { NextRequest } from "next/server";
import { createPagination, extractUser, response, verifyJWT } from "@/lib/api-utils";
import { accessDeniedResponse, notFoundResponse, unauthorizedResponse } from "@/lib/api-responses";
import { findUserByCode } from "@/actions/user-data";
import { hasAccessTo } from "@/lib/api-permissions";

export type Props = { 
  params: { teamId: string } 
}

export async function POST(request: NextRequest, { params }: Props) {

  const isVerified = verifyJWT(request)
  const session = extractUser(request)

  const { code }: { code: string } = await request.json()

  if (isVerified && session) {
    const team = await db.team.findUnique({ where: { id: +params.teamId } })
    const member = await findUserByCode(code)

    if (!team) return notFoundResponse()
    if (!member) return response('User with this code was not found.', 404)

    const hasAccess = await hasAccessTo('members', 'direct-add-members', { teamId: team.id, userId: session.user.id }) || team.ownerId === session.user.id

    const findMembership = await db.teamMember.findFirst({ where: { teamId: team.id, userId: member.id } })

    if (findMembership) return response('User is already a member.', 200)

    if (hasAccess) {
      const newMember = await db.teamMember.create({
        data: { userId: member.id, teamId: team.id }
      })
      return response(`Member ${member.name} has been added to team ${team.name}`, 201, newMember)
    }

    return accessDeniedResponse()
    
  }

  return unauthorizedResponse()
}
"use server";

import db from "@/services/prisma";

import { userSelect } from "./config";
import { Team } from "@prisma/client";

export async function getTeams(id: string) {
  const userId = parseInt(id)
  
  const teams: Team[] = await db.team.findMany({
    where: { ownerId: userId },
    include: { members: { include: { user: { select: userSelect } } } }
  })
  return teams
}

export async function getTeam(id: number) {
  const team = await db.team.findUnique({
    where: { id },
    include: { 
      members: { include: { user: { select: userSelect } } },
      invitations: { include: { user: { select: userSelect } }, where: { status: "Pending" } }
    }
  })
  return team
}

export async function findUsersByArray(data: string[], excludeId: string) {
  const excludedId = parseInt(excludeId)
  
  const users = await db.user.findMany({
    where: { 
      OR: [
        { email: { in: data } },
        { username: { in: data } },
      ],
      AND: [
        { id: { not: excludedId } }
      ]
    },
    select: userSelect
  })
  return users
}

export async function findUserByUsername(data: string, excludeId: string) {
  const excludedId = parseInt(excludeId)
  const user = await db.user.findUnique({
    where: { username: data },
    select: userSelect
  })
  return user
}

export async function searchUsers(emailOrUsername: string, excludeId: string) {
  const excludedId = parseInt(excludeId)
  const users = await db.user.findMany({
    where: { 
      OR: [
        { email: { contains: emailOrUsername } },
        { username: { contains: emailOrUsername } },
      ],
      AND: [
        { id: { not: excludedId } }
      ]
    },
    select: userSelect
  })
  if (emailOrUsername != '') {
    return users
  }
  return []
}


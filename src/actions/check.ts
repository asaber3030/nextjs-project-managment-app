"use server";

import db from "@/services/prisma";

import { getCurrent } from "./user-data";

export async function isMemberOfTeam(teamId: number) {

  const current = await getCurrent()

  if (current) {

    const findMembership = await db.teamMember.findFirst({
      where: { teamId, userId: current.id }
    })
    return findMembership ? true : false

  }

  return false
}
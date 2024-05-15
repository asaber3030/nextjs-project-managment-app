"use server";

import db from "@/services/prisma";

import { getCurrent } from "./user-data";

export async function getAccess(tag: string, name: string, teamId: number) {

  const current = await getCurrent();

  const permission = await db.permission.findUnique({
    where: { tag, name }
  })
  const teamMember = await db.teamMember.findFirst({
    where: { teamId, userId: current?.id }
  })

  if (permission && teamMember) {
    const teamPermission = await db.teamPermission.findMany({  
      where: {
        permissionId: permission.id,
        teamId
      },
    })

    const whoCan = teamPermission?.map((per) => per.whoCanDo)

    if (!teamPermission) return false;

    if (!whoCan.includes(teamMember.role)) return false;

    if (whoCan.includes(teamMember.role)) return true;
  }

  return false
}
"use server";

import db from "@/services/prisma";

import { getCurrent } from "./user-data";
import { userSelect } from "./config";

export async function searchTeams(query?: string) {
  
  const current = await getCurrent()

  return await db.team.findMany({
    where: { 
      ownerId: current?.id, 
      name: { contains: query } 
    },
    include: { members: true }
  })
}

export async function searchTasks(query?: string) {
    
  const current = await getCurrent()

  return await db.teamProjectTasks.findMany({
    where: { 
      project: {
        team: { ownerId: current?.id }
      },
      title: { contains: query }
    },
    include: { project: { include: { team: true } }, user: { select: userSelect } }
  })

}

export async function searchProjects(query?: string) {
  
  const current = await getCurrent()

  return await db.teamProject.findMany({
    where: { 
      team: { ownerId: current?.id },
      name: { contains: query }
    }
  })
}
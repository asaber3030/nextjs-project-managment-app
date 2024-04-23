"use server";

import db from "@/services/prisma";

import { z } from "zod";
import { User } from "@/types/user";
import { CreateProjectSchema, CreateTeamSchema } from "@/schema";
import { serverResponse } from "@/lib/response";

export async function createTeam(ownerId: string, invitiations: User[], values: z.infer<typeof CreateTeamSchema>) {
  const ownerIdN = parseInt(ownerId as string)
  const newTeam = await db.team.create({
    data: { name: values.name, about: values.about, ownerId: ownerIdN },
  })
  if (invitiations.length > 0) {
    invitiations.forEach(async (invitation) => {
      await db.teamInvite.create({
        data: {
          teamId: newTeam.id,
          userId: invitation.id
        }
      })
    })
  }

  return {
    message: 'Team created, and if you have invited any members they must accept to join your team!',
    status: 200
  }
}

export async function createTeamProject(ownerId: number, teamId: number, values: z.infer<typeof CreateProjectSchema>) {

  const ownerIdN = parseInt(ownerId as any)
  const teamIdN = parseInt(teamId as any)
 
  const findProjectsInTeam = await db.teamProject.findMany({
    where: { ownerId: ownerIdN, teamId: teamIdN }
  })

  if (findProjectsInTeam.length < 5) {

    const { name, description, url, github, notes } = values

    const newProject = await db.teamProject.create({
      data: {
        name,
        description,
        notes,
        github,
        url,
        ownerId: ownerIdN,
        teamId: teamIdN,
      }
    })

    return {
      status: 201,
      message: 'Project has been created!',
      project: newProject
    }
  }
  return {
    status: 500,
    message: 'You may have reached your project limit to this team!, Upgrade your plan to add more projects!'
  }
}
export async function updateTeamProject(projectId: number, currentId: number, values: z.infer<typeof CreateProjectSchema>) {

  const projectIdN = parseInt(projectId as any)
 
  const findProject = await db.teamProject.findUnique({ where: { id: projectIdN } })

  if (findProject?.ownerId == currentId) {

    const { name, description, url, github, notes } = values

    const updatedProject = await db.teamProject.update({
      where: { id: projectIdN },
      data: {
        name,
        description,
        notes,
        github,
        url
      }
    })

    return {
      status: 201,
      message: 'Project has been updated!',
      project: updatedProject
    }
  }
  return {
    status: 403,
    message: 'Unauthorized action!'
  }
}

export async function getTeamProject(projectId: number) {
  const project = await db.teamProject.findUnique({ 
    where: { id: projectId },
  })
  return serverResponse(200, 'Projects query', project)
}

export async function getTeamProjects(teamId: number) {
  const projects = await db.teamProject.findMany({ 
    where: { teamId },
  })
  return serverResponse(200, 'Projects query', projects)
}
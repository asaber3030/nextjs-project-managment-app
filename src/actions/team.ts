"use server"

import db from "@/services/prisma"

import { TeamPermission, User } from "@/types"
import { CreateProjectSchema, CreateTeamSchema } from "@/schema"
import { Prisma, Status, TeamMemberStatus, TeamRoles } from "@prisma/client"

import { getCurrent, getMembershipOfTeam, getTeam, notify } from "./user-data"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"
import { userSelect } from "./config"
import { notificationIcon } from "@/lib/utils"
import { serverResponse } from "@/lib/response"
import { route } from "@/lib/route"
import { authOptions } from "@/services/auth"
import { z } from "zod"

export async function createTeam(
  ownerId: number,
  invitiations: User[],
  values: z.infer<typeof CreateTeamSchema>
) {
  const newTeam = await db.team.create({
    data: { name: values.name, about: values.about, ownerId: ownerId },
  })
  await db.teamMember.create({
    data: { userId: ownerId, teamId: newTeam.id },
  })
  await notify(
    `<b>${newTeam.name}</b> team has been created!`,
    route.viewTeam(newTeam.id),
    ownerId,
    notificationIcon("create-team")
  )
  if (invitiations.length > 0) {
    await notify(
      `<b>${newTeam.name}</b> team invitations has been sent to users - total invitations is ${invitiations.length} invitation`,
      route.viewTeamInvitations(newTeam.id),
      ownerId,
      notificationIcon("invite-to-team")
    )
    invitiations.forEach(async (invitation) => {
      await db.teamInvite.create({
        data: {
          teamId: newTeam.id,
          userId: invitation.id,
        },
      })
    })
  }
  revalidatePath(route.account("teams"))
  revalidatePath(route.dashboard())
  return {
    message:
      "Team created, and if you have invited any members they must accept to join your team!",
    status: 200,
    team: newTeam,
  }
}

export async function updateTeam(teamId: number, values: z.infer<typeof CreateTeamSchema>) {
  const currentUser = await getServerSession(authOptions)
  const userId = currentUser?.user.id

  const findMembership = await getMembershipOfTeam(userId as number, teamId)
  const team = await getTeam(teamId)

  if (!findMembership || userId != team?.ownerId) {
    return {
      status: 403,
      message: "Not Authorized",
      findMembership,
      team,
      userId,
      currentUser,
    }
  }

  await db.team.update({
    data: { name: values.name, about: values.about },
    where: { id: teamId },
  })

  return {
    message: "Team details has been updated",
    status: 200,
  }
}

export async function deleteTeam(teamId: number) {
  const team = await db.team.findUnique({
    where: { id: teamId },
  })
  const user = await getCurrent()

  if (team?.ownerId !== user?.id) {
    return {
      message: "Unauthorized",
      status: 403,
    }
  }

  await db.team.delete({
    where: { id: teamId },
  })
  return {
    message: "Team have been deleted!",
    status: 200,
  }
}

export async function createTeamProject(
  ownerId: number,
  teamId: number,
  values: z.infer<typeof CreateProjectSchema>
) {
  const { name, description, url, github, notes } = values

  const newProject = await db.teamProject.create({
    data: {
      name,
      description,
      notes,
      github,
      url,
      ownerId,
      teamId,
    },
  })
  await notify(
    `<b>${newProject.name}</b> - A project has been created to your list!`,
    route.viewTeamProject(newProject.teamId, newProject.id),
    ownerId,
    notificationIcon("create-project")
  )

  revalidatePath(route.viewTeamProjects(teamId))

  return {
    status: 201,
    message: "Project has been created!",
    project: newProject,
  }
}

export async function deleteTeams(ids: number[]) {
  ids.forEach(async (id) => {
    try {
      const team = await db.team.delete({ where: { id } })
    } catch (error) {
      return {
        status: 500,
        message: "Something went wrong",
        error,
      }
    }
  })

  revalidatePath(route.account("teams"))

  return {
    status: 200,
    message: "Teams has been deleted!",
  }
}

export async function leaveTeams(ids: number[]) {
  const current = await getCurrent()

  ids.forEach(async (id) => {
    try {
      const membership = await db.teamMember.findFirst({
        where: { userId: current?.id, teamId: id },
        select: { id: true },
      })
      if (!membership) {
        return {
          message: "No member found in this team",
          status: 500,
        }
      }
      await db.teamMember.deleteMany({
        where: { userId: current?.id, teamId: id },
      })
    } catch (error) {
      return {
        status: 500,
        message: "Something went wrong",
        error,
      }
    }
    return {
      message: "You have left the selected teams successfully.",
      status: 200,
    }
  })

  revalidatePath(route.account("teams"))

  return {
    status: 200,
    message: "Teams has been deleted!",
  }
}

export async function leaveOneTeam(membershipId: number) {
  try {
    const membership = await db.teamMember.findFirst({
      where: { id: membershipId },
      select: { id: true },
    })
    if (!membership) {
      return {
        message: "No member found in this team",
        status: 500,
      }
    }
    await db.teamMember.deleteMany({
      where: { id: membershipId },
    })
    revalidatePath(route.account("teams"))
    return {
      message: "You have left the selected teams successfully.",
      status: 200,
    }
  } catch (error) {
    return {
      status: 500,
      message: "Something went wrong",
      error,
    }
  }
}

export async function updateTeamProject(
  projectId: number,
  currentId: number,
  values: z.infer<typeof CreateProjectSchema>
) {
  const findProject = await db.teamProject.findUnique({ where: { id: projectId } })

  if (findProject?.ownerId == currentId) {
    const { name, description, url, github, notes } = values

    const updatedProject = await db.teamProject.update({
      where: { id: projectId },
      data: {
        name,
        description,
        notes,
        github,
        url,
        updatedAt: new Date(),
      },
    })

    await notify(
      `<b>${updatedProject.name}</b> - This project details has been updated!`,
      route.viewTeamProject(updatedProject.teamId, updatedProject.id),
      updatedProject.ownerId,
      notificationIcon("update")
    )

    return {
      status: 201,
      message: "Project has been updated!",
      project: updatedProject,
    }
  }
  return {
    status: 403,
    message: "Unauthorized action!",
  }
}

export async function deleteTeamProject(projectId: number, currentId: number) {
  const projectIdN = parseInt(projectId as any)
  const findProject = await db.teamProject.findUnique({ where: { id: projectIdN } })

  await notify(
    `Project with ID: <b>${findProject?.id} has been deleted!</b>`,
    route.viewTeamProject(findProject?.teamId as number, findProject?.id as number),
    findProject?.ownerId as number,
    notificationIcon("delete")
  )

  if (findProject?.ownerId == currentId) {
    await db.teamProject.delete({ where: { id: projectIdN } })

    return {
      status: 200,
      message: "Project has been deleted!",
    }
  }
  return {
    status: 403,
    message: "Unauthorized action!",
  }
}

export async function getTeamProject(projectId: number) {
  const project = await db.teamProject.findUnique({
    where: { id: projectId },
    include: { team: true },
  })
  return serverResponse(200, "Projects query", project)
}

export async function getTeamProjects(teamId: number, projectName?: string, limit?: number) {
  const where: Prisma.TeamProjectWhereInput = { teamId }

  if (projectName) where.name = { contains: projectName }

  if (limit) {
    const projects = await db.teamProject.findMany({
      where,
      include: { team: true },
      orderBy: { id: "desc" },
      take: limit,
    })
    return serverResponse(200, "Projects query", projects)
  }

  const projects = await db.teamProject.findMany({
    where,
    include: { team: true },
    orderBy: { id: "desc" },
  })
  return serverResponse(200, "Projects query", projects)
}

export async function getProjectStats(projectId: number) {
  const stats = await db.teamProject.findUnique({
    where: { id: projectId },
    select: {
      _count: {
        select: {
          projectBoards: true,
          projectTasks: true,
        },
      },
    },
  })
  const pendingTasks = await db.teamProjectTasks.count({
    where: { projectId, status: Status.Pending },
  })
  const acceptedTasks = await db.teamProjectTasks.count({
    where: { projectId, status: Status.Accepted },
  })
  const refusedTasks = await db.teamProjectTasks.count({
    where: { projectId, status: Status.Refused },
  })
  return {
    stats,
    pendingTasks,
    acceptedTasks,
    refusedTasks,
  }
}

export async function getTeamMembers(teamId: number) {
  const members = await db.teamMember.findMany({
    where: { teamId },
    orderBy: { user: { name: "desc" } },
    include: { user: { select: userSelect } },
  })
  return {
    members,
    status: 200,
    message: "Members found",
  }
}

export async function getTeamAnalytics(teamId: number) {
  const members = await db.teamMember.count({ where: { teamId } })
  const tasks = await db.teamProjectTasks.count({ where: { project: { teamId } } })
  const boards = await db.teamProjectBoards.count({ where: { project: { teamId } } })
  const invitations = await db.teamInvite.count({ where: { teamId } })
  const projects = await db.teamProject.count({ where: { teamId } })

  return {
    members,
    tasks,
    boards,
    invitations,
    projects,
  }
}

export async function approveOneTeamInvitation(invitationId: number) {
  const invitation = await db.teamInvite.findUnique({ where: { id: invitationId } })
  if (invitation) {
    await db.teamInvite.update({
      where: { id: invitationId },
      data: { status: Status.Accepted },
    })
    await db.teamMember.create({
      data: {
        userId: invitation.userId,
        teamId: invitation.teamId,
        role: invitation.invitationRole,
        status: "Active",
      },
    })
    revalidatePath(route.myInvitations())
    return {
      message: "Invitation has been approved",
      status: 200,
    }
  }
  return {
    message: "Something went wrong",
    status: 500,
  }
}

export async function rejectOneTeamInvitation(invitationId: number) {
  const invitation = await db.teamInvite.findUnique({ where: { id: invitationId } })
  if (invitation) {
    await db.teamInvite.update({
      where: { id: invitationId },
      data: { status: Status.Refused },
    })
    revalidatePath(route.myInvitations())
    return {
      message: "Invitation has been refused",
      status: 200,
    }
  }
  return {
    message: "Something went wrong",
    status: 500,
  }
}

export async function approveAllTeamInvitation(invitationIds: number[]) {
  try {
    invitationIds.forEach(async (invitationId) => {
      const invitation = await db.teamInvite.findUnique({ where: { id: invitationId } })
      if (invitation) {
        await db.teamInvite.update({
          where: { id: invitationId },
          data: { status: Status.Accepted },
        })
        await db.teamMember.create({
          data: {
            userId: invitation.userId,
            teamId: invitation.teamId,
            role: invitation.invitationRole,
            status: "Active",
          },
        })
      }
    })
    revalidatePath(route.myInvitations())
    return {
      message: "All Invitations has been approved",
      status: 200,
    }
  } catch (e) {
    return {
      message: "Something went wrong",
      status: 500,
    }
  }
}

export async function rejectAllTeamInvitation(invitationIds: number[]) {
  try {
    invitationIds.forEach(async (invitationId) => {
      const invitation = await db.teamInvite.findUnique({ where: { id: invitationId } })
      if (invitation) {
        await db.teamInvite.update({
          where: { id: invitationId },
          data: { status: Status.Refused },
        })
      }
    })
    revalidatePath(route.myInvitations())
    return {
      message: "All Invitations has been refused",
      status: 200,
    }
  } catch (e) {
    return {
      message: "Something went wrong",
      status: 500,
    }
  }
}

export async function removeMember(teamId: number, memberId: number, membershipId: number) {
  const teamMemberExists = await db.teamMember.findMany({ where: { teamId, userId: memberId } })
  const team = await db.team.findUnique({ where: { id: teamId }, select: { name: true } })
  await notify(
    `You have been kicked from team: <b>${team?.name}</b>`,
    route.teams(),
    memberId,
    notificationIcon("user-remove")
  )

  if (teamMemberExists.length > 0) {
    await db.teamMember.delete({ where: { id: membershipId } })
    return {
      status: 200,
      message: "Member has been deleted!",
    }
  }
  return {
    status: 500,
    message: "Something went wrong",
  }
}

export async function changeMemberStatus(
  status: TeamMemberStatus,
  teamId: number,
  memberId: number,
  membershipId: number
) {
  const teamMemberExists = await db.teamMember.findFirst({ where: { teamId, userId: memberId } })
  if (teamMemberExists) {
    const team = await db.team.findUnique({ where: { id: teamId }, select: { name: true } })
    await notify(
      `Your status inside team <b>${team?.name}</b> has been changed to ${status}`,
      route.teams(),
      teamMemberExists.userId,
      notificationIcon("status")
    )
    await db.teamMember.update({ where: { id: membershipId }, data: { status } })
    return {
      status: 200,
      message: "Member status has been updated!",
    }
  }
  return {
    status: 500,
    message: "Something went wrong",
  }
}

export async function changeMemberRole(
  role: TeamRoles,
  teamId: number,
  memberId: number,
  membershipId: number
) {
  const teamMemberExists = await db.teamMember.findFirst({ where: { teamId, userId: memberId } })
  if (teamMemberExists) {
    const team = await db.team.findUnique({ where: { id: teamId }, select: { name: true } })
    await notify(
      `Your role inside team <b>${team?.name}</b> has been changed to ${role}`,
      route.teams(),
      teamMemberExists.userId,
      notificationIcon("status")
    )
    await db.teamMember.update({ where: { id: membershipId }, data: { role } })
    return {
      status: 200,
      message: "Member Role has been updated!",
    }
  }
  return {
    status: 500,
    message: "Something went wrong",
  }
}

export async function inviteMembers(teamId: number, users: User[]) {
  if (users.length > 0) {
    const team = await db.team.findUnique({ where: { id: teamId }, select: { name: true } })
    users.forEach(async (invitation) => {
      await notify(
        `You have been invited to join team <b>${team?.name}</b>`,
        route.myInvitations(),
        invitation.id,
        notificationIcon("invite-to-team")
      )
      const findInvitation = await db.teamInvite.findMany({
        where: { teamId, userId: invitation.id },
      })

      if (findInvitation.length === 0) {
        await db.teamInvite.create({
          data: {
            teamId,
            userId: invitation.id,
          },
        })
      }
    })
  }
  return {
    message:
      "Selected users has been invited, Notice that if you have invited them before you won't be able to invite twice!",
    status: 200,
  }
}

export async function directAddMember(code: string, teamId: number, userId: number) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { id: true, directCode: true },
  })
  const findMember = await db.teamMember.findFirst({ where: { teamId, userId } })
  const team = await db.team.findUnique({ where: { id: teamId }, select: { name: true, id: true } })

  if (user?.directCode.toLowerCase() === code.toLowerCase()) {
    if (!findMember) {
      await notify(
        `You have been added to team <b>${team?.name}</b>`,
        route.teams(),
        userId,
        notificationIcon("check")
      )
      const teamMember = await db.teamMember.create({
        data: { teamId, userId },
      })
      revalidatePath("/dashboard")
      return {
        status: 201,
        member: teamMember,
        message: "Member has been added successfully!",
      }
    }
    return {
      status: 201,
      message: "This member is one of the team.",
    }
  }
  return {
    status: 201,
    message: "This user might be one of the team members!",
  }
}

export async function removeInvitation(invitationId: number) {
  try {
    await db.teamInvite.delete({ where: { id: invitationId } })
    return {
      status: 200,
      message: "Invitation has been removed!",
    }
  } catch (e) {
    return {
      message: "Something went wrong",
      status: 500,
    }
  }
}

// Permissions section

export async function getTeamPermissions(teamId: number) {
  const permissions = await db.teamPermission.findMany({
    where: { teamId },
    include: { permission: true },
  })
  return permissions
}

export async function getGlobalTeamPermissions(tag?: string) {
  if (tag) {
    const permissions = await db.permission.findMany({
      where: { tag },
      orderBy: { name: "asc" },
    })
    return permissions
  }
  const permissions = await db.permission.findMany({
    orderBy: { name: "asc" },
  })
  return permissions
}

export async function getGlobalTeamPermissionsByTeam(teamId: number, tag: string) {
  const permissions = await db.permission.findMany({
    include: { teamPermissions: { where: { teamId } } },
    where: { tag },
    orderBy: { name: "asc" },
  })
  return permissions
}

export async function updateTeamPermission(
  permissionId: number,
  teamId: number,
  newMutators: TeamRoles[],
  teamPermissions: TeamPermission[]
) {
  let items: any

  teamPermissions.forEach(async (item) => {
    await db.teamPermission.delete({
      where: { id: item.id },
    })
  })

  if (newMutators.length > 0) {
    newMutators.forEach(async (mutator) => {
      items = await db.teamPermission.createMany({
        data: { teamId, permissionId, whoCanDo: mutator },
      })
    })
  }

  return items
}

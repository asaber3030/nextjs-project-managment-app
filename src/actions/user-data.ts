"use server";

import db from "@/services/prisma";

import { PersonalTaskStatus, Status, Team } from "@prisma/client";
import { TeamInvite, User } from "@/types";

import { getServerSession } from "next-auth";
import { authOptions } from "@/services/auth";
import { revalidatePath } from "next/cache";
import { notificationIcon } from "@/lib/utils";
import { route } from "@/lib/route";
import { userSelect } from "./config";
import { z } from "zod";
import { ChangeDirectCodeSchema, ChangePasswordSchema, PersonalProjectSchema, PersonalTaskSchema } from "@/schema";
import { AccountPrivacySchema, UserDetailsSchema } from "@/schema/user";
import bcrypt from 'bcrypt'

export async function testProjects() {
  return await db.project.findMany()
}

export async function getCurrent() {
  const session = await getServerSession(authOptions)
  return session?.user
}

export async function notify(title: string, url: string, userId: number, icon: string = notificationIcon()) {
  try {
    const notification = await db.notification.create({
      data: {
        userId,
        url,
        title,
        icon
      }
    })
    return notification
  } catch (error) {
    throw error
  }
}

export async function getMyInvitationsToTeams(status: Status = Status.Pending) {
  const session = await getServerSession(authOptions)
  try {
    const invitations = await db.teamInvite.findMany({
      where: { userId: session?.user.id, status },
      include: { team: { include: { owner: { select: userSelect } } } }
    })
    return invitations as TeamInvite[]
  } catch (e) {
    console.log(e)
    return []
  }
}

export async function getMyJoinedTeams() {
  try {
    const current = await getCurrent();
    const userId = current?.id
    const teams = await db.teamMember.findMany({
      where: { userId },
      include: { team: { include: { members: { include: { user: { select: userSelect } } } } } }
    })
    return teams 
  } catch (e) {
    console.log(e)
  }
  return []
}

export async function getUserCounts() {
  const user = await getCurrent()
  const userId = user?.id

  const teams = await db.team.count({ where: { ownerId: userId } })
  const projects = await db.project.count({ where: { ownerId: userId } })
  const boards = await db.teamProjectBoards.count({ where: { ownerId: userId } })
  const tasks = await db.task.count({ where: { ownerId: userId } })

  return {
    teams,
    projects,
    boards,
    tasks,
  }

}

export async function getNotifications() {
  const current = await getCurrent()
  const notifications = await db.notification.findMany({ 
    where: { userId: current?.id }, 
    orderBy: { id: 'desc' } 
  })
  return notifications
}

export async function getTeams(id?: string) {
  const current = await getCurrent();
  const teams: Team[] = await db.team.findMany({
    where: { ownerId: current?.id },
    include: { members: { include: { user: { select: userSelect } } } }
  })
  return teams
}

export async function getTeam(id: number) {
  const team = await db.team.findUnique({
    where: { id },
    include: {
      owner: { select: userSelect },
      members: { include: { user: { select: userSelect } } },
      invitations: { include: { user: { select: userSelect } }, where: { status: "Pending" } }
    }
  })
  return team
}

export async function getTeamInvitations(teamId: number) {
  const invitations = await db.teamInvite.findMany({
    where: { teamId },
    include: {
      user: { select: userSelect },
    }
  })
  return invitations as unknown as TeamInvite[]
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

export async function findUserByCode(code: string) {
  return await db.user.findUnique({ where: { directCode: code } }) as unknown as User
}

export async function searchUsers(emailOrUsername: string, excludeId: string) {
  const current = await getCurrent()
  const excludedId = parseInt(excludeId)
  const users = await db.user.findMany({
    where: { 
      OR: [
        { email: { contains: emailOrUsername } },
        { username: { contains: emailOrUsername } },
      ],
      AND: [
        { id: { not: current?.id } }
      ]
    },
    select: userSelect
  })
  if (emailOrUsername != '') {
    return users
  }
  return []
}

export async function searchUnInvitedMembers(filter: string, teamId: number) {
  
  const getMembers = await db.teamMember.findMany({ where: { teamId }, select: { userId: true } })
  const getInvitations = await db.teamInvite.findMany({ where: { teamId }, select: { userId: true } })

  const membersIds = getMembers.map((m) => m.userId)
  const invitationsIds = getInvitations.map((m) => m.userId)

  const current = await getCurrent()

  const excludedIds = [...membersIds, ...invitationsIds, current?.id as number]
  
  const users = await db.user.findMany({
    where: { 
      OR: [
        { email: { contains: filter } },
        { username: { contains: filter } },
        { name: { contains: filter } },
      ],
      AND: [
        { id: { not: { in: excludedIds } } }
      ]
    },
    select: userSelect
  })
  return users
}

export async function getTeamMemberData(userId: number, teamId: number) {
  const acceptedTasks = await db.teamProjectTasks.findMany({
    where: { userId, project: { teamId }, status: Status.Accepted }
  })
  const refusedTasks = await db.teamProjectTasks.findMany({
    where: { userId, project: { teamId }, status: Status.Refused }
  })
  const pendingTasks = await db.teamProjectTasks.findMany({
    where: { userId, project: { teamId }, status: Status.Pending }
  })
  const memberBoards = await db.teamProjectBoards.findMany({
    where: { ownerId: userId, project: { teamId } }
  })
  const member = await db.user.findMany({
    where: { id: userId },
    select: userSelect
  })

  return {
    acceptedTasks,
    refusedTasks,
    pendingTasks,
    memberBoards,
    member
  }
}

export async function getMembershipOfTeam(memberId: number, teamId: number) {
  const membership = await db.teamMember.findFirst({
    where: { teamId, userId: memberId },
    include: { user: { select: userSelect }, team: true },
  })
  return membership
}

export async function getMemberTasks(userId: number, teamId: number, status: Status, filter?: string, projectId?: number) {
  if (projectId) {
    const tasks = await db.teamProjectTasks.findMany({
      where: { 
        title: { contains: filter },
        project: { teamId, id: projectId }, 
        userId, 
        status 
      },
      include: { project: true, user: { select: userSelect } }
    })
    return tasks
  }
  const tasks = await db.teamProjectTasks.findMany({
    where: { 
      title: { contains: filter },
      project: { teamId }, 
      userId, 
      status 
    },
    include: { project: true, user: { select: userSelect } }
  })
  return tasks
}

export async function getMemberBoards(userId: number, teamId: number, projectId?: number) {
  if (projectId) {
    const boards = await db.teamProjectBoards.findMany({
      where: { 
        project: { teamId, id: projectId }, 
        ownerId: userId, 
      },
      include: { project: true, owner: { select: userSelect } }
    })
    return boards
  }
  const boards = await db.teamProjectBoards.findMany({
    where: { 
      project: { teamId }, 
      ownerId: userId, 
    },
    include: { project: true, owner: { select: userSelect } }
  })
  return boards
}

export async function updateNotification(notificationId: number, status: boolean = true) {
  try {
    const updated = await db.notification.update({
      where: { id: notificationId },
      data: { isRead: status }
    })
    revalidatePath(route.notifications())
    revalidatePath('/dashboard')

    return {
      status: 201,
      message: 'Notification has been updated!',
      notification: updated
    }
  } catch (error) {
    return {
      error,
      message: 'Something went wrong',
      status: 500
    }
  }
}

export async function deleteNotification(notificationId: number) {
  try {
    await db.notification.delete({
      where: { id: notificationId },
    })
    revalidatePath(route.notifications())
    revalidatePath('/dashboard')
    return {
      status: 201,
      message: 'Notification has been deleted!',
    }
  } catch (error) {
    return {
      error,
      message: 'Something went wrong',
      status: 500
    }
  }
}

// Personal Data
export async function getPersonalProjects(query: string = '', orderByColumn: string = 'id', orderType: 'asc' | 'desc' = 'desc') {
  try {
    const current = await getCurrent();
    const personalProjects = await db.project.findMany({
      where: { 
        OR: [
          { name: { contains: query } }
        ],
        AND: [
          { ownerId: current?.id }
        ]
      },
      orderBy: { [orderByColumn]: orderType },
    })
    return personalProjects;
  } catch (error) {
    throw error
  }
}

export async function getPersonalProject(id: number) {
  try {
    const project = await db.project.findUnique({
      where: { id },
      include: { files: true },
    })
    return project;
  } catch (error) {
    throw error
  }
}

export async function updatePersonalProject(id: number, data: z.infer<typeof PersonalProjectSchema>) {
  try {
    const current = await getCurrent()
    const project = await db.project.findUnique({
      where: { id },
      select: { ownerId: true }
    })
    if (current?.id !== project?.ownerId) {
      return {
        message: 'Unauthorized',
        status: 403
      }; 
    }
    const updatedProject = await db.project.update({
      where: { id },
      data
    })
    return {
      message: 'Project has been updated successfully!',
      status: 200,
      project: updatedProject
    };
  } catch (error) {
    throw error
  }
}

export async function deletePersonalProject(id: number) {
  try {
    const current = await getCurrent()
    const project = await db.project.findUnique({
      where: { id },
      select: { ownerId: true }
    })
    if (current?.id !== project?.ownerId) {
      return {
        message: 'Unauthorized',
        status: 403
      }; 
    }
    const updatedProject = await db.project.delete({
      where: { id },
    })
    return {
      message: 'Project has been updated successfully!',
      status: 200,
      project: updatedProject
    };
  } catch (error) {
    throw error
  }
}

export async function createPersonalProject(data: z.infer<typeof PersonalProjectSchema>) {
  try {
    const current = await getCurrent()
    if (current) {
      const project = await db.project.create({
        data: {
          ...data,
          ownerId: current.id
        }
      })
      return {
        message: 'Project has been created successfully!',
        status: 201,
        project
      };
    }
  } catch (error) {
    throw error
  }
  return {
    message: 'Unauthorized',
    status: 500,
  }
}

// Tasks
export async function getPersonalTasks(query: string = '', orderByColumn: string = 'id', orderType: 'asc' | 'desc' = 'desc') {
  try {
    const current = await getCurrent();
    const personalTasks = await db.task.findMany({
      where: { 
        OR: [
          { title: { contains: query || '' } }
        ],
        AND: [
          { ownerId: current?.id }
        ]
      },
      orderBy: { [orderByColumn || 'id']: orderType },
      include: { owner: true }
    })
    return personalTasks;
  } catch (error) {
    throw error
  }
}

export async function getPersonalTask(id: number) {
  try {
    const task = await db.task.findUnique({
      where: { id },
    })
    return task;
  } catch (error) {
    throw error
  }
}

export async function updatePersonalTask(id: number, data: z.infer<typeof PersonalTaskSchema>) {
  try {
    const current = await getCurrent()
    const task = await db.task.findUnique({
      where: { id },
      select: { ownerId: true }
    })
    if (current?.id !== task?.ownerId) {
      return {
        message: 'Unauthorized',
        status: 403
      }; 
    }
    const updatedtask = await db.task.update({
      where: { id },
      data
    })
    revalidatePath(route.personalTasks())
    return {
      message: 'Task has been updated successfully!',
      status: 200,
      task: updatedtask
    };
  } catch (error) {
    throw error
  }
}

export async function changeStatusPersonalTask(id: number, status: PersonalTaskStatus) {
  try {
    const current = await getCurrent()
    const task = await db.task.findUnique({
      where: { id },
      select: { ownerId: true }
    })
    if (current?.id !== task?.ownerId) {
      return {
        message: 'Unauthorized',
        status: 403
      }; 
    }
    const updatedtask = await db.task.update({
      where: { id },
      data: { status }
    })
    revalidatePath(route.personalTasks())
    return {
      message: 'Task status has been updated successfully!',
      status: 200,
      task: updatedtask
    };
  } catch (error) {
    throw error
  }
}

export async function deletePersonalTask(id: number) {
  try {
    const current = await getCurrent()
    const task = await db.task.findUnique({
      where: { id },
      select: { ownerId: true }
    })
    if (current?.id !== task?.ownerId) {
      return {
        message: 'Unauthorized',
        status: 403
      }; 
    }
    const updatedtask = await db.task.delete({
      where: { id },
    })
    revalidatePath(route.personalTasks())
    return {
      message: 'Task has been updated successfully!',
      status: 200,
      task: updatedtask
    };
  } catch (error) {
    throw error
  }
}

export async function createPersonalTask(data: z.infer<typeof PersonalTaskSchema>) {
  try {
    const current = await getCurrent()
    if (current) {
      const task = await db.task.create({
        data: {
          ...data,
          ownerId: current.id
        }
      })
      revalidatePath(route.personalTasks())
      return {
        message: 'Task has been created successfully!',
        status: 201,
        task
      };
    }
  } catch (error) {
    throw error
  }
  return {
    message: 'Unauthorized',
    status: 500,
  }
}

export async function updateDetails(data: z.infer<typeof UserDetailsSchema>) {
  try {
    const user = await getCurrent();
    const update = await db.user.update({
      where: { id: user?.id },
      data
    })
    return {
      message: 'Updated',
      status: 200,
      user: update
    }
  } catch (error) {
    console.log(error)
    return {
      message: 'something went wrong',
      status: 500,
      error
    }
  }
}

export async function changePassword(data: z.infer<typeof ChangePasswordSchema>) {
  try {
    
    const user = await getCurrent();
    
    const { newPassword, currentPassword, confirmPassword } = data

    const find = await db.user.findUnique({
      where: { id: user?.id },
      select: { password: true, id: true }
    })

    if (!find) throw new Error("Unauthorized")

    const comparePasswords = await bcrypt.compare(currentPassword, find.password)

    if (!comparePasswords) {
      return {
        message: "Invalid password!",
        status: 403,
      }
    }

    if (newPassword !== confirmPassword) {
      return {
        message: "Password doesn't match!",
        status: 403,
      }
    }
    const hashed = await bcrypt.hash(newPassword, 10)
    
    await db.user.update({
      where: { id: find.id },
      data: { password: hashed }
    })

    return {
      message: "Password has been changed successfully!",
      status: 403,
    }

  } catch (error) {

  }
}

export async function changeCode(data: z.infer<typeof ChangeDirectCodeSchema>) {
  try {
    const user = await getCurrent();
    await db.user.update({
      where: { id: user?.id },
      data
    })
    return {
      message: 'Updated',
      status: 200,
    }
  } catch (error) {
    return {
      message: 'something went wrong',
      status: 500,
      error
    }
  }
}

export async function getDirectCode() {
  try {
    const user = await getCurrent();
    const directCode = await db.user.findUnique({
      where: { id: user?.id },
      select: { directCode: true }
    })
    return {
      directCode,
      status: 200
    }
  } catch (error) {
    return {
      message: 'Something went wrong',
      status: 500,
      error
    }
  }
}

export async function changeAccountPrivacy(data: z.infer<typeof AccountPrivacySchema>) {
  try {
    const user = await getCurrent();
    const update = await db.user.update({
      where: { id: user?.id },
      data
    })
    return {
      message: 'Account settings has been updated',
      status: 200,
      user: update
    }
  } catch (error) {
    console.log(error)
    return {
      message: 'Something went wrong',
      status: 500,
      error
    }
  }
}

export async function changeProfilePicture(url: string) {
  try {
    const user = await getCurrent();
    const update = await db.user.update({
      where: { id: user?.id },
      data: { photo: url }
    })
    return {
      message: 'Profile picture has been updated!',
      status: 200,
      user: update
    }
  } catch (error) {
    console.log(error)
    return {
      message: 'Something went wrong',
      status: 500,
      error
    }
  }
}

export async function changeCover(url: string) {
  try {
    const user = await getCurrent();
    const update = await db.user.update({
      where: { id: user?.id },
      data: { bgCover: url }
    })
    return {
      message: 'Profile Cover has been updated!',
      status: 200,
      user: update
    }
  } catch (error) {
    console.log(error)
    return {
      message: 'Something went wrong',
      status: 500,
      error
    }
  }
}

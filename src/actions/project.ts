"use server";

import db from "@/services/prisma";

import { z } from "zod";
import { userSelect } from "./config";
import { CreateProjectBoardSchema, CreateProjectTaskSchema, CreateTaskReply, UpdateProjectBoardSchema, UpdateProjectTaskSchema } from "@/schema";
import { TTasksFilters } from "@/types";
import { Status, TeamProjectBoards } from "@prisma/client";
import { getCurrent, notify } from "./user-data";
import { revalidatePath } from "next/cache";
import { route } from "@/lib/route";

// Tasks

export async function getProjectTasks(projectId: number, limit?: number) {

  const projectIdN = parseInt(projectId as any)

  if (limit) {
    const tasks = await db.teamProjectTasks.findMany({
      where: { projectId: projectIdN },
      orderBy: { id: 'desc' },
      include: { user: { select: userSelect } },
      take: limit
    })
    return {
      tasks,
      status: 200,
      message: 'Project tasks'
    }
  }

  const tasks = await db.teamProjectTasks.findMany({
    where: { projectId: projectIdN },
    orderBy: { id: 'desc' },
    include: { user: true }
  })
  return {
    tasks,
    status: 200,
    message: 'Project tasks'
  }
}

export async function searchProjectTasks(projectId: number, filters: TTasksFilters) {

  const projectIdN = parseInt(projectId as any)

  const andFilters: any = [
    { projectId: projectIdN }
  ]

  if (filters.status && filters.status != 'All') {
    andFilters.push({
      status: filters.status as Status
    })
  }

  if (filters.date) {
    andFilters.push({
      finishAt: { equals: new Date(filters.date) }
    })
  }

  const tasks = await db.teamProjectTasks.findMany({
    where: {
      OR: [
        { user: { name: { contains: filters.user ?? '' } } },
        { user: { username: { contains: filters.user ?? '' } } },
        { user: { email: { contains: filters.user ?? '' } } },
      ],
      AND: andFilters
    },
    orderBy: { id: 'desc' },
    include: { user: { select: userSelect }, project: { include: { team: true } } },
  })
  
  return {
    tasks,
    filters,
    andFilters,
    message: 'Project tasks'
  }
}

export async function createTask(projectId: number, values: z.infer<typeof CreateProjectTaskSchema>) {
  const { title, description, url, notes, finishAt, status } = values
  try {
    values.userId.forEach(async (id) => {
      const createdTasks = await db.teamProjectTasks.create({
        data: {
          title,
          description,
          url,
          notes,
          finishAt,
          projectId,
          status,
          userId: id,
          updatedAt: new Date()
        }
      })
    })
    return {
      status: 200,
      message: 'Task has been created!',
    }
  } catch (e) {
    console.log(e)
    return {
      status: 500,
      message: 'Something went wrong!'
    }
  }
  
}

export async function updateTask(taskId: number, values: z.infer<typeof UpdateProjectTaskSchema>) {

  const taskIdN = Number(taskId)

  try {
    const updateTask = await db.teamProjectTasks.update({
      where: { id: taskIdN },
      data: {
        ...values,
        updatedAt: new Date()
      }
    })
    return {
      task: updateTask,
      status: 200,
      message: 'Task has been updated!'
    }
  } catch (e) {
    console.log(e);
    return {
      status: 500,
      message: 'Something went wrong!'
    }
  }
  
}

export async function deleteTask(taskId: number) {

  const taskIdN = Number(taskId)

  try {
    const updateTask = await db.teamProjectTasks.delete({ where: { id: taskId } })
    return {
      status: 200,
      message: 'Task has been deleted!'
    }
  } catch (e) {
    console.log(e);
    return {
      status: 500,
      message: 'Something went wrong!'
    }
  }
  
}

export async function assignTaskTo(taskId: number, toUser: number) {
  
  const taskIdN = Number(taskId)

  try {
    const updateTask = await db.teamProjectTasks.update({
      where: { id: taskIdN },
      data: {
        userId: toUser,
        updatedAt: new Date()
      }
    })
    return {
      task: updateTask,
      status: 200,
      message: 'Task has been updated!'
    }
  } catch (e) {
    return {
      status: 500,
      message: 'Something went wrong!'
    }
  }
}

// Boards

export async function getProjectBoards(projectId: number, limit?: number) {

  if (limit) {
    const boards = await db.teamProjectBoards.findMany({
      where: { projectId: projectId },
      orderBy: { id: 'desc' },
      include: { owner: { select: userSelect } },
      take: limit
    })
    return {
      boards,
      status: 200,
      message: 'Project boards'
    }
  }

  const boards: TeamProjectBoards[] = await db.teamProjectBoards.findMany({
    where: { projectId: projectId },
    orderBy: { id: 'desc' },
    include: { owner: true }
  })

  return {
    boards,
    status: 200,
    message: 'Project boards'
  }
}

export async function createBoard(projectId: number, ownerId: number, values: z.infer<typeof CreateProjectBoardSchema>) {

  const ownerIdN = Number(ownerId)
  const projectIdN = Number(projectId)

  const { title, description, backgroundColor, textColor } = values
  try {
    
    const createdBoard = await db.teamProjectBoards.create({
      data: {
        title,
        description,
        backgroundColor,
        textColor,
        ownerId: ownerIdN,
        projectId: projectIdN,
      }
    })
    
    return {
      board: createdBoard,
      status: 200,
      message: 'Board has been updated!'
    }
  } catch (e) {
    return {
      status: 500,
      message: 'Something went wrong!'
    }
  }
  
}

export async function updateBoard(boardId: number, values: z.infer<typeof UpdateProjectBoardSchema>) {

  const boardIdN = Number(boardId)

  const { title, description, backgroundColor, textColor } = values
  try {
    const updatedBoard = await db.teamProjectBoards.update({
      where: { id: boardIdN },
      data: {
        title,
        description,
        backgroundColor,
        textColor,
      }
    })
    return {
      board: updatedBoard,
      status: 200,
      message: 'Board has been updated!'
    }
  } catch (e) {
    console.log(e)
    return {
      status: 500,
      message: 'Something went wrong!'
    }
  }
  
}

export async function deleteBoard(boardId: number) {

  const boardIdN = Number(boardId)

  try {
    await db.teamProjectBoards.delete({ where: { id: boardIdN } })
    return {
      status: 200,
      message: 'Board has been deleted!'
    }
  } catch (e) {
    return {
      status: 500,
      message: 'Something went wrong!'
    }
  }
}


export async function createTaskRelpy(teamId: number, taskId: number, data: z.infer<typeof CreateTaskReply>) {
  const task = await db.teamProjectTasks.findUnique({ 
    where: { id: taskId }, 
    select: { 
      title: true, 
      user: { select: { id: true } } 
    } 
  })
  const current = await getCurrent();
  const newReply = await db.teamTaskReply.create({
    data: { 
      userId: current?.id as number,
      taskId,
      ...data
    }
  })
  await notify(`You have new message about task <b>${task?.title}</b> that says <b>${data.title}</b>`, route.viewTeamTask(teamId, taskId), task?.user?.id as number)
  revalidatePath(route.viewTeamTask(teamId, taskId))
  return newReply
}
import { Status } from "@prisma/client";

export const route = {
  dashboard: () => `/dashboard`,
  teams: () => `/dashboard/teams`,
  notifications: () => `/notifications`,
  joinedTeams: () => `/dashboard/joined-teams`,

  userProfile: (username: string) => `/profile/${username}`,
  sharedProfile: (username: string) => `/shared/${username}`,
  
  viewTeam: (teamId: number) => `/dashboard/teams/${teamId}`,
  viewTeamSettings: (teamId: number) => `/dashboard/teams/${teamId}/settings`,
  viewTeamMembers: (teamId: number) => `/dashboard/teams/${teamId}/members`,
  viewTeamBoards: (teamId: number) => `/dashboard/teams/${teamId}/boards`,
  viewTeamTasks: (teamId: number) => `/dashboard/teams/${teamId}/tasks`,
  viewTeamTask: (teamId: number, taskId: number) => `/dashboard/teams/${teamId}/tasks/${taskId}`,
  viewTeamMember: (teamId: number, memberId: number) => `/dashboard/teams/${teamId}/members/${memberId}`,
  viewTeamInvitations: (teamId: number) => `/dashboard/teams/${teamId}/invitations`,
  viewTeamProjects: (teamId: number) => `/dashboard/teams/${teamId}/projects`,
  viewTeamProject: (teamId: number, projectId: number) => `/dashboard/teams/${teamId}/projects/${projectId}`,
  viewTasksOfTeamProject: (teamId: number, projectId: number) => `/dashboard/teams/${teamId}/projects/${projectId}/tasks`,
  viewProjectTask: (teamId: number, projectId: number, taskId: number) => `/dashboard/teams/${teamId}/projects/${projectId}/tasks/${taskId}`,
  addTeamProject: (teamId: number) => `/dashboard/teams/${teamId}/projects/create`,
  addTasksToTeamProject: (teamId: number, projectId: number) => `/dashboard/teams/${teamId}/projects/${projectId}/tasks/add`,
  deleteTeam: (teamId: number) => `/dashboard/teams/${teamId}/delete`,
  viewTeamMailSystem: (teamId: number) => `/dashboard/teams/${teamId}/mail`,
  updateTeamProject: (teamId: number, projectId: number) => `/dashboard/teams/${teamId}/projects/${projectId}/update`,
  deleteTeamProject: (teamId: number, projectId: number) => `/dashboard/teams/${teamId}/projects/${projectId}/delete`,

  myInvitations: (status: Status = Status.Pending) => status === Status.Pending ? `/dashboard/invitations` : `/dashboard/invitations/${status.toLowerCase()}`,

  personalProjects: () => `/dashboard/projects`,
  viewPersonalProject: (projectId: number) => `/dashboard/projects/${projectId}`,
  updatePersonalProject: (projectId: number) => `/dashboard/projects/${projectId}/update`,
  deletePersonalProject: (projectId: number) => `/dashboard/projects/${projectId}/delete`,
  createPersonalProject: () => `/dashboard/projects/create`,

  personalTasks: () => `/dashboard/tasks`,
  viewPersonalTask: (taskId: number) => `/dashboard/tasks/${taskId}`,
  updatePersonalTask: (taskId: number) => `/dashboard/tasks/${taskId}/update`,
  deletePersonalTask: (taskId: number) => `/dashboard/tasks/${taskId}/delete`,

  account: (item?: string) => item ? `/account/${item}` : `/account`,

  assignedTasks: () => `/dashboard/assigned-tasks`,
  assignedTeamTasks: (teamId: number) => `/dashboard/assigned-tasks/teams/${teamId}`,
  assignedTeamTasksWithProject: (teamId: number, projectId: number) => `/dashboard/assigned-tasks/teams/${teamId}?projectId=${projectId}`,
  assignedTeamTasksWithProjectWithStatus: (teamId: number, projectId: number, status: Status) => `/dashboard/assigned-tasks/teams/${teamId}?projectId=${projectId}&status=${status}`,
}
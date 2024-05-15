import { Status } from "@prisma/client";

export const route = {
  dashboard: () => `/dashboard`,
  teams: () => `/dashboard/teams`,

  userProfile: (username: string) => `/profile/${username}`,
  
  notifications: () => `/notifications`,
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
  deleteTeam: (teamId: number) => `/dashboard/teams/${teamId}/delete`,
  viewTeamMailSystem: (teamId: number) => `/dashboard/teams/${teamId}/mail`,
  addTeamProject: (teamId: number) => `/dashboard/teams/${teamId}/projects/create`,
  updateTeamProject: (teamId: number, projectId: number) => `/dashboard/teams/${teamId}/projects/${projectId}/update`,
  deleteTeamProject: (teamId: number, projectId: number) => `/dashboard/teams/${teamId}/projects/${projectId}/delete`,
  addTasksToTeamProject: (teamId: number, projectId: number) => `/dashboard/teams/${teamId}/projects/${projectId}/tasks/add`,

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
  createPersonalTask: () => `/dashboard/tasks/create`,

  account: () => `/account`,
  accountTeams: () => `/account/teams`,
  accountTasks: () => `/account/tasks`,
  accountProjects: () => `/account/projects`,
  accountSettings: () => `/account/settings`,
  accountPictures: () => `/account/picture`,

  assignedTasks: () => `/dashboard/assigned-tasks`,
  assignedTeamTasks: (teamId: number) => `/dashboard/assigned-tasks/teams/${teamId}`,
  assignedTeamTasksWithProject: (teamId: number, projectId: number) => `/dashboard/assigned-tasks/teams/${teamId}?projectId=${projectId}`,
  assignedTeamTasksWithProjectWithStatus: (teamId: number, projectId: number, status: Status) => `/dashboard/assigned-tasks/teams/${teamId}?projectId=${projectId}&status=${status}`,
}
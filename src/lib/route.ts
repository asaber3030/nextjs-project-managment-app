export const route = {
  dashboard: () => `/dashboard`,
  teams: () => `/dashboard/teams`,
  viewTeam: (teamId: number) => `/dashboard/teams/${teamId}`,
  viewTeamProjects: (teamId: number) => `/dashboard/teams/${teamId}/projects`,
  addTeamProject: (teamId: number) => `/dashboard/teams/${teamId}/projects/create`,
  viewTeamProject: (teamId: number, projectId: number) => `/dashboard/teams/${teamId}/projects/${projectId}`,
  updateTeamProject: (teamId: number, projectId: number) => `/dashboard/teams/${teamId}/projects/${projectId}/update`,
  deleteTeamProject: (teamId: number, projectId: number) => `/dashboard/teams/${teamId}/projects/${projectId}/delete`,
  viewTasksOfTeamProject: (teamId: number, projectId: number) => `/dashboard/teams/${teamId}/projects/${projectId}/tasks`,
  addTasksToTeamProject: (teamId: number, projectId: number) => `/dashboard/teams/${teamId}/projects/${projectId}/tasks/add`,
  viewProjectTask: (teamId: number, projectId: number, taskId: number) => `/dashboard/teams/${teamId}/projects/${projectId}/tasks/${taskId}`,
}
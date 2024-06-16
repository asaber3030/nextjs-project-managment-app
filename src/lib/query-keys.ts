import { Status } from "@prisma/client";

export const QueryKeys = {
  
  globalTeamPermissions: (teamId: number, tag: string) => ['user', 'teams', teamId, 'global', 'permissions', tag],
  
  userByCode: (teamId: number, code: string) => ['user', teamId, code],
  userTeams: () => ['user', 'teams'],
  userNotifications: () => ['user', 'notifications'],
  
  team: (teamId: number) => ['user-item', 'teams', teamId],
  teamPermissions: (teamId: number) => ['user', 'teams', teamId, 'permissions'],
  teamInvitations: (teamId: number) => ['user', 'teams', teamId, 'invitationss'],
  teamMembers: (teamId: number) =>  ['user', 'teams', teamId, 'members'],
  teamMember: (teamId: number, memberId: number) =>  ['user', 'teams', teamId, 'members', memberId],
  teamMemberTasks: (teamId: number, memberId: number) =>  ['user', 'teams', teamId, 'members', memberId, 'tasks'],
  teamMemberBoards: (teamId: number, memberId: number) =>  ['user', 'teams', teamId, 'members', memberId, 'boards'],
  teamMemberTasksStatus: (teamId: number, memberId: number, status: Status) =>  ['user', 'teams', teamId, 'members', memberId, 'tasks', status],
  teamMemberTasksCompleted: (teamId: number, memberId: number) =>  ['user', 'teams', teamId, 'members', memberId, 'tasks', 'completed'],
  teamMemberTasksUnCompleted: (teamId: number, memberId: number) =>  ['user', 'teams', teamId, 'members', memberId, 'tasks', 'uncompleted'],
  teamProjects: (teamId: number) => ['user', 'teams', teamId, 'projects'],
  teamProject: (projectId: number) => ['user', 'teams', 'projects', projectId],
  teamProjectStats: (projectId: number) => ['user', 'teams', 'projects', projectId, 'stats'],
  teamProjectTasks: (teamId: number, projectId: number) => ['user', 'teams', teamId, 'projects', projectId, 'tasks'],
  teamProjectBoards: (teamId: number, projectId: number) => ['user', 'teams', teamId, 'projects', projectId, 'boards'],

  personalProjects: () => ['user', 'personal', 'projects'],
  personalProject: (projectId: number) => ['user', 'personal', 'projects', projectId],
  personalTasks: () => ['user', 'personal', 'tasks'],
  personalTask: (taskId: number) => ['user', 'personal', 'tasks', taskId],

  appPlans: () => ['app', 'plans'],
  appPlan: (planId: number) => ['app', 'plans', planId],
  
  accessPermission: (tag: string, roleName: string, teamId: number) => ['user', 'teams', teamId, 'permissions', tag, roleName],
  accountInvoices: (invoiceId: string) => ['account', 'invoices', invoiceId],
  accountSubscriptions: (subscriptionId: string) => ['account', 'subcriptions', subscriptionId],
}
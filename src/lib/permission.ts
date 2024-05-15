import { TeamRoles } from "@prisma/client"

export const RoleTags = {
  tasks: 'tasks',
  teams: 'teams',
  projects: 'projects',
  members: 'members',
  boards: 'boards'
}

export const PermissionsMutatorsArray = [TeamRoles.Admin, TeamRoles.Editor, TeamRoles.Member, TeamRoles.Owner]

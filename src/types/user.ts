import { Team as PTeam, TeamMember as PTeamMember, TeamInvite as PTeamInvite } from "@prisma/client"

export type Timestamps = {
  createdAt: Date,
  updatedAt: Date
}

export type User = Timestamps & {
  id: number,
  name: string,
  username: string,
  jobTitle: string,
  email: string,
  photo: string,
}

export type Team = PTeam & {
  owner: User,
  members: TeamMember[],
  invitations: TeamInvite[]
}

export type TeamInvite = PTeamInvite & {
  user: User,
  team: Team,
}

export type TeamMember = PTeamMember & {
  user: User,
  team: Team
}
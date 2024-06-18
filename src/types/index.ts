import { Status, Status as TaskStatus, TeamMemberStatus, TeamRoles } from '@prisma/client'

export type APIResponse = {
  message: string
  data?: unknown
  status: number
}

export type TTasksFilters = {
  user: string
  date: Date | null | undefined | string
  status: TaskStatus | string | undefined
}

export type User = {
  id: number
  username: string
  displayName: string | null
  phone: number | null
  city: string
  name: string
  email: string
  password?: string | null
  directCode: string
  photo: string
  jobTitle: string
  allowUsingDirectCode: boolean
  showPersonalProjects: boolean
  showPersonalCounts: boolean
  showPersonalTeams: boolean
  showJoinedTeams: boolean
  private: boolean
  showDetails: boolean
  bgCover: string | null
  planId: number
  plan: Plan
  createdAt: Date
  updatedAt: Date
}

export type Notification = {
  id: number
  title: string
  url: string
  icon: string
  isRead: boolean | null
  sentIn: Date
  userId: number
  user?: User
}

export type Team = {
  id: number
  name: string
  about: string | null
  ownerId: number
  
  owner?: User
  members?: TeamMember[]
  invitations?: TeamInvite[]

  teamProjects?: TeamProject[]

  createdAt: Date
  updatedAt: Date
}

export type TeamMember = {
  id: number
  teamId: number
  userId: number
  team: Team
  user: User
  role: TeamRoles
  status: TeamMemberStatus
  joinedIn: Date
}

export type TeamInvite = {
  id: number
  invitationRole: TeamRoles
  status: Status
  sentIn: Date
  teamId: number
  userId: number
  team?: Team
  user?: User
}

export type TeamProject = {
  id: number
  name: string
  description: string
  github: string | null
  url: string | null
  notes: string | null

  teamId: number
  team?: Team

  ownerId: number
  owner: User

  projectTasks?: TeamProjectTask[]
  projectBoards?: TeamProjectBoard[]

  createdAt: Date
  updatedAt: Date
}

export type TeamProjectTask = {
  id: number
  title: string
  description: string
  status: TaskStatus
  url?: string
  notes?: string
  userId: number
  projectId: number
  project: TeamProject
  user: User
  finishAt: Date
  createdAt: Date
  updatedAt: Date
}

export type TeamTaskReply = {
  id: number
  title: string
  description: string
  url: string | null

  taskId: number
  userId: number

  task?: TeamProjectTask
  user?: User

  createdAt: Date
  updatedAt: Date
}

export type TeamProjectBoard = {
  id: number
  title: string
  description: string
  backgroundColor: string
  textColor: string

  ownerId: number
  projectId: number

  owner: User
  project: TeamProject

  createdAt: Date
  updatedAt: Date
}

export type Plan = {
  id: number
  name: string

  paymentLink: string

  price: number
  oldPrice: number

  numberOfTeams: number
  numberOfProjectTeams: number
  numberOfTeamMembers: number
  numberOfBoards: number
  numberOfTasks: number

  numberOfPersonalProjects: number
  numberOfPersonalTasks: number
  numberOfPersonalBoards: number
  
  hasMailSystem: boolean
  hasAnalytics: boolean
  hasCharts: boolean
  canDirectAdd: boolean

  createdAt: Date
  updatedAt: Date

  features?: PlanFeature[]
}

export type PlanFeature = {
  id: number
  title: string
  available: boolean
  planId: number 
  plan?: Plan
}

export type TPermission = "global" | "team" | "team-project"

export type GlobalPermissionsType = {
  hasMailSystem: boolean
  hasAnalytics: boolean
  hasCharts: boolean
  canDirectAdd: boolean
  canCreateMorePersonalProjects: boolean
  canCreateMorePersonalTasks: boolean
  canCreateMorePersonalBoards: boolean
  canCreateMoreTeams: boolean
}

export type TeamPermissionsType = {
  canCreateMoreTeamProjects: boolean
  canAddMoreTeamMembers: boolean
}

export type TeamProjectPermissionsType = {
  canCreateMoreBoards: boolean
  canCreateMoreTasks: boolean
}

export type Permission = {
  id: number
  name: string
  tag: string
  displayName: string
  teamPermissions: TeamPermission[]
}

export type TeamPermission = {
  id: number
  whoCanDo: TeamRoles
  teamId: number
  permissionId: number
  permission?: Permission
}

export type Project = {
  id: number
  name: string
  description: string
  github: string | null
  url: string | null
  notes: string | null
  
  ownerId: number
  owner?: User | null

  createdAt: Date
  updatedAt: Date
}

export type ProjectFile = {
  id: number
  name: string
  description: string
  url: string
  
  ownerId: number
  owner: User | null

  projectId: number
  project: Project | null

  createdAt: Date
  updatedAt: Date
}

export type Task = {
  id: number
  title: string
  description: string
  url: string | null
  notes: string | null
  status: any
  
  ownerId: number
  owner?: User | null

  finishAt: Date
  createdAt: Date
  updatedAt: Date
}

export type Subscription = {
  id: number
  planId: number
  userId: number
  subTotal: number
  total: number
  currency: string
  email: string
  status: string
  customerId: string
  invoiceId: string
  subscriptionId: string

  user?: User
  plan: Plan
  
  expiresAt: bigint
  createdAt: Date
}
import NextAuth from "next-auth"

declare module "next-auth" {

  interface User {
    id: number
    username: string
    displayName: string | null
    phone: number | null
    city: number | null
    name: string
    email: string
    password?: string
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
    provider: string
    bgCover: string | null
    planId: number
    plan: Plan
    createdAt: Date
    updatedAt: Date
  }
  
  interface Session {
    user: {
      id: number
      username: string
      displayName: string | null
      phone: number | null
      city: number | null
      name: string
      email: string
      password?: string
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
      planId: number
      plan: Plan
      bgCover: string | null
      provider: string
      createdAt: Date
      updatedAt: Date
    }
    token: {
      id: number
      username: string
      displayName: string | null
      phone: number | null
      city: number | null
      name: string
      email: string
      password?: string
      directCode: string
      photo: string
      provider: string
      jobTitle: string
      showPersonalProjects: boolean
      showPersonalCounts: boolean
      allowUsingDirectCode: boolean
      showPersonalTeams: boolean
      showDetails: boolean
      showJoinedTeams: boolean
      private: boolean
      planId: number
      plan: Plan
      bgCover: string | null
      createdAt: Date
      updatedAt: Date
    }
  }
}
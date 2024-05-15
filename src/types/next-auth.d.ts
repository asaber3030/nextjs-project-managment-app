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
    private: boolean
    showDetails: boolean
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
      private: boolean
      showDetails: boolean
      planId: number
      plan: Plan
      bgCover: string | null
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
      jobTitle: string
      allowUsingDirectCode: boolean
      private: boolean
      showDetails: boolean
      planId: number
      plan: Plan
      bgCover: string | null
      createdAt: Date
      updatedAt: Date
    }
  }
}
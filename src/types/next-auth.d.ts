import NextAuth from "next-auth"

declare module "next-auth" {

  interface User {
    id: number,
    username: string,
    email: string,
    photo: string,
    jobTitle: string,
    createdAt: Date,
    updatedAt: Date
  }
  
  interface Session {
    user: User & {
      id: number,
      username: string,
      jobTitle: string,
      email: string,
      photo: string,
      createdAt: Date,
      updatedAt: Date
    }
    token: {
      id: number,
      username: string,
      jobTitle: string,
      email: string,
      photo: string,
      createdAt: Date,
      updatedAt: Date
    }
  }
}
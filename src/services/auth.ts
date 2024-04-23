import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import db from './prisma';

import bcrypt from 'bcrypt'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login'
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@domain.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {

        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await db.user.findUnique({ where: { email: credentials.email } })
        if (!user) return null;

        const comparePassword = await bcrypt.compare(credentials.password, user.password)
        if (!comparePassword) return null

        return {
          id: user.id,
          username: user.username,
          email: user.email,
          jobTitle: user.jobTitle,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          photo: user.photo
        }
      }
    })
  ],
  callbacks: {
    async redirect({ baseUrl }) {
      return `${baseUrl}/home` 
    },
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          username: user.username,
          email: user.email,
          photo: user.photo,
          jobTitle: user.jobTitle,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...token
        }
      }
    }
  },
    
}
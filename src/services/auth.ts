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
      //@ts-ignore
      async authorize(credentials) {

        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await db.user.findUnique({ 
          where: { email: credentials.email }, 
          include: { plan: true } 
        })

        if (!user) return null;

        const updateProvider = await db.user.update({ 
          where: { id: user.id }, 
          data: { provider: String(user.id) },
          include: { plan: true } 
        })

        const comparePassword = await bcrypt.compare(credentials.password, user.password)
        if (!comparePassword) return null

        const { password, ...remainingUser } = updateProvider

        return {
          ...remainingUser
        }
      }
    })
  ],
  callbacks: {
    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`
    },

    async jwt({ trigger, session, token, user }) {

      if (trigger === "update") {
        if (session?.displayName) token.displayName = session.displayName
        if (session?.username) token.username = session.username
        if (session?.phone) token.phone = session.phone
        if (session?.city) token.city = session.city
        if (session?.name) token.name = session.name
        if (session?.email) token.email = session.email
        if (session?.photo) token.photo = session.photo
        if (session?.bgCover) token.bgCover = session.bgCover
        if (session?.jobTitle) token.jobTitle = session.jobTitle
        if (session?.allowUsingDirectCode) token.allowUsingDirectCode = session.allowUsingDirectCode
        if (session?.private) token.private = session.private
      }

      if (trigger === 'update' && session?.showDetails) {
        token.showDetails = session.showDetails
      }
      
      if (user) {
        return {
          ...token,
          ...user
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
        }
      }
    }
  },
    
}
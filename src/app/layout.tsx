import { ReactQueryClientProvider } from '@/providers/react-query'
import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { cn } from '@/lib/utils'
import { authOptions } from '@/services/auth'
import { getServerSession } from 'next-auth'
import { getNotifications } from '@/actions/user-data'

import { Toaster } from "@/components/ui/sonner"
import { Navbar } from './_components/app/navbar/navbar'

import { NextAuthProvider } from '@/providers/next-auth'
import { UserDataProvider } from '@/providers/user-data-provider'
import { NotificationsProvider } from '@/providers/notifications'
import { User } from '@/types'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Platform',
  description: 'Platform is created to help teams share informations, add tasks asto team members.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  const session = await getServerSession(authOptions)
  const user = session?.user as unknown as User

  const notifications = await getNotifications()

  return (
    <ReactQueryClientProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body className={cn(inter.className, 'bg-gray-50')}>
          <Toaster />
          <NextAuthProvider>
            <UserDataProvider value={user}>
              <NotificationsProvider value={notifications}>
                <Navbar />
                {children}
              </NotificationsProvider>
            </UserDataProvider>
          </NextAuthProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
  )
}

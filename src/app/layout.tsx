import { ReactQueryClientProvider } from "@/providers/react-query"
import "./globals.css"

import type { Metadata } from "next"
import { User } from "@/types"
import { Inter } from "next/font/google"

import { cn } from "@/lib/utils"
import { authOptions } from "@/services/auth"
import { getServerSession } from "next-auth"
import { getNotifications } from "@/actions/user-data"
import { getPlans } from "@/actions/app"

import { Toaster } from "@/components/ui/sonner"
import { Navbar } from "./_components/app/navbar/navbar"

import { PlansProvider } from "@/providers/plans"
import { NextAuthProvider } from "@/providers/next-auth"
import { UserDataProvider } from "@/providers/user-data-provider"
import { NotificationsProvider } from "@/providers/notifications"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Platform",
  description: "Platform is created to help teams share informations, add tasks asto team members.",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  const user = session?.user as unknown as User

  const notifications = await getNotifications()
  const plans = await getPlans()

  return (
    <ReactQueryClientProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body className={cn(inter.className, "bg-gray-50")}>
          <Toaster />
          <NextAuthProvider>
            <PlansProvider value={plans}>
              <UserDataProvider value={user}>
                <NotificationsProvider value={notifications}>
                  <Navbar />
                  {children}
                </NotificationsProvider>
              </UserDataProvider>
            </PlansProvider>
          </NextAuthProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
  )
}

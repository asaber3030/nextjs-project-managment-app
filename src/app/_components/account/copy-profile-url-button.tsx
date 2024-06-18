"use client"

import { ClassValue } from "clsx"
import { Clipboard } from "lucide-react"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"
import { appURL } from "@/lib/constants"
import { route } from "@/lib/route"
import { toast } from "sonner"

type Props = {
  username: string
  className?: ClassValue
}

export const CopyProfileURL = ({ username, className }: Props) => {

  const handleCopyProfileURL = () => {
    window.navigator.clipboard.writeText(appURL + route.sharedProfile(username)).then(() => {
      toast.success("Profile URL has been copied.")
    })
  }

  return ( 
    <Button onClick={handleCopyProfileURL} variant='outline' className={cn('w-full flex-1 text-xs', className)}><Clipboard className='size-4 text-gray-400' /> Copy Profile URL</Button>
  )
}
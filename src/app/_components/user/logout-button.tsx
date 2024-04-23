"use client";

import { cn } from "@/lib/utils";

import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "@/components/ui/button";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LogoutButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
}

export const LogoutButton = ({ variant, size, className, ...props }: LogoutButtonProps) => {
  const router = useRouter()
  return (
    <Button onClick={() => signOut({
      redirect: false,
    }).then(() => router.push('/login'))} {...props} className={cn(buttonVariants({ variant, size, className }))}>
      {props.children}
    </Button>
  )
}
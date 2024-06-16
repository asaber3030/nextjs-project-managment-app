"use client";

import Link from "next/link";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { signIn, useSession } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from "@/schema/user";

import { LogIn } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/loading-button";

export const LoginForm = () => {

  const [loading, setLoading] = useState(false)


  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      'email': '',
      'password': ''
    }
  })

  const handleRegister = async () => {
    setLoading(true)
    const data = await signIn('credentials', {
      email: form.getValues('email'),
      password: form.getValues('password')
    }).finally(() => {
      setLoading(false)
    })
  }

  return ( 
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleRegister)} className='space-y-4'>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail Address</FormLabel>
                <FormControl>
                  <Input placeholder="example@domain.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder="Your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-between'>
            <Link href='/register' className='text-sm text-blue-800 hover:underline'>Don&apos;t have an account?</Link>
            <Link href='/register' className='text-sm text-blue-800 hover:underline'>Forgot password?</Link>
          </div>
          <LoadingButton loading={loading} variant='secondaryMain' size='sm'><LogIn className='size-4' /> Sign In</LoadingButton>
        </form>
      </Form>
    </div>
  );
}
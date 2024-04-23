"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'

import { LoginSchema } from "@/schema/user";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/loading-button";

import { signIn } from 'next-auth/react'

export const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      'email': 'a@a.com',
      'password': '0552320541',
    }
  })

  const handleRegister = async () => {
    const data = await signIn('credentials', {
      email: form.getValues('email'),
      password: form.getValues('password')
    })
    console.log(data)
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

          <LoadingButton>
            Sign in
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
}
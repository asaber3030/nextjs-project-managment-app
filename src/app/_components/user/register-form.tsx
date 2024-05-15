"use client";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'

import { RegisterSchema } from "@/schema/user";
import { LoadingButton } from "@/components/loading-button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { registerAction } from "@/actions/auth";
import { toast } from 'sonner'
import { APIResponse } from "@/types";
import { UserPlus } from "lucide-react";

export const RegisterForm = () => {

  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      'name': 'Abdulrahman',
      'password': '0552320541',
      'jobTitle': 'Full Stack Web Developer',
      'username': 'abdo',
      'email': 'a@a.com'
    }
  })

  const registerMutation = useMutation({
    mutationFn: (values: z.infer<typeof RegisterSchema>) => registerAction(values),
    onSuccess: (data: APIResponse) => {
      if (data?.status === 201) {
        toast.message("User registered successfully!")
        router.push('/login')
        return
      }
      toast.message(data.message)
    },
    onError: (err) => {
    }
  })

  const handleRegister = () => {
    registerMutation.mutate(form.getValues())
  }

  return ( 
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleRegister)} className='space-y-4'>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="eg. Amazon" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="asaber3030" {...field} />
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
                  <Input type='password' placeholder="Strong Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="Sales Manager" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <LoadingButton loading={registerMutation.isPending} variant='secondaryMain' size='sm'><UserPlus className='size-4' /> Create Account</LoadingButton>

        </form>
      </Form>
    </div>
  );
}
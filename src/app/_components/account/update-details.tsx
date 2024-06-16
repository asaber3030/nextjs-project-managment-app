"use client"

import { useForm } from "react-hook-form"
import { useContext } from "react"
import { useSession } from "next-auth/react"
import { useMutation } from "@tanstack/react-query"

import { Save } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/loading-button"

import { UserDetailsSchema } from "@/schema/user"
import { UserDataContext } from "@/providers/user-data-provider"

import { toast } from "sonner"
import { updateDetails } from "@/actions/user-data"
import { zodResolver } from '@hookform/resolvers/zod'

export const UpdateAccountDetails = () => {

  const user = useContext(UserDataContext)

  const { update } = useSession()

  const form = useForm({
    resolver: zodResolver(UserDetailsSchema),
    defaultValues: {
      username: user?.username as string,
      displayName: user?.displayName as string,
      email: user?.email as string,
      jobTitle: user?.jobTitle as string,
      phone: user?.phone as number,
      city: user?.city,
    }
  })

  const mutation = useMutation({
    mutationFn: () => updateDetails(form.getValues()),
    onSuccess: (data) => {
      toast.message(data.message)
      update({
        ...form.getValues()
      })
    }
  })

  const handleUpdate = () => {
    mutation.mutate()
  }
  
  return ( 
    <div className='mt-4'>
      <Form {...form}>

        <form onSubmit={form.handleSubmit(handleUpdate)} className='space-y-4'>

          <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Abdulrahman Saber" {...field} />
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
                    <Input placeholder="asaber" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job title</FormLabel>
                <FormControl>
                  <Input placeholder="Full Stack" {...field} />
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
                  <Input placeholder="E-mail Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="011 1111 1111" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Cairo, Egypt" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className='flex justify-end'>
            <LoadingButton loading={mutation.isPending} variant='secondaryMain'><Save className="size-4"/> Update</LoadingButton>
          </div>

        </form>

      </Form>

    </div>
  )
}
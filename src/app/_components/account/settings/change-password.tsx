"use client"

import { useForm } from "react-hook-form"
import { useUpdateUser } from "@/hooks/useUser"

import { Save } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/loading-button"

import { zodResolver } from '@hookform/resolvers/zod'
import { ChangePasswordSchema } from "@/schema"

type Props = {}

export const ChangePassword = ({  }: Props) => {

  const form = useForm({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      newPassword: '',
      currentPassword: '',
      confirmPassword: ''
    }
  })

  const { mutateChangePassword, changePasswordLoading } = useUpdateUser()

  const handleChangePassword = () => {
    mutateChangePassword({
      data: form.getValues()
    })
  }

  return ( 
    <div className='mt-4'>

      <Form {...form}>

        <h2 className='text-lg mb-4 font-medium border-b rounded-md'>Change Password</h2>

        <form onSubmit={form.handleSubmit(handleChangePassword)} className='space-y-4'>

          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder="**** ****" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder="**** ****" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder="**** ****" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex justify-end'>
            <LoadingButton loading={changePasswordLoading} variant='secondaryMain'><Save className="size-4"/> Change Password</LoadingButton>
          </div>

        </form>

      </Form>
    </div>
  )
}
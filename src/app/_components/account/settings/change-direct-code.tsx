"use client";

import { useForm } from "react-hook-form";
import { useUpdateUser } from "@/hooks/useUser";
import { useState } from "react";

import { Save } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"

import { ChangeDirectCodeSchema } from "@/schema";
import { zodResolver } from '@hookform/resolvers/zod'
import { generateText } from "@/lib/utils";

export const ChangeDirectCode = () => {

  const [show, setShow] = useState(false)

  const form = useForm({
    resolver: zodResolver(ChangeDirectCodeSchema),
    defaultValues: {
      directCode: ''
    }
  })

  const { directCode, mutateChangeDirectCode, changeDirectCodeLoading } = useUpdateUser()

  const handleGenerateCode = () => {
    form.setValue('directCode', generateText(8))
  }

  const handleChangeDirectCode = () => {
    mutateChangeDirectCode({
      data: form.getValues()
    })
  }

  return ( 
    <div className='mt-4'>

      <Form {...form}>

        <h2 className='text-lg mb-4 font-medium border-b rounded-md'>Direct Add Code</h2>

        <form onSubmit={form.handleSubmit(handleChangeDirectCode)} className='space-y-4'>

          <FormField
            control={form.control}
            name="directCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input placeholder="Unique Code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {show && (
            <div className='w-fit bg-blue-400 p-2 px-4 rounded-md font-medium border text-sm'>{directCode}</div>
          )}

          <div className='flex gap-2 justify-end'>
            <Button type='button' variant='link' onClick={() => setShow(!show)}>Show Code</Button>
            <Button type='button' variant='link' onClick={handleGenerateCode}>Generate Code</Button>
            <LoadingButton type='submit' loading={changeDirectCodeLoading} variant='secondaryMain'><Save className="size-4"/> Save</LoadingButton>
          </div>

        </form>

      </Form>

    </div>
  );
}
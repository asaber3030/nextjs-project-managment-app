"use client";

import Image from "next/image";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { usePlans } from "@/hooks/usePlans";

import { ArrowLeft, ArrowRight, UserPlus } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertTitle } from "@/components/ui/alert";
import { LoadingSpinner } from "@/components/loading-spinner";
import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { OnePlan } from "../app/one-plan";

import { z } from "zod";
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerAction } from "@/actions/auth"
;
import { RegisterSchema } from "@/schema/user";
import { Plan } from "@/types";

import { cn, formatNumber } from "@/lib/utils";
import { avatarsPhotos } from "@/lib/lists";

export const RegisterForm = ({ plan }: { plan: Plan }) => {

  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: 'Abdulrahman',
      password: '0552320541',
      jobTitle: 'Full Stack Web Developer',
      username: 'abdo',
      email: 'a@a.com',
      photo: '',
    }
  })

  const { plans, isPlansLoading } = usePlans()

  const [tab, setTab] = useState('account')
  const [activePlan, setPlan] = useState('1')
  const [planObject, setPlanObject] = useState<Plan | undefined>(plan)
  const [selectedPhoto, setSelectedPhoto] = useState(avatarsPhotos[0])

  const [registrationDone, setRegisterStatus] = useState(false)

  const registerMutation = useMutation({
    mutationFn: (values: z.infer<typeof RegisterSchema>) => registerAction(values),
    onSuccess: (data) => {
      if (data?.status === 201) {
        setRegisterStatus(true)
        toast.message("User registered successfully.")
        //router.push('/login')
        return
      } else {
        setRegisterStatus(false)
      }
      toast.message(data.message)
    }
  })

  const handleActiveTab = (tab: string) => {
    setTab(tab)
  }

  const handleActivePlan = (activePlan: string) => {
    setPlan(activePlan)
  }

  const handleRegister = () => {
    form.setValue('photo', selectedPhoto)
    registerMutation.mutate(form.getValues())
    if (form.formState.isValid) {
      setTab('pay')
    }
  }

  useEffect(() => {
    setPlanObject(plans?.[0])
  }, [plans])

  useEffect(() => {
    setPlanObject(plans?.find(p => p?.id === Number(activePlan)))
  }, [activePlan, plans])

  return ( 
    <div className='xl:w-[60%] mx-auto my-10'>

      <div className='my-4'>
        <h1 className='text-3xl font-semibold'>Create an account with <span className='font-normal text-secondaryMain'>P</span>latform.</h1>
        <p>Easy to create, pay, and start connecting to your team.</p>
      </div>

      <Tabs value={tab} className='w-full'>

        <TabsList className='w-full bg-gray-200'>
          <TabsTrigger onClick={() => setTab('account')} className='w-full' value="account">Account Details</TabsTrigger>
          <TabsTrigger onClick={() => setTab('payment')} className='w-full' value="payment">Select Plan</TabsTrigger>
          <TabsTrigger onClick={() => setTab('complete')} className='w-full' value="complete">Payment Details</TabsTrigger>
          <TabsTrigger onClick={() => setTab('pay')} className='w-full' value="pay">Pay & Sign In</TabsTrigger>
        </TabsList>

        <Form {...form}>
          
          <form onSubmit={form.handleSubmit(handleRegister)} className='space-y-4'>

            <TabsContent value="account" className='grid gap-4'>

              <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
                
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
              </div>

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

              <div>
                <FormLabel>Choose an avatar (You can change it later)</FormLabel>
                <div className='flex gap-1 mt-2'>
                  {avatarsPhotos.map((image, idx) => (
                    <Image 
                      src={image} 
                      alt='Avatar' 
                      width={45} 
                      height={45} 
                      key={`avatar-image-${idx}`}
                      className={cn('rounded-full transition-all border-2 border-transparent',selectedPhoto === image && 'border-green-500')}
                      onClick={() => setSelectedPhoto(image)}
                    />
                  ))}
                </div>
              </div>

              <Button disabled={!form.formState.isValid} className='mt-4 w-fit' type='button' size='sm' variant='secondaryMain' onClick={() => handleActiveTab('payment')}><ArrowRight className='size-4' /> Next</Button>

            </TabsContent>

            <TabsContent value="payment">

              {isPlansLoading ? (
                <LoadingSpinner />
              ): (
                <div className='grid grid-cols-1 xl:grid-cols-3 gap-4 mt-10'>
                  {plans.map((plan, idx) => (
                    <div key={`plan-select-${plan.id}`} onClick={() => handleActivePlan(String(plan.id))}>
                      <OnePlan key={`plan-listed-${plan.id}`} showButtons={false} plan={plan} idx={idx} className={cn('transition-all rounded-xl border-2', Number(activePlan) == plan.id && 'border-2 border-green-500')} />
                    </div>
                  ))}
                </div>
              )}

              <div className='flex gap-1 mt-4'>
                <Button type='button' size='sm' variant='secondaryMain' onClick={() => setTab('account')}><ArrowLeft className='size-4' /> Previous</Button>
                <Button type='button' size='sm' variant='secondaryMain' onClick={() => setTab('complete')}>Payment Details</Button>
              </div>

            </TabsContent>

            <TabsContent value="complete">
             
              <div className='grid grid-cols-1 xl:grid-cols-2 gap-4'>
                
                <div className="p-4 bg-white rounded-md shadow-sm border mb-4">
                  
                  <h3 className='text-2xl justify-center text-center font-semibold flex gap-2 items-center'><span>Selected plan</span> <ArrowRight className='size-4' /> <span className='text-green-600'>{planObject?.name}</span></h3>
                 
                  <ul>
                    <li className='py-2 flex items-center justify-between'><span>Plan ID</span> <span className='font-medium'>{planObject?.id}</span></li>
                    <li className='py-2 flex items-center justify-between'><span>Plan Name</span> <span className='font-medium'>{planObject?.name}</span></li>
                    <li className='py-2 flex items-center justify-between'><span>Subscription Duration</span> <span className='font-medium'>1 yr</span></li>
                    <li className='py-2 flex items-center justify-between'><span>Sub Total</span> <span className='font-medium text-green-600'>{formatNumber(planObject?.price as number)} USD</span></li>
                    <li className='py-2 flex items-center justify-between'><span>Total price</span> <span className='font-medium text-green-600'>{formatNumber(planObject?.price as number)} USD</span></li>
                  </ul>

                </div>

              </div>
              
              <LoadingButton type='submit' loading={registerMutation.isPending} variant='success' size='sm'><UserPlus className='size-4' /> Create & Continue</LoadingButton>

            </TabsContent>

            <TabsContent value="pay">
              {registerMutation.isPending ? (
                <LoadingSpinner />
              ): (
                <React.Fragment>
                  {form.formState.isValid && registrationDone ? (
                    <a target='_blank' href={`${planObject?.paymentLink}?prefilled_email=${form.getValues('email')}`} className='block w-full'><Button type='button' className='w-full hover:bg-border shadow-sm border' variant='secondary'>Click here to complete your payment.</Button></a>
                  ): (
                    <Alert>
                      <AlertTitle>Something is not going alright in your information check it please.</AlertTitle>
                    </Alert>
                  )}
                </React.Fragment>
              )}
            </TabsContent>

          </form>

        </Form>

      </Tabs>

    </div>
  );
}
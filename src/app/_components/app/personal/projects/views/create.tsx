"use client";

import React from "react";

import { useForm } from "react-hook-form";
import { useGP } from "@/hooks/usePermissions";
import { usePersonalProject } from "@/hooks/usePersonal";

import { FolderPlus } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoadingButton } from "@/components/loading-button";
import { Title } from "@/components/title";
import { UpgradePlanAlert } from "@/components/upgrade-plan-alert";

import { PersonalProjectSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const CreatePersonalProjectView = () => {

  const permission = useGP()

  const form = useForm({
    resolver: zodResolver(PersonalProjectSchema),
    defaultValues: {
      name: '',
      description: '',
      github: '',
      url: '',
      notes: ''
    }
  })

  const { createMutate, createPending } = usePersonalProject()

  const handleCreate = () => {
    createMutate({ data: form.getValues() })
  }

  return ( 
    <div>

      <Title label="Create Personal Project" parentClassName="mb-4" />

      <section>

        <Form {...form}>

          <form onSubmit={form.handleSubmit(handleCreate)}>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="E-Commerce" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-4 my-4'>
              <FormField
                control={form.control}
                name="github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Github Repo? (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="http://www.domain.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project URL? (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="http://www.domain.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid grid-cols-1 xl:grid-cols-2 gap-4 my-4'>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="This is SaaS project" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes? (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Some notes?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <React.Fragment>
              {permission.canCreateMorePersonalProjects ? (
                <LoadingButton variant='outlineMain' className='hover:text-white' size='sm' loading={createPending}>
                  <FolderPlus className='size-4' />
                  Create project
                </LoadingButton>
              ): (
                <UpgradePlanAlert label="You have reached the limits of projects. Upgrade your plan for more projects." />
              )}
            </React.Fragment>
          
          </form>

        </Form>

      </section>

    </div>
  );
}
"use client";

import React from "react";

import { useForm } from "react-hook-form";
import { usePersonalProject } from "@/hooks/usePersonal";

import { Edit2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoadingButton } from "@/components/loading-button";
import { Title } from "@/components/title";

import { PersonalProjectSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Project } from "@/types";

export const UpdatePersonalProjectView = ({ project }: { project: Project }) => {

  const form = useForm({
    resolver: zodResolver(PersonalProjectSchema),
    defaultValues: {
      name: project.name,
      description: project.description,
      github: project.github,
      url: project.url,
      notes: project.notes,
    }
  })

  const { updateMutate, updatePending } = usePersonalProject()

  const handleCreate = () => {
    updateMutate({ data: form.getValues(), projectId: project.id })
  }

  return ( 
    <div>

      <Title label={`Update Personal Project - ${project.name}`} parentClassName="mb-4" />

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

            <LoadingButton variant='outlineMain' className='hover:text-white' size='sm' loading={updatePending}>
              <Edit2 className='size-4' />
              Update project
            </LoadingButton>

          </form>

        </Form>

      </section>

    </div>
  );
}
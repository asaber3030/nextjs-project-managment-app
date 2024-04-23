"use client";

import Link from "next/link";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { FolderPlus, Plus } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoadingButton } from "@/components/loading-button";
import { TeamHeaderSection } from "../../team-section-header";

import { Team } from "@/types/user";
import { TeamProject } from "@prisma/client";
import { CreateProjectSchema } from "@/schema";
import { createTeamProject, updateTeamProject } from "@/actions/team";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { QueryKeys } from "@/lib/query-keys";

type Props = {project: TeamProject }

export const UpdateProjectView = ({ project }: Props) => {

  const { data } = useSession();
  const { push } = useRouter()
  const { invalidateQueries } = useQueryClient()

  const form = useForm({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      name: project.name,
      description: project.description,
      github: project.github as string,
      url: project.url as string,
      notes: project.notes as string
    }
  })

  const updateMutation = useMutation({
    mutationFn: () => updateTeamProject(project.id, data?.user.id as number, form.getValues()),
    onSuccess: (data) => {
      toast.message(data.message)
      if (data.status === 201) {
        form.reset()
        push(`/dashboard/teams/${project.teamId}`)
        invalidateQueries({ queryKey: QueryKeys.teamProjects(project.teamId) })
      }
    }
  })

  const handleUpdate = () => {
    updateMutation.mutate()
  }

  return ( 
    <div>

      <TeamHeaderSection icon={Plus} label={`Update project - ${project.name}`} />

      <section>

        <Form {...form}>

          <form onSubmit={form.handleSubmit(handleUpdate)}>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input defaultValue={project.name} placeholder="E-Commerce" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='xl:grid xl:grid-cols-2 gap-2 my-4'>
              <FormField
                control={form.control}
                name="github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Github Repo? (Optional)</FormLabel>
                    <FormControl>
                      <Input defaultValue={project.github as string} placeholder="http://www.domain.com" {...field} />
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
                      <Input defaultValue={project.url as string} placeholder="http://www.domain.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='xl:grid xl:grid-cols-2 gap-2 my-4'>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea defaultValue={project.description} placeholder="This is SaaS project" {...field} />
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
                      <Textarea defaultValue={project.notes as string} placeholder="Some notes?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <LoadingButton variant='main' className='hover:text-white' size='sm' loading={updateMutation.isPending}>
              <FolderPlus className='size-4' />
              Update project
            </LoadingButton>

          </form>

        </Form>

      </section>

    </div>
  );
}
"use client";

import React from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTP } from "@/hooks/usePermissions";
import { useRole } from "@/hooks/useRoles";
import { useUser } from "@/hooks";

import { FolderPlus, Plus } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoadingButton } from "@/components/loading-button";
import { TeamHeaderSection } from "../../teams/team-section-header";
import { UpgradePlanAlert } from "@/components/upgrade-plan-alert";
import { NoPermissionAlert } from "@/components/no-permissions-alert";

import { Team } from "@/types";
import { QueryKeys } from "@/lib/query-keys";
import { CreateProjectSchema } from "@/schema";

import { createTeamProject } from "@/actions/team";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

type Props = { team: Team }

export const CreateProjectView = ({ team }: Props) => {

  const { data } = useSession();
  const { push } = useRouter()
  const { invalidateQueries } = useQueryClient()

  const permission = useTP()

  const user = useUser()
  const roleCreateProject = useRole('projects', 'add-projects', team.id)

  const form = useForm({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      name: '',
      description: '',
      github: '',
      url: '',
      notes: ''
    }
  })

  const createMutation = useMutation({
    mutationFn: () => createTeamProject(data?.user?.id as number, team.id, form.getValues()),
    onSuccess: (data) => {
      toast.message(data.message)
      if (data.status === 201) {
        form.reset()
        push(`/dashboard/teams/${team.id}`)
        invalidateQueries({ queryKey: QueryKeys.teamProjects(team.id) })
      }
    }
  })

  const handleCreate = () => {
    createMutation.mutate()
  }

  return ( 
    <div>
      <TeamHeaderSection icon={Plus} label="Create New project" />

      <section>

        <Form {...form}>

          <form onSubmit={form.handleSubmit(handleCreate)}>
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem className='mb-4'>
                  <FormLabel>Team</FormLabel>
                  <FormControl>
                    <Input disabled placeholder={`${team.name}`} />
                  </FormControl>
                </FormItem>
              )}
            />

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

            {(roleCreateProject.access || user?.id === team.ownerId) ? (
              <React.Fragment>
                {permission.canCreateMoreTeamProjects ? (
                  <LoadingButton variant='outlineMain' className='hover:text-white' size='sm' loading={createMutation.isPending}>
                    <FolderPlus className='size-4' />
                    Create project
                  </LoadingButton>
                ): (
                  <UpgradePlanAlert label="You have reached the limits of project in current team. Upgrade your plan for more projects." />
                )}
              </React.Fragment>
            ): (
              <NoPermissionAlert actionName='Create project' />
            )}
          </form>

        </Form>

      </section>

    </div>
  );
}
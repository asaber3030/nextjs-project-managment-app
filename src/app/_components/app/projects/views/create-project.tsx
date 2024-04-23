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
import { CreateProjectSchema } from "@/schema";
import { createTeamProject } from "@/actions/team";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { QueryKeys } from "@/lib/query-keys";

type Props = { team: Team }

export const CreateProjectView = ({ team }: Props) => {

  const { data } = useSession();
  const { push } = useRouter()
  const { invalidateQueries } = useQueryClient()

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
      <TeamHeaderSection icon={Plus} label="Create New project">
        <Link href={`/dashboard/teams/${team.id}`} className='text-secondaryMain hover:underline'>{team.name}</Link>
      </TeamHeaderSection>

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
            <div className='xl:grid xl:grid-cols-2 gap-2 my-4'>
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

            <div className='xl:grid xl:grid-cols-2 gap-2 my-4'>
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

            <LoadingButton variant='outlineMain' className='hover:text-white' size='sm' loading={createMutation.isPending}>
              <FolderPlus className='size-4' />
              Create project
            </LoadingButton>

          </form>

        </Form>

      </section>

    </div>
  );
}
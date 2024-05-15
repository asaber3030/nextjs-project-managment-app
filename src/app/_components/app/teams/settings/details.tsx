"use client";

import { useTeam } from "@/hooks/useTeams";
import { useForm } from "react-hook-form";
import { useRole } from "@/hooks/useRoles";
import { useUser } from "@/hooks";

import { UpdateTeamSchema } from "@/schema";
import { Team } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";

import { Save } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Title } from "@/components/title";
import { LoadingButton } from "@/components/loading-button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea";

type Props = {
  team: Team
}

export const TeamDetails = ({ team }: Props) => {

  const form = useForm({
    resolver: zodResolver(UpdateTeamSchema),
    defaultValues: {
      name: team.name,
      about: team.about as string
    }
  })

  const roleUpdateTeamSettings = useRole('teams', 'update-team-settings', team.id)
  const user = useUser()

  const { updateTeamMutate, updateTeamLoading } = useTeam(team.id)

  const handleUpdate = () => {
    updateTeamMutate({ teamId: team.id, values: form.getValues() })
  }

  return ( 
    <div>
      <Title label="Update Team Details" parentClassName='mb-4' />

      <Form {...form}>

        <form onSubmit={form.handleSubmit(handleUpdate)} className='space-y-4'>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team Name / Title</FormLabel>
                <FormControl>
                  <Input placeholder="example@domain.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Brief (optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="About team" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {(user?.id === team.ownerId || roleUpdateTeamSettings.access) && (
            <LoadingButton size='sm' loading={updateTeamLoading} variant='secondaryMain'><Save className='size-4' /> Save Details</LoadingButton>
          )}
        </form>

      </Form>

    </div>
  );
}
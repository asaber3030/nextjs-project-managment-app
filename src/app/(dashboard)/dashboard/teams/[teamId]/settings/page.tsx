import { Team } from "@/types"

import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"
import { getCurrent, getTeam } from "@/actions/user-data"
import { isMemberOfTeam } from "@/actions/check"
import { authOptions } from "@/services/auth"

import { TeamSettings } from "@/app/_components/app/teams/settings/settings"
import { TeamDetails } from "@/app/_components/app/teams/settings/details"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Title } from "@/components/title"
import { Separator } from "@/components/ui/separator"

type Props = {
  params: { teamId: string }
}

const TeamIDSettings = async ({ params }: Props) => {

  const teamId = +params.teamId

  const team = await getTeam(teamId)
  const isMember = await isMemberOfTeam(+params.teamId)
  const current = await getCurrent()

  if (!team) return notFound()
  if ((!isMember && current?.id != team.ownerId)) return notFound();

  return (
    <div>

      <Title disableIcon label="Team Settings & Details" />
      <Separator className='mb-3' />

      <Tabs defaultValue="details" className='w-full'>
      
        <TabsList className='w-full'>
          <TabsTrigger className='w-full' value="details">Team Details</TabsTrigger>
          <TabsTrigger className='w-full' value="settings">Team Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <TeamSettings team={team as Team} />
        </TabsContent>

        <TabsContent value="details">
          <TeamDetails team={team as Team} />
        </TabsContent>
      </Tabs>

    </div>
  );
}
 
export default TeamIDSettings;
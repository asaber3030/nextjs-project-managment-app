import { Team } from "@/types"

import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"
import { getTeam } from "@/actions/user-data"
import { isMemberOfTeam } from "@/actions/check"
import { authOptions } from "@/services/auth"

import { TeamSettings } from "@/app/_components/app/teams/settings/settings"
import { TeamDetails } from "@/app/_components/app/teams/settings/details"

type Props = {
  params: { teamId: string }
}

const TeamIDSettings = async ({ params }: Props) => {

  const teamId = +params.teamId
  const team = await getTeam(teamId)
  const isMember = await isMemberOfTeam(+params.teamId)
  
  if (!isMember) return notFound();

  return (
    <section className='space-y-8'>
      <TeamDetails team={team as Team} />
      <TeamSettings team={team as Team} />
    </section>
  );
}
 
export default TeamIDSettings;
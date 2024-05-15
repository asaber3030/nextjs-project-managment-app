import { getTeamProjects } from "@/actions/team"
import { getMembershipOfTeam } from "@/actions/user-data"
import { notFound } from "next/navigation"

import { MemberBoards } from "@/app/_components/app/teams/members/view/member-boards"
import { MemberDetails } from "@/app/_components/app/teams/members/view/member-details"
import { MemberTasks } from "@/app/_components/app/teams/members/view/member-tasks"
import { Title } from "@/components/title"

import { TeamMember, TeamProject } from "@/types"
import { isMemberOfTeam } from "@/actions/check"

type Props = {
  params: { teamId: string, memberId: string }
}

const ViewTeamMember = async ({ params }: Props) => {

  const teamId = Number(params.teamId)
  const memberId = Number(params.memberId)
  const isMember = await isMemberOfTeam(teamId)

  const membership = await getMembershipOfTeam(memberId, teamId)
  
  const { data }: { data: TeamProject[] } = await getTeamProjects(teamId)

  if (!isMember) return notFound()

  return (
    <div className='divide-y space-y-2'>
      <section className='py-2'>
        <Title label="Member Details" hasBottomBorder />
        <MemberDetails member={membership as TeamMember} />
      </section>

      <section className='py-2'>
        <MemberTasks teamId={teamId} memberId={memberId} projects={data} />
      </section>

      <section className='py-2'>
        <MemberBoards teamId={teamId} memberId={memberId} projects={data} />
      </section>
    </div>
  );
}
 
export default ViewTeamMember;
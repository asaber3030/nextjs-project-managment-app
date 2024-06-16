import { getTeamProjects } from "@/actions/team"
import { getCurrent, getMembershipOfTeam, getTeam } from "@/actions/user-data"
import { notFound } from "next/navigation"

import { MemberBoards } from "@/app/_components/app/teams/members/view/member-boards"
import { MemberDetails } from "@/app/_components/app/teams/members/view/member-details"
import { MemberTasks } from "@/app/_components/app/teams/members/view/member-tasks"
import { Title } from "@/components/title"

import { TeamMember, TeamProject } from "@/types"
import { isMemberOfTeam } from "@/actions/check"
import { AddTaskAction } from "@/app/_components/app/projects/tasks/add-task"

type Props = {
  params: { teamId: string, memberId: string }
}

const ViewTeamMember = async ({ params }: Props) => {

  const teamId = Number(params.teamId)
  const memberId = Number(params.memberId)
  const isMember = await isMemberOfTeam(teamId)
  const membership = await getMembershipOfTeam(memberId, teamId)
  const current = await getCurrent()
  const team = await getTeam(+params.teamId)

  if (!team) return notFound();
  if ((!isMember && current?.id != team.ownerId)) return notFound();

  const { data }: { data: TeamProject[] } = await getTeamProjects(teamId)

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
import db from "@/services/prisma"

import { userSelect } from "@/actions/config"
import { getTeamMembers, getTeamProjects } from "@/actions/team"
import { format } from "date-fns"

import { Prisma, Status } from "@prisma/client"
import { TeamMember, TeamProjectTask, TeamProject } from "@/types"

import { Title } from "@/components/title"
import { EmptyData } from "@/components/empty-data"
import { OneTask } from "@/app/_components/app/projects/tasks/task"
import { SearchTeamTasks } from "@/app/_components/app/projects/tasks/search-team-tasks"
import { notFound } from "next/navigation"
import { isMemberOfTeam } from "@/actions/check"

type Props = {
  params: { teamId: string }, 
  searchParams: {
    userId: string,
    projectId: string,
    finishAt: string,
    status: string,
  }
}

const TeamIDTasks = async ({ params, searchParams }: Props) => {

  const teamId = +params.teamId
  
  const isMember = await isMemberOfTeam(+params.teamId)

  const { members } = await getTeamMembers(teamId)
  const { data }: { data: TeamProject[] } = await getTeamProjects(teamId)

  const where: Prisma.TeamProjectTasksWhereInput = {
    project: { teamId }
  }

  if (searchParams.userId && +searchParams.userId != 0) {
    where.userId = +searchParams.userId
  }
  if (searchParams.projectId && +searchParams.projectId != 0) {
    where.project = { teamId: +teamId, id: +searchParams.projectId }
  }
  if (searchParams.status) {
    where.status = searchParams.status as Status
  }
  if (searchParams.finishAt) {
    where.finishAt = new Date(format(searchParams.finishAt, 'yyyy-MM-dd'))
  }

  const tasks = await db.teamProjectTasks.findMany({
    where: where,
    include: { user: { select: userSelect }, project: true }
  })

  if (!isMember) return notFound();
 
  return (
    <div>
      <Title label="Team Tasks" parentClassName="mb-4">
        <SearchTeamTasks projects={data} members={members as TeamMember[]} />
      </Title>

      {/* Empty State */}
      {tasks.length === 0 && (<EmptyData title="No Tasks" />)}

      {/* Display Tasks */}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2'>
        {tasks.map((task) => (
          <OneTask
            teamId={teamId}
            key={`task-team-${task.id}`}
            task={task as TeamProjectTask} 
          />
        ))}
      </div>
      
    </div>
  );
}
 
export default TeamIDTasks;
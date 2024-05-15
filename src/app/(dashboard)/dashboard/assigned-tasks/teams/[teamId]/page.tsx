import Link from "next/link";

import db from "@/services/prisma";

import { userSelect } from "@/actions/config";
import { isMemberOfTeam } from "@/actions/check";
import { authOptions } from "@/services/auth";
import { badgeVariant } from "@/lib/utils";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";

import { FilterTeamProjects } from "@/app/_components/app/assigned-tasks/filter-team-projects";
import { OneTask } from "@/app/_components/app/projects/tasks/task";
import { EmptyData } from "@/components/empty-data";
import { Title } from "@/components/title";
import { Badge } from "@/components/ui/badge";

import { TeamProject, TeamProjectTask } from "@/types";
import { Prisma, Status } from "@prisma/client";

type Props = {
  params: { teamId: string },
  searchParams: { projectId: string, status: Status }
}

const AssignedTeamTasks = async ({ params, searchParams }: Props) => {

  const teamId = +params.teamId
  const projectId = +searchParams.projectId
  const status = searchParams.status

  const current = await getServerSession(authOptions)
  const team = await db.team.findUnique({ where: { id: teamId } })
  const isMember = await isMemberOfTeam(teamId)

  const whereProjectTasks: Prisma.TeamProjectTasksWhereInput = { userId: current?.user.id }
  const whereTeamProject: Prisma.TeamProjectWhereInput = { teamId }

  if (status) {
    whereProjectTasks.status = status
  }

  if (projectId && projectId !== 0) {
    whereProjectTasks.projectId = projectId
    whereTeamProject.id = projectId
  }

  const projectsOnly = await db.teamProject.findMany({
    where: { teamId }
  })

  const projects = await db.teamProject.findMany({
    where: whereTeamProject,
    include: {
      projectTasks: {
        where: whereProjectTasks,
        include: { user: { select: userSelect } }
      }
    }
  })

  if (!isMember) return notFound()

  return (
    <div>

      <Title label={team?.name} hasBottomBorder parentClassName='mb-2'>
        <FilterTeamProjects projects={projectsOnly as TeamProject[]} />
      </Title>

      {projects.map(project => {

        const countAccepted = project.projectTasks.filter(t => t.status === Status.Accepted)
        const countPending = project.projectTasks.filter(t => t.status === Status.Pending)
        const countRefused = project.projectTasks.filter(t => t.status === Status.Refused)

        return (
          <div key={`project-details-tasks-${project.id}`} className='mb-4'>
            
            <div className='flex justify-between items-center'>
              <Link href='' className='block hover:underline text-lg mb-2 font-medium'>{project.name}</Link>
              <div className='flex gap-1'>
                <Badge variant={badgeVariant('Accepted', true)} className='text-xs rounded-full font-medium'>{countAccepted.length} Accepted</Badge>
                <Badge variant={badgeVariant('Pending', true)} className='text-xs rounded-full font-medium'>{countPending.length} Pending</Badge>
                <Badge variant={badgeVariant('Refused', true)} className='text-xs rounded-full font-medium'>{countRefused.length} Refused</Badge>
              </div>
            </div>

            {project.projectTasks.length === 0 && (
              <EmptyData title="No Tasks." />
            )}
            <div className='grid grid-cols-1 xl:grid-cols-3 gap-2'>
              {project.projectTasks.map(task => (
                <OneTask key={`project-task-idx-${task.id}`} task={task as TeamProjectTask} />
              ))}
            </div>
          </div>
        )
      })}

    </div>
  );
}
 
export default AssignedTeamTasks; 
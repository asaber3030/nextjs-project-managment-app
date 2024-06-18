import Link from "next/link";

import db from "@/services/prisma";

import { userSelect } from "@/actions/config";
import { getServerSession } from "next-auth";
import { authOptions } from "@/services/auth";
import { route } from "@/lib/route";

import { Dot, DotIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { OneTask } from "@/app/_components/app/projects/tasks/task";

import { TeamProjectTask } from "@/types";
import { EmptyData } from "@/components/empty-data";
import { EmptyState } from "@/components/empty-state";
import { Status } from "@prisma/client";

const AssigedTasksPage = async () => {

  const current = await getServerSession(authOptions);
  const joinedTeams = await db.teamMember.findMany({
    where: { userId: current?.user.id },
    include: {
      team: { 
        include: { 
          members: { include: { user: { select: userSelect } } },
          teamProjects: {
            include: { team: true, projectTasks: { include: { project: { select: { teamId: true, id: true } }, user: { select: userSelect } }, where: { userId: current?.user.id } } }
          }
        }
      } 
    },
  })

  return (
    <div>

      {joinedTeams.length === 0 && (
        <EmptyState title="No result." />
      )}

      {joinedTeams.map(({ team }) => (
        
        <section key={`joined-team-details-${team.id}`}>
              
          <Link href='' className='text-xl font-medium text-gray-800 mb-2 flex gap-2'>Team <Dot /> <b>{team.name}</b></Link>

          <div>

            {/* No Projects */}
            {team.teamProjects.length === 0 && <EmptyState title="No Projects." className='mb-3' />}

            {/* List Projects of team */}
            {team.teamProjects.map((project) => {

              const countAccepted = project.projectTasks.filter(p => p.status === Status.Accepted).length
              const countRefused = project.projectTasks.filter(p => p.status === Status.Refused).length
              const countPending = project.projectTasks.filter(p => p.status === Status.Pending).length

              return (
                <div key={`team-project-details-${project.id}`}>

                  <Accordion type="single" collapsible>
                  
                  <AccordionItem value={`acc-${project.id}`} className='border-0'>
                    <AccordionTrigger className='bg-secondary border p-2 px-4 rounded-md shadow-sm mb-2 text-sm' value={`acc-${project.id}`}>
                      <div className='flex gap-1 items-center'>
                        <p>Project [{project.name}]</p>
                        <DotIcon className='size-5' />
                        <div className='flex gap-2 items-center'>
                          <p className='text-xs font-medium text-green-800'>{countAccepted} completed</p>
                          <p className='text-xs font-medium text-yellow-800'>{countPending} pending</p>
                          <p className='text-xs font-medium text-red-600'>{countRefused} refused</p>
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className='border-t-none'>
                      <div className='pt-2'>
                        <Link href={route.assignedTeamTasksWithProject(project.teamId, project.id)} className='mb-2 text-[17px] block cursor-pointer'>Project <b>[{project.name}]</b></Link>
                      </div>

                      {project.projectTasks.length === 0 && <EmptyData title="No Tasks" />}
                      <div className='grid grid-cols-1 xl:grid-cols-3 gap-2'>
                        {project.projectTasks.map((task) => (
                          <OneTask task={task as TeamProjectTask} key={`project-task-details-${task.id}`} />
                        ))}
                      </div>
                    </AccordionContent>

                  </AccordionItem>

                </Accordion>

                </div>
              )

            })}

          </div>

        </section>

      ))}
    </div>
  );
}
 
export default AssigedTasksPage;
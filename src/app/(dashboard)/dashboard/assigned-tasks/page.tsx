import Link from "next/link";

import db from "@/services/prisma";

import { userSelect } from "@/actions/config";
import { getServerSession } from "next-auth";
import { authOptions } from "@/services/auth";

import { DotIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { OneTask } from "@/app/_components/app/projects/tasks/task";

import { TeamProjectTask } from "@/types";
import { EmptyData } from "@/components/empty-data";

const AssigedTasksPage = async () => {

  const current = await getServerSession(authOptions);
  const joinedTeams = await db.teamMember.findMany({
    where: { userId: current?.user.id },
    include: {
      team: { 
        include: { 
          members: { include: { user: { select: userSelect } } },
          teamProjects: {
            include: { projectTasks: { include: { user: { select: userSelect } }, where: { userId: current?.user.id } } }
          }
        }
      } 
    },
  })

  return (
    <div>
      {joinedTeams.map(({ team }) => (
        <section key={`joined-team-details-${team.id}`}>
              
          <Link href='' className='block text-xl font-semibold text-gray-800'>{team.name} / {team.id}</Link>

          <div>

            {/* No Projects */}
            {team.teamProjects.length === 0 && <EmptyData title="No Projects." />}

            {/* List Projects of team */}
            {team.teamProjects.map((project) => {

              return (
                <div key={`team-project-details-${project.id}`}>

                  <Accordion type="single" collapsible>
                  
                  <AccordionItem value="item-1" className='border-0'>
                    <AccordionTrigger className='bg-white p-2 px-4 rounded-md shadow-sm mb-2 text-sm border'>
                      <div className='flex gap-1 items-center'>
                        <p><b>{project.name}</b></p>
                        <DotIcon className='size-5' />
                        <div className='flex gap-2 items-center'>
                          <p className='text-xs font-medium text=green-600'>3 completed</p>
                          <p className='text-xs font-medium text-yellow-600'>1 pending</p>
                          <p className='text-xs font-medium text-red-600'>3 refused</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className='border-t-none'>
                      <div className='pt-2'>
                        <Link href='' className='mb-2 text-[17px] block hover:underline'>Project <b>[{project.name}]</b></Link>
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
import React from "react";

import db from "@/services/prisma";

import { userSelect } from "@/actions/config";
import { getServerSession } from "next-auth";
import { authOptions } from "@/services/auth";

import { Title } from "@/components/title";
import { AssignedTasksSidebar } from "@/app/_components/app/assigned-tasks/sidebar";
import { Team, TeamMember } from "@/types";

type Props = { children: React.ReactNode }

const AssignedTasksLayout = async ({ children }: Props) => {

  const current = await getServerSession(authOptions);
  const joinedTeams = await db.teamMember.findMany({
    where: { userId: current?.user.id },
    include: {
      team: { 
        include: { 
          members: { include: { user: { select: userSelect } } },
          teamProjects: {
            include: { 
              projectTasks: { 
                include: { user: { select: userSelect } }, 
                where: { userId: current?.user.id } 
              } 
            }
          }
        }
      } 
    }
  })

  return (
    <div>

      <Title label="Assigned Tasks" hasBottomBorder parentClassName="mb-4" />

      <div className="flex gap-4">
        
        <section className='w-[550px] space-y-4 border-r pr-4'>
          <AssignedTasksSidebar 
            joinedTeams={joinedTeams as TeamMember[]}
          />
        </section>

        <section className='w-full'>
          {children}
        </section>

      </div>

    </div>
  
  );
}
 
export default AssignedTasksLayout;
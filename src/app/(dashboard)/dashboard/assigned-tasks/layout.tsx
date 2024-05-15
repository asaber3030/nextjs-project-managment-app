import Link from "next/link";

import db from "@/services/prisma";

import { userSelect } from "@/actions/config";
import { getServerSession } from "next-auth";
import { authOptions } from "@/services/auth";

import { Check, Dot } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";
import { route } from "@/lib/route";
import { AssignedTasksSidebar } from "@/app/_components/app/assigned-tasks/sidebar";

type Props = {
  children: React.ReactNode
  params: {
    teamId: string
  }
}

const AssignedTasksLayout = async ({ children, params }: Props) => {

  const headersList = headers()
  const fullURL = headersList.get('referer')

  console.log(fullURL)
  
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
    <div className="flex gap-4">

      <section className='w-[450px] space-y-4 border-r pr-4'>

        <section>

          <Link href='' className='font-bold mb-1 block text-blue-900 hover:underline w-fit'>Teams Tasks</Link>

          <AssignedTasksSidebar joinedTeams={joinedTeams} />
        </section>

      </section>

      <section className='w-full'>
        {children}
      </section>
    </div>
  );
}
 
export default AssignedTasksLayout;
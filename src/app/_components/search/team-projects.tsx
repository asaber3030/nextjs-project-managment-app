import Link from "next/link";

import { route } from "@/lib/route";

import { TeamProject } from "@/types";
import { EmptyData } from "@/components/empty-data";

type Props = {
  projects: TeamProject[]
}

export const ListSearchedTeamProjects = ({ projects }: Props) => {
  return projects.length === 0 ? (
    <EmptyData title="No projects result." />
  ): (
    <div className="grid grid-cols-2 xl:grid-cols-5 gap-2">
      {projects.map(project => (
        <Link href={route.viewTeamProject(project.teamId, project.id)} key={`teams-project-searched-${project.id}`} className='bg-white rounded-sm p-2 shadow-sm border transition-all hover:bg-secondaryMain'>
          <h3 className="text-sm font-medium text-center">{project.name}</h3>
        </Link>
      ))}
    </div>
  )
}
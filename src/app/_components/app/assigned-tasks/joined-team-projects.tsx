import Link from "next/link"

import { useSearchParams } from "next/navigation"
import { route } from "@/lib/route"
import { cn } from "@/lib/utils"

import { Check } from "lucide-react"
import { TeamProject } from "@/types"

type Props = {
  teamProjects: TeamProject[] | undefined
  teamId: number
}

export const SidebarJoinedTeamProjects = ({ teamProjects, teamId }: Props) => {
  const searchParams = useSearchParams()

  return (
    <ul className="w-full mt-1 space-y-0.5">
      {teamProjects?.map((project: TeamProject) => (
        <li key={`list-item-project-${project.id}`}>
          <Link
            href={route.assignedTeamTasksWithProject(teamId, project.id)}
            className={cn(
              "p-1 text-xs relative transition-all border border-transparent hover:bg-secondaryMain/10 rounded-sm px-2 flex flex-col gap-0.5 py-2",
              searchParams.get("projectId") == String(project.id) &&
                "bg-secondaryMain/10 border-secondaryMain/40"
            )}
          >
            <span>{project.name}</span>
            <span className="font-medium text-yellow-900 leading-3">
              {project?.projectTasks?.length} tasks assigned to you
            </span>

            {searchParams.get("projectId") == String(project.id) && (
              <Check className="size-4 text-secondaryMain/70 absolute right-2" />
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}

import { getTeamProjects } from "@/actions/team";
import { QueryKeys } from "@/lib/query-keys";
import { TeamProject, TeamProjectTask } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useProjects(teamId: number) {
  
  const queryProjects = useQuery({
    queryKey: QueryKeys.teamProjects(teamId),
    queryFn: () => getTeamProjects(teamId)
  })

  const { isLoading: isProjectsLoading, data, isRefetching: isProjectsRefetching, isFetched: isProjectsFetched, refetch: refetchProjects } = queryProjects;

  const projects: TeamProject[] = data?.data

  return {
    projects, 
    isProjectsFetched, 
    isProjectsLoading, 
    isProjectsRefetching, 
    refetchProjects
  }

}
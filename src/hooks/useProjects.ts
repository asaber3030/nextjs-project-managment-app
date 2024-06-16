import { useQuery } from "@tanstack/react-query";

import { getProjectStats, getTeamProject, getTeamProjects } from "@/actions/team";

import { QueryKeys } from "@/lib/query-keys";
import { TeamProject } from "@/types";

export function useProjects(teamId: number, limit?: number) {
  
  const queryProjects = useQuery({
    queryKey: QueryKeys.teamProjects(teamId),
    queryFn: () => getTeamProjects(teamId, '', limit)
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

export function useProject(projectId: number) {
  
  const queryProject = useQuery({
    queryKey: QueryKeys.teamProject(projectId),
    queryFn: () => getTeamProject(projectId)
  })

  const { isLoading: isProjectLoading, data, isRefetching: isProjectRefetching, isFetched: isProjectFetched, refetch: refetchProject } = queryProject;

  const project: TeamProject = data?.data

  return {
    project, 
    isProjectFetched, 
    isProjectLoading, 
    isProjectRefetching, 
    refetchProject
  }

}

export function useProjectStats(projectId: number) {
  
  const queryStats = useQuery({
    queryKey: QueryKeys.teamProjectStats(projectId),
    queryFn: () => getProjectStats(projectId)
  })

  const { isLoading: isStatsLoading, data, isRefetching: isStatsRefetching, isFetched: isStatsFetched, refetch: refetchStats } = queryStats;

  const stats = data

  return {
    stats, 
    isStatsFetched, 
    isStatsLoading, 
    isStatsRefetching, 
    refetchStats
  }

}
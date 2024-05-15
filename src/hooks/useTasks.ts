import { getProjectTasks } from "@/actions/project";
import { QueryKeys } from "@/lib/query-keys";
import { TeamProjectTask } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useTasks(teamId: number, projectId: number, limit: number = 3) {
  
  const queryTasks = useQuery({
    queryKey: QueryKeys.teamProjectTasks(teamId, projectId),
    queryFn: () => getProjectTasks(projectId, limit),
  })

  const { isLoading: isTasksLoading, data, isRefetching: isTasksRefetching, isFetched: isTasksFetched, refetch: refetchTasks } = queryTasks;

  const tasks = data?.tasks as unknown as TeamProjectTask[]

  return { tasks, isTasksFetched, isTasksLoading, isTasksRefetching, refetchTasks }

}
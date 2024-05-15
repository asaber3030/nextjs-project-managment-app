import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { changeStatusPersonalTask, createPersonalProject, createPersonalTask, deletePersonalProject, deletePersonalTask, getPersonalProject, getPersonalProjects, getPersonalTask, getPersonalTasks, updatePersonalProject, updatePersonalTask } from "@/actions/user-data";
import { route } from "@/lib/route";
import { toast } from "sonner";

import { PersonalProjectSchema, PersonalTaskSchema } from "@/schema";
import { QueryKeys } from "@/lib/query-keys";
import { PersonalTaskStatus, Status } from "@prisma/client";

export function usePersonalProjects(query: string = '', orderBy: string = 'id', orderType: ('asc' | 'desc') = 'desc') {

  const queryPersonalProjects = useQuery({
    queryKey: QueryKeys.personalProjects(),
    queryFn: () => getPersonalProjects(query, orderBy, orderType),
    gcTime: 10
  })

  return {
    projects: queryPersonalProjects.data,
    projectsLoading: queryPersonalProjects.isLoading,
    projectsFetched: queryPersonalProjects.isFetched,
    projectsRefetching: queryPersonalProjects.isRefetching,
    projectsRefetch: queryPersonalProjects.refetch
  }
}

export function usePersonalProject(projectId?: number) {

  const router = useRouter()
  const queryClient = useQueryClient()

  const queryPersonalProject = useQuery({
    queryKey: QueryKeys.personalProject(projectId as number),
    queryFn: () => getPersonalProject(projectId as number)
  })

  type PersonalProjectData = z.infer<typeof PersonalProjectSchema>

  const updateMutation = useMutation({
    mutationFn: ({ projectId, data }: { data: PersonalProjectData, projectId: number }) => updatePersonalProject(projectId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.personalProjects() })
      toast.message(data.message)
      if (data.status === 200) {
        router.push(route.personalProjects())
      }
    }
  })
  const deleteMutation = useMutation({
    mutationFn: ({ projectId }: { projectId: number }) => deletePersonalProject(projectId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.personalProjects() })
      toast.message(data.message)
      if (data.status === 200) {
        router.push(route.personalProjects())
      }
    }
  })
  const createMutation = useMutation({
    mutationFn: ({ data }: { data: PersonalProjectData }) => createPersonalProject(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.personalProjects() })
      toast.message(data.message)
      if (data.status === 201) {
        router.push(route.personalProjects())
      }
    }
  })

  const { mutate: updateMutate, isPending: updatePending } = updateMutation
  const { mutate: deleteMutate, isPending: deletePending } = deleteMutation
  const { mutate: createMutate, isPending: createPending } = createMutation

  return {
    project: queryPersonalProject.data,
    projectLoading: queryPersonalProject.isLoading,
    projectFetched: queryPersonalProject.isFetched,
    projectRefetching: queryPersonalProject.isRefetching,
    projectRefetch: queryPersonalProject.refetch,

    updateMutate,
    updatePending,

    deleteMutate,
    deletePending,

    createMutate,
    createPending,
  }
}

export function usePersonalTasks(query: string = '', orderBy: string = 'id', orderType: ('asc' | 'desc') = 'desc') {

  const queryPersonalTasks = useQuery({
    queryKey: QueryKeys.personalTasks(),
    queryFn: () => getPersonalTasks(query, orderBy, orderType)
  })

  return {
    tasks: queryPersonalTasks.data,
    tasksLoading: queryPersonalTasks.isLoading,
    tasksFetched: queryPersonalTasks.isFetched,
    tasksRefetching: queryPersonalTasks.isRefetching,
    tasksRefetch: queryPersonalTasks.refetch
  }
}

export function usePersonalTask(taskId?: number) {

  const router = useRouter()
  const queryClient = useQueryClient()

  const queryPersonalTask = useQuery({
    queryKey: QueryKeys.personalTask(taskId as number),
    queryFn: () => getPersonalTask(taskId as number)
  })

  type PersonalTaskData = z.infer<typeof PersonalTaskSchema>

  const updateMutation = useMutation({
    mutationFn: ({ taskId, data }: { data: PersonalTaskData, taskId: number }) => updatePersonalTask(taskId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.personalProjects() })
      toast.message(data.message)
    }
  })
  const changeStatusMutation = useMutation({
    mutationFn: ({ taskId, status }: { status: PersonalTaskStatus, taskId: number }) => changeStatusPersonalTask(taskId, status) ,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.personalProjects() })
      toast.message(data.message)
    }
  })
  const deleteMutation = useMutation({
    mutationFn: ({ taskId }: { taskId: number }) => deletePersonalTask(taskId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.personalProjects() })
      toast.message(data.message)
    }
  })
  const createMutation = useMutation({
    mutationFn: ({ data }: { data: PersonalTaskData }) => createPersonalTask(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.personalProjects() })
      toast.message(data.message)
    }
  })

  const { mutate: updateMutate, isPending: updatePending } = updateMutation
  const { mutate: changeStatusMutate, isPending: changeStatusPending } = changeStatusMutation
  const { mutate: deleteMutate, isPending: deletePending } = deleteMutation
  const { mutate: createMutate, isPending: createPending } = createMutation

  return {
    project: queryPersonalTask.data,
    projectLoading: queryPersonalTask.isLoading,
    projectFetched: queryPersonalTask.isFetched,
    projectRefetching: queryPersonalTask.isRefetching,
    projectRefetch: queryPersonalTask.refetch,

    updateMutate,
    updatePending,

    changeStatusMutate,
    changeStatusPending,

    deleteMutate,
    deletePending,

    createMutate,
    createPending,
  }
}
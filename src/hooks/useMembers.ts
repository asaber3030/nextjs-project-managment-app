import { QueryKeys } from "@/lib/query-keys";
import { TeamMember } from "@/types";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { approveAllTeamInvitation, approveOneTeamInvitation, changeMemberRole, changeMemberStatus, getTeamMembers, rejectAllTeamInvitation, rejectOneTeamInvitation, removeMember } from "@/actions/team";
import { Status, TeamMemberStatus, TeamRoles } from "@prisma/client";
import { getMemberBoards, getMemberTasks } from "@/actions/user-data";

export function useMembers(teamId: number) {

  const queryClient = useQueryClient()
  
  const { isLoading: isMembersLoading, isFetched: isMembersFetched, data, refetch: refetchMembers, isRefetching: isMembersRefetching } = useQuery({
    queryKey: QueryKeys.teamMembers(teamId),
    queryFn: () => getTeamMembers(teamId),
  })

  const deleteMutation = useMutation({
    mutationFn: ({ memberId, membershipId }: { memberId: number, membershipId: number }) => removeMember(teamId, memberId, membershipId),
    onSuccess: (data) => {
      toast.message(data.message)
      queryClient.invalidateQueries({ queryKey: QueryKeys.teamMembers(teamId) })
    }
  })

  const changeStatusMutation = useMutation({
    mutationFn: ({ memberId, membershipId, status }: { memberId: number, membershipId: number, status: TeamMemberStatus }) => changeMemberStatus(status, teamId, memberId, membershipId),
    onSuccess: (data) => {
      toast.message(data.message)
      queryClient.invalidateQueries({ queryKey: QueryKeys.teamMembers(teamId) })
    }
  })
  const changeRoleMutation = useMutation({
    mutationFn: ({ memberId, membershipId, role }: { memberId: number, membershipId: number, role: TeamRoles }) => changeMemberRole(role, teamId, memberId, membershipId),
    onSuccess: (data) => {
      toast.message(data.message)
      queryClient.invalidateQueries({ queryKey: QueryKeys.teamMembers(teamId) })
    }
  })

  const { mutate: deletionMutate, isPending: deletionPending } = deleteMutation
  const { mutate: changeStatusMutate, isPending: changeStatusPending } = changeStatusMutation
  const { mutate: changeRoleMutate, isPending: changeRolePending } = changeRoleMutation

  const members = data?.members as TeamMember[]

  return { 
    members, 
    isMembersRefetching, 
    isMembersLoading, 
    isMembersFetched, 
    refetchMembers,

    deletionMutate,
    deletionPending,

    changeStatusMutate,
    changeStatusPending,

    changeRoleMutate,
    changeRolePending,
  }

}

export function useMember(teamId: number, memberId: number) {
  
  const queryClient = useQueryClient()

  const queryTasks = useQuery({
    queryKey: QueryKeys.teamMemberTasks(teamId, memberId),
    queryFn: async () => {}
  })

}

export function useMemberTasks(teamId: number, memberId: number, status: Status, filter?: string, enabled?: true, projectId?: number) {
  
  const queryClient = useQueryClient()

  const queryTasks = useQuery({
    queryKey: QueryKeys.teamMemberTasksStatus(teamId, memberId, status),
    queryFn: () => getMemberTasks(memberId, teamId, status, filter, projectId),
    enabled
  })

  const { data: tasks, isLoading: tasksLoading, isRefetching: tasksRefetching, refetch: refetchTasks } = queryTasks

  return {
    tasks,
    tasksLoading,
    tasksRefetching,
    refetchTasks
  }
}

export function useMemberBoards(teamId: number, memberId: number, projectId?: number) {
  
  const queryClient = useQueryClient()

  const queryBoards = useQuery({
    queryKey: QueryKeys.teamMemberBoards(teamId, memberId),
    queryFn: () => getMemberBoards(memberId, teamId, projectId),
  })

  const { data: boards, isLoading: boardsLoading, isRefetching: boardsRefetching, refetch: refetchBoards } = queryBoards

  return {
    boards,
    boardsLoading,
    boardsRefetching,
    refetchBoards
  }
}

export function useMemberInvitations() {
  const approveInvitationMutation = useMutation({
    mutationFn: ({ invitationId }: { invitationId: number }) => approveOneTeamInvitation(invitationId),
    onSuccess: (data) => {
      toast.message(data.message)
    }
  })
  const rejectInvitationMutation = useMutation({
    mutationFn: ({ invitationId }: { invitationId: number }) => rejectOneTeamInvitation(invitationId),
    onSuccess: (data) => {
      toast.message(data.message)
    }
  })
  const approveAllInvitationMutation = useMutation({
    mutationFn: ({ invitationIds }: { invitationIds: number[] }) => approveAllTeamInvitation(invitationIds),
    onSuccess: (data) => {
      toast.message(data.message)
    }
  })
  const rejectAllInvitationMutation = useMutation({
    mutationFn: ({ invitationIds }: { invitationIds: number[] }) => rejectAllTeamInvitation(invitationIds),
    onSuccess: (data) => {
      toast.message(data?.message)
    }
  })

  return {
    approveMutate: approveInvitationMutation.mutate,
    approveIsPending: approveInvitationMutation.isPending,

    rejectMutate: rejectInvitationMutation.mutate,
    rejectIsPending: rejectInvitationMutation.isPending,

    approveAllMutate: approveAllInvitationMutation.mutate,
    approveAllIsPending: approveAllInvitationMutation.isPending,

    rejectAllMutate: rejectAllInvitationMutation.mutate,
    rejectAllIsPending: rejectAllInvitationMutation.isPending
  }
}
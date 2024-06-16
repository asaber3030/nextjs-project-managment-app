import { deleteTeam, deleteTeams, directAddMember, getGlobalTeamPermissions, getGlobalTeamPermissionsByTeam, getTeamPermissions, inviteMembers, leaveOneTeam, leaveTeams, removeInvitation, updateTeam, updateTeamPermission } from "@/actions/team";
import { getTeam, getTeamInvitations, getTeams } from "@/actions/user-data";

import { QueryKeys } from "@/lib/query-keys";
import { CreateTeamSchema } from "@/schema";
import { TeamPermission, User } from "@/types";
import { TeamRoles } from "@prisma/client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export function useTeams(userId?: string) {

  const queryTeams = useQuery({
    queryKey: QueryKeys.userTeams(),
    queryFn: () => getTeams(userId as string)
  })

  const deleteAll = useMutation({
    mutationFn: ({ data }: { data: number[] }) => deleteTeams(data),
    onSuccess: (data) => {
      toast.message(data.message)
    }
  })

  const leaveAll = useMutation({
    mutationFn: ({ data }: { data: number[] }) => leaveTeams(data),
    onSuccess: (data) => {
      toast.message(data.message)
    }
  })

  const leaveOne = useMutation({
    mutationFn: ({ data }: { data: number }) => leaveOneTeam(data),
    onSuccess: (data) => {
      toast.message(data.message)
    }
  })

  const { data: teams, isLoading: teamsStillLoading } = queryTeams
  const { mutate: mutateDeleteAll, isPending: deleteAllLoading } = deleteAll
  const { mutate: mutateLeaveAll, isPending: leaveAllLoading } = leaveAll
  const { mutate: mutateLeaveOne, isPending: leaveOneLoading } = leaveOne

  return {
    teams,
    teamsStillLoading,

    mutateDeleteAll,
    deleteAllLoading,

    mutateLeaveAll,
    leaveAllLoading,
    
    mutateLeaveOne,
    leaveOneLoading
  }

}

export function useTeam(teamId: number) {

  const queryClient = useQueryClient()

  const queryTeam = useQuery({
    queryKey: QueryKeys.team(teamId),
    queryFn: () => getTeam(teamId)
  })

  const queryInvitations = useQuery({
    queryKey: QueryKeys.teamInvitations(teamId),
    queryFn: () => getTeamInvitations(teamId)
  })
  
  const inviteMembersMutation = useMutation({
    mutationFn: ({ users }: { users: User[] }) => inviteMembers(teamId, users),
    onSuccess: (data) => {
      toast.message(data.message)
      queryClient.invalidateQueries({ queryKey: QueryKeys.teamInvitations(teamId) })
    }
  })

  const removeInvitationMutation = useMutation({
    mutationFn: ({ invitationId }: { invitationId: number }) => removeInvitation(invitationId),
    onSuccess: (data) => {
      toast.message(data.message)
      queryClient.invalidateQueries({ queryKey: QueryKeys.teamInvitations(teamId) })
    }
  })

  const directAddMutation = useMutation({
    mutationFn: ({ teamId, userId, code }: { teamId: number, userId: number, code: string }) => directAddMember(code, teamId, userId),
    onSuccess: (data) => {
      toast.message(data.message)
      queryClient.invalidateQueries({ queryKey: QueryKeys.teamMembers(teamId) })
    }
  })

  const updateTeamMutation = useMutation({
    mutationFn: ({ teamId, values }: { teamId: number, values: z.infer<typeof CreateTeamSchema> }) => updateTeam(teamId, values),
    onSuccess: (data) => {
      toast.message(data.message)
      queryClient.invalidateQueries({ queryKey: QueryKeys.userTeams() })
    }
  })

  const deleteTeamMutation = useMutation({
    mutationFn: ({ teamId }: { teamId: number }) => deleteTeam(teamId),
    onSuccess: (data) => {
      toast.message(data.message)
      queryClient.invalidateQueries({ queryKey: QueryKeys.userTeams() })
    }
  })

  const { data: team, isLoading: teamLoading, isFetched: teamFetched, isRefetching: teamRefetching, refetch: teamRefetch } = queryTeam
  const { data: invitations, isLoading: invitationsLoading, isFetched: invitationsFetched, isRefetching: invitationsRefetching, refetch: invitationsRefetch } = queryInvitations
  const { mutate: inviteMutate, isPending: inviteLoading } = inviteMembersMutation
  const { mutate: directAddMutate, isPending: directAddLoading } = directAddMutation
  const { mutate: removeInvitationMutate, isPending: removeInvitationLoading } = removeInvitationMutation
  const { mutate: updateTeamMutate, isPending: updateTeamLoading } = updateTeamMutation
  const { mutate: deleteTeamMutate, isPending: deleteTeamLoading } = deleteTeamMutation

  return {
    team,
    teamLoading,
    teamFetched,
    teamRefetching,
    teamRefetch,
    
    invitations,
    invitationsLoading,
    invitationsFetched,
    invitationsRefetching,
    invitationsRefetch,

    inviteMutate,
    inviteLoading,

    directAddMutate,
    directAddLoading,

    removeInvitationMutate,
    removeInvitationLoading,

    updateTeamMutate,
    updateTeamLoading,

    deleteTeamMutate,
    deleteTeamLoading
  }

}

export function useGlobalTeamPermissions(teamId: number, tag: string) {
  const queryPermissions = useQuery({
    queryKey: QueryKeys.globalTeamPermissions(teamId, tag),
    queryFn: () => getGlobalTeamPermissionsByTeam(teamId, tag)
  })

  return {
    permissions: queryPermissions.data,
    permissionsLoading: queryPermissions.isLoading
  }
}

export function useTeamPermissions(teamId: number) {

  const queryPermissions = useQuery({
    queryKey: QueryKeys.teamPermissions(teamId),
    queryFn: () => getTeamPermissions(teamId)
  })
  
  const permissions = queryPermissions.data

  return {
    permissions,
    permissionsLoading: queryPermissions.isLoading,
    permissionsFetched: queryPermissions.isFetched,
    permissionsRefetching: queryPermissions.isRefetching,
    permissionsRefetch: queryPermissions.refetch
  }
}


export function usePermissionActions() {
  const updatePermissions = useMutation({
    mutationFn: ({ permissionId, teamId, whoCanDo, teamPermissions }: { permissionId: number, teamId: number, whoCanDo: TeamRoles[], teamPermissions: TeamPermission[] }) => updateTeamPermission(permissionId, teamId, whoCanDo, teamPermissions),
    onSuccess: (data) => {
      toast.message("Updated")
    }
  })
  return {
    updatePermissionMutate: updatePermissions.mutate,
    updatePermissionsLoading: updatePermissions.isPending
  }
}
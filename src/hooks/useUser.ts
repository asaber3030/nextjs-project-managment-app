"use client";

import { changeAccountPrivacy, changeCode, changeCover, changePassword, changeProfilePicture, findUserByCode, getDirectCode } from "@/actions/user-data";
import { QueryKeys } from "@/lib/query-keys";
import { ChangeDirectCodeSchema, ChangePasswordSchema } from "@/schema";
import { AccountPrivacySchema } from "@/schema/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { z } from "zod";

export function useUser() {
  const session = useSession();
  return session.data?.user
}

export function useUserByCode(teamId: number, code: string) {
  const query = useQuery({
    queryKey: QueryKeys.userByCode(teamId, code),
    queryFn: () => findUserByCode(code),
    enabled: !!code
  })

  const { data: user, isLoading: userLoading, refetch: refetchUser, isRefetching: userRefetching } = query

  return {
    user,
    userLoading,
    userRefetching,
    refetchUser
  }
}

export function useUpdateUser() {

  const queryClient = useQueryClient()

  const queryCode = useQuery({
    queryKey: ['user', 'direct-code'],
    queryFn: () => getDirectCode()
  })

  const changePasswordMutation = useMutation({
    mutationFn: ({ data }: { data: z.infer<typeof ChangePasswordSchema> }) => changePassword(data),
    onSuccess: (data) => {
      toast.message(data?.message)
    }
  })

  const changeAccountPrivacyMutation = useMutation({
    mutationFn: ({ data }: { data: z.infer<typeof AccountPrivacySchema> }) => changeAccountPrivacy(data),
    onSuccess: (data) => {
      toast.message(data?.message)
    }
  })

  const changeDirectCodeMutation = useMutation({
    mutationFn: ({ data }: { data: z.infer<typeof ChangeDirectCodeSchema> }) => changeCode(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user', 'direct-code'] })
      toast.message(data?.message)
    }
  })

  const changePictureMutation = useMutation({
    mutationFn: ({ data }: { data: string }) => changeProfilePicture(data),
    onSuccess: (data) => {
      toast.message(data?.message)
    }
  })
  const changeCoverMutation = useMutation({
    mutationFn: ({ data }: { data: string }) => changeCover(data),
    onSuccess: (data) => {
      toast.message(data?.message)
    }
  })

  return {
    directCode: queryCode.data?.directCode?.directCode,
    directCodeLoading: queryCode.isLoading,

    mutateChangePassword: changePasswordMutation.mutate,
    changePasswordLoading: changePasswordMutation.isPending,

    mutateChangeDirectCode: changeDirectCodeMutation.mutate,
    changeDirectCodeLoading: changeDirectCodeMutation.isPending,

    mutateChangeAccountPrivacy: changeAccountPrivacyMutation.mutate,
    changeAccountPrivacyLoading: changeAccountPrivacyMutation.isPending,

    mutateChangePicture: changePictureMutation.mutate,
    changePictureLoading: changePictureMutation.isPending,

    mutateChangeCover: changeCoverMutation.mutate,
    changeCoverLoading: changeCoverMutation.isPending
  }
  
}

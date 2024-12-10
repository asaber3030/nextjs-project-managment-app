import { useQuery } from "@tanstack/react-query"

import { QueryKeys } from "@/lib/query-keys"
import { getAccess } from "@/actions/permission"

export function useRole(tag: string, roleName: string, teamId: number) {
  const queryRole = useQuery({
    queryKey: QueryKeys.accessPermission(tag, roleName, teamId),
    queryFn: () => getAccess(tag, roleName, teamId),
    retry: false,
  })

  const access = queryRole.data

  return {
    access,
    roleLoading: queryRole.isLoading,
    roleFetched: queryRole.isFetched,
    roleFetching: queryRole.isFetching,
    roleRefetching: queryRole.isRefetching,
    refetchRole: queryRole.refetch,
    queryRole,
  }
}

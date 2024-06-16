import { Plan } from "@/types";
import { QueryKeys } from "@/lib/query-keys";

import { getPlans } from "@/actions/app";

import { useQuery } from "@tanstack/react-query";

export function usePlans() {
  
  const queryPlans = useQuery({
    queryKey: QueryKeys.appPlans(),
    queryFn: () => getPlans()
  })

  const { isLoading: isPlansLoading, data, isRefetching: isPlansRefetching, isFetched: isPlansFetched, refetch: refetchPlans } = queryPlans;

  const plans = data as Plan[]

  return {
    plans, 
    isPlansLoading, 
    isPlansRefetching, 
    isPlansFetched, 
    refetchPlans
  }

}
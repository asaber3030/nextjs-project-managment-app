import { getInvoice, getSubscription } from "@/actions/stripe";
import { QueryKeys } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

export function useSubscription(subscriptionId: string) {
  const querySubscription = useQuery({
    queryKey: QueryKeys.accountSubscriptions(subscriptionId),
    queryFn: () => getSubscription(subscriptionId)
  })
  const { data: sub, isLoading: subLoading } = querySubscription

  return {
    sub,
    subLoading
  }
}

export function useInvoice(invoiceId: string) {
  const queryInvoice = useQuery({
    queryKey: QueryKeys.accountInvoices(invoiceId),
    queryFn: () => getInvoice(invoiceId)
  })
  const { data: invoice, isLoading: invoiceLoading } = queryInvoice

  return {
    invoice,
    invoiceLoading
  }
}
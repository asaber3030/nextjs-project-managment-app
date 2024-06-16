import { useMutation, useQuery } from "@tanstack/react-query";

import { deleteNotification, getNotifications, updateNotification } from "@/actions/user-data";
import { toast } from "sonner";

import { QueryKeys } from "@/lib/query-keys";

export function useNotifications() {

  const queryNotifications = useQuery({
    queryKey: QueryKeys.userNotifications(),
    queryFn: () => getNotifications()
  })

  const deleteMutation = useMutation({
    mutationFn: ({ id }: { id: number }) => deleteNotification(id),
    onSuccess: (data) => {
      toast.message(data.message)
    }
  })
  const markAsReadMutation = useMutation({
    mutationFn: ({ id }: { id: number }) => updateNotification(id, true)
  })
  const markAsUnreadMutation = useMutation({
    mutationFn: ({ id }: { id: number }) => updateNotification(id, false),
    onSuccess: (data) => {
      toast.message(data.message)
    }
  })

  const { mutate: mutateDelete, isPending: isDeleteLoading } = deleteMutation
  const { mutate: mutateAsRead, isPending: isAsReadLoading } = markAsReadMutation
  const { mutate: mutateAsUnread, isPending: isAsUnreadLoading } = markAsUnreadMutation

  const { data: notitficationsData, isLoading: isNotificationsLoading, isFetching: isNotificationsFetching, isRefetching: isNotificationsRefetching, refetch: refetchNotifications } = queryNotifications

  return {
    notitficationsData,
    isNotificationsFetching,
    isNotificationsRefetching,
    isNotificationsLoading,
    refetchNotifications,

    isAsReadLoading,
    mutateAsRead,

    isAsUnreadLoading,
    mutateAsUnread,

    mutateDelete,
    isDeleteLoading
  }

}
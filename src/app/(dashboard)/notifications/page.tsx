import { SingleNotification } from "@/app/_components/user/notification";
import { Title } from "@/components/title";

import { getNotifications } from "@/actions/user-data";
import { getServerSession } from "next-auth";

import { authOptions } from "@/services/auth";
import { redirect } from "next/navigation";

const NotificationsPage = async () => {

  const session = await getServerSession(authOptions)
  const userId = Number(session?.user.id)

  const { notifications } = await getNotifications(userId)

  if (!session?.user) return redirect('/login')

  return (
    <section className='w-[65%] mx-auto'>
      <Title label='Notifications' />
      <section>
        {notifications?.map(notification => (
          <SingleNotification key={`notification-one-idx-${notification.id}`} notification={notification} />
        ))}
      </section>
    </section>
  );
}
 
export default NotificationsPage;
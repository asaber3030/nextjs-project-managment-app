import db from "@/services/prisma";

import { authOptions } from "@/services/auth";
import { getServerSession } from "next-auth";

import { AccountHeaderMain } from "@/app/_components/account/title-section";
import { SubscriptionItem } from "@/app/_components/account/subscription-item";
import { EmptyState } from "@/components/empty-state";

const SubscriptionsPage = async () => {

  const user = await getServerSession(authOptions)

  const subscriptions = await db.subscription.findMany({
    where: { userId: user?.user.id },
    include: { plan: true },
    orderBy: { id: 'desc' }
  })

  return (
    <div>
      
      <AccountHeaderMain title="All Subscriptions." label="You can choose to cancel your subscription or not." className='mb-4' />

      {subscriptions.length == 0 && (
        <EmptyState title="No Subscriptions found." />
      )}

      <div className='divide-y'>
        {subscriptions.map((sub) => {
          return (
            <SubscriptionItem 
              key={`subscription-idx-${sub.id}`} 
              subscription={sub} 
            />
          )
        })}
      </div>

    </div>
  );
}
 
export default SubscriptionsPage;
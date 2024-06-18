import db from "@/services/prisma";

import { authOptions } from "@/services/auth";
import { getServerSession } from "next-auth";

import { AccountHeaderMain } from "@/app/_components/account/title-section";
import { SubscriptionItem } from "@/app/_components/account/subscriptions/subscription-item";
import { EmptyState } from "@/components/empty-state";
import { NewSubscription } from "@/app/_components/account/subscriptions/new-subscription";

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

      <div className='space-y-2'>
        {subscriptions.map((sub) => {
          return (
            <SubscriptionItem 
              key={`subscription-idx-${sub.id}`} 
              subscription={sub} 
            />
          )
        })}
      </div>
      <NewSubscription />

    </div>
  );
}
 
export default SubscriptionsPage;
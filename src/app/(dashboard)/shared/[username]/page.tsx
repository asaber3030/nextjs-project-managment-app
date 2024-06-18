import db from "@/services/prisma"

import { userSelect } from "@/actions/config"
import { AccountHeaderMain } from "@/app/_components/account/title-section"
import { SharedJoinedTeams } from "@/app/_components/shared/joined-teams"
import { SharedPersonalProjects } from "@/app/_components/shared/personal-projects"
import { SharedPersonalTeams } from "@/app/_components/shared/personal-teams"
import { PrivateContent } from "@/app/_components/shared/private-content"
import { notFound } from "next/navigation"

type Props = {
  params: {
    username: string
  }
}

export async function generateMetadata({ params }: Props) {
  return {
    title: `Profile | @${params.username}`
  }
}

const ShareProfile = async ({ params }: Props) => {

  const { username } = params

  const user = await db.user.findUnique({
    where: { username },
    select: userSelect
  })

  if (!user) return notFound()

  return (
    <div>

      <AccountHeaderMain className='mb-2' title="Personal Projects" label="Projects that related to this user and worked on it alot." />
      {user.showPersonalProjects ? (
        <SharedPersonalProjects username={params.username} />
      ): (
        <PrivateContent />
      )}

      <AccountHeaderMain className='mb-2 mt-4' title="Owned Teams" label="Created teams to contribute." />
      {user.showPersonalTeams ? (
        <SharedPersonalTeams username={params.username} />
      ): (
        <PrivateContent />
      )}

      <AccountHeaderMain className='mb-2 mt-4' title="Joined Teams" label="Joined teams with other developers to contribute." />
      {user.showJoinedTeams ? (
        <SharedJoinedTeams username={params.username} />
      ): (
        <PrivateContent />
      )}
    </div>
  );
}
 
export default ShareProfile;
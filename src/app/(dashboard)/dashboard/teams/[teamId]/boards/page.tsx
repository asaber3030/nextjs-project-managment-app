import db from "@/services/prisma"

import { userSelect } from "@/actions/config"
import { getTeamMembers } from "@/actions/team"

import { OneBoard } from "@/app/_components/app/projects/boards/board"
import { SearchBoardsByMembers } from "@/app/_components/app/projects/boards/search-team-boards"
import { EmptyData } from "@/components/empty-data"
import { Title } from "@/components/title"

import { TeamProjectBoard, TeamMember } from "@/types"
import { isMemberOfTeam } from "@/actions/check"
import { notFound } from "next/navigation"

type Props = {
  params: { teamId: string }, 
  searchParams: {
    owner: string,
  }
}

const TeamIDBoards = async ({ params, searchParams }: Props) => {
  
  const teamId = +params.teamId
  const members = await getTeamMembers(teamId)
  const isMember = await isMemberOfTeam(+params.teamId)

  let teamBoards = await db.teamProjectBoards.findMany({
    where: { project: { teamId } },
    include: { owner: { select: userSelect } },
    orderBy: { id: 'desc' },
  })

  if (searchParams.owner) {
    teamBoards = await db.teamProjectBoards.findMany({
      where: { project: { teamId }, ownerId: +searchParams.owner },
      include: { owner: { select: userSelect } },
      orderBy: { id: 'desc' },
    })
    console.log("With owner")
  }

  if (!isMember) return notFound();
  if (teamBoards.length === 0) return <EmptyData title="No Boards Created in this team." />

  return (
    <div>
      <Title label="All Team Boards" parentClassName="mb-4">
        <SearchBoardsByMembers members={members.members as TeamMember[]} />
      </Title>
      <div className='grid grid-cols-1 xl:grid-cols-3 gap-2'>
        {teamBoards.map(board => (
          <OneBoard key={`team-boards-${board.id}`} board={board as TeamProjectBoard} />
        ))}
      </div>
    </div>
  );
}
 
export default TeamIDBoards;
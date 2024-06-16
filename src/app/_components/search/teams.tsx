import Link from "next/link";

import { route } from "@/lib/route";

import { EmptyData } from "@/components/empty-data";
import { Team } from "@/types";

type Props = {
  teams: Team[]
}

export const ListSearchedTeams = ({ teams }: Props) => {
  return teams.length === 0 ? (
    <EmptyData title="No teams result." />
  ): (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-2">
      {teams.map(team => (
        <Link href={route.viewTeam(team.id)} key={`teams-searched-${team.id}`} className='bg-white rounded-md border p-2 shadow-sm'>
          <h3 className="text-lg font-medium">{team.name}</h3>
          <p>{team.members?.length} members</p>
        </Link>
      ))}
    </div>
  )
}
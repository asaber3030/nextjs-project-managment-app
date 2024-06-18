import { getJoinedTeamsByUsername } from "@/actions/user-data";
import { EmptyState } from "@/components/empty-state";
import { formatDate } from "@/lib/date";

export const SharedJoinedTeams = async ({ username }: { username: string }) => {
  
  const teams = await getJoinedTeamsByUsername(username)

  return ( 
    <div>
      {teams.length === 0 && (
        <EmptyState title="No joined teams." />
      )}

      <div className='grid xl:grid-cols-3 grid-cols-1 gap-2'>
        {teams.map(team => (
          <div key={`shared-joined-team-${team.id}`} className='p-2 px-4 rounded-md bg-secondary border'>
            <h3>{team.team.name}</h3>
            <p className='text-gray-500 text-xs'>Joined in {formatDate(team.joinedIn)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
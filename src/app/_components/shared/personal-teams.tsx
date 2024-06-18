import { getPersonalProjectsByUsername, getTeamsByUsername } from "@/actions/user-data";
import { EmptyState } from "@/components/empty-state";

export const SharedPersonalTeams = async ({ username }: { username: string }) => {
  
  const teams = await getTeamsByUsername(username)

  return ( 
    <div>
      {teams.length === 0 && (
        <EmptyState title="No teams." />
      )}

      <div className='grid xl:grid-cols-3 grid-cols-1 gap-2'>
        {teams.map(team => (
          <div key={`shared-team-${team.id}`} className='p-2 px-4 rounded-md bg-secondary border'>
            <h3>{team.name}</h3>
            <p className='text-gray-500 text-xs'>{team._count.members} members</p>
          </div>
        ))}
      </div>
    </div>
  );
}
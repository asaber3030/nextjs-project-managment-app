import { TeamMember } from "@/types/user";
import { UserHoverCard } from "../../user/hover-card";
import { EmptyData } from "@/components/empty-data";

type Props = {
  members: TeamMember[]
}
export const DisplayTeamMembers = ({ members }: Props) => {
  
  if (members.length === 0) {
    return (
      <section>
        <h1 className='text-xl font-semibold mb-2'>Team Members</h1>
        <EmptyData className='mt-2' label='No team members added!' />
      </section>
    )
  }

  return (
    <section>
      <h1 className='text-xl font-semibold mb-2'>Team Members</h1>
      <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-3 gap-1">
        {members.map((member) => (
          <div className='flex items-center border p-4 rounded-sm shadow-sm gap-3 hover:bg-border transition-all cursor-pointer select-none'>
            <UserHoverCard user={member.user} date={member.joinedIn} />
            <div>
              <h1>{member.user.name}</h1>
              <p className='text-xs text-gray-500'>{member.user.jobTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
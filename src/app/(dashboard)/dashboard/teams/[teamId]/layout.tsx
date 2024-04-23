import { TeamSidebarSettings } from "@/app/_components/app/teams/team-sidebar-settings";

type Props = {
  children: React.ReactNode,
  params: { teamId: string }
}

const TeamLayout = ({ children, params }: Props) => {
  return (
    <div className='xl:flex gap-4'>
      <TeamSidebarSettings teamId={parseInt(params.teamId)} />
      <div className='xl:w-full w-full'>
        {children}
      </div>
    </div>
  );
}
 
export default TeamLayout;
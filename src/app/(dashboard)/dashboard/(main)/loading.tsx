import { ProjectSkeleton } from "@/app/_components/skeleton/project-skeleton";
import { TeamSkeleton } from "@/app/_components/skeleton/team-skeleton";
import { Title } from "@/components/title";
import { Folder, UserPlus, Users } from "lucide-react";

const LoadingDashboard = () => {
  return (
    <div className='space-y-4'>

      {/* My teams */}
      <section>
        <Title parentClassName="mb-4" label='My Teams' icon={Users} labelClassName='font-normal' />
        <TeamSkeleton repeat={3} />
      </section>

      {/* Joined teams */}
      <section>
        <Title parentClassName="mb-4" label='Joined Teams' icon={UserPlus} labelClassName='font-normal' />
        <TeamSkeleton repeat={5} />
      </section>

      {/* My Personal Projects */}
      <section>
        <Title parentClassName="mb-4" label='My Personal Projects' icon={Folder} labelClassName='font-normal' />
        <ProjectSkeleton repeat={2} />
      </section>

    </div>
  );
}
 
export default LoadingDashboard;
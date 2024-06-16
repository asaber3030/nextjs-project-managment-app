import { Title } from "@/components/title";
import { Skeleton } from "@/components/ui/skeleton";
import { TeamSkeleton } from "@/app/_components/skeleton/team-skeleton";

const LoadingTeams = async () => {

  return (
    <div>
      <Title label="Created Teams" />

      <section className='mt-4'>
        <div className='flex mb-4'>
          <Skeleton className='h-9 w-20' />
        </div>

        <TeamSkeleton repeat={4} />
      </section>

      <section className='mt-4'>
        <div className='flex mb-4'>
          <Skeleton className='h-9 w-20' />
        </div>

        <TeamSkeleton repeat={4} />
      </section>
    </div>
  );
}
 
export default LoadingTeams;
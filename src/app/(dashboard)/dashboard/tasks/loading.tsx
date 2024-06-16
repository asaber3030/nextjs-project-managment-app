import { TaskSkeleton } from "@/app/_components/skeleton/task-skeleton";
import { Title } from "@/components/title";

const LoadingTasks = () => {
  return (
    <div className='xl:container'>
      <Title label="My Tasks" parentClassName="mb-4" hasBottomBorder  />
      <TaskSkeleton repeat={4} />
    </div>
  );
}
 
export default LoadingTasks;
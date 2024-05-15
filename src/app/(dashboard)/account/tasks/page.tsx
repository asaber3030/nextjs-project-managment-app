import { getPersonalTasks } from "@/actions/user-data";

import { AccountHeaderMain } from "@/app/_components/account/title-section";
import { OnePersonalTask } from "@/app/_components/app/personal/tasks/task";
import { CreatePersonalTask } from "@/app/_components/app/personal/tasks/actions/create";

const MyTasksPage = async () => {

  const tasks = await getPersonalTasks()

  return (
    <div>
      <div className='flex justify-between'>
        <AccountHeaderMain title="My Tasks" className='mb-1' />
        <CreatePersonalTask className='rounded-sm size-6' />
      </div>

      <section className='grid xl:grid-cols-2 gap-2 grid-cols-1'>
        {tasks.map(task => (
          <OnePersonalTask key={`personal-task-${task.id}`} task={task} />
        ))}
      </section>
      
      
    </div>
  );
}
 
export default MyTasksPage;
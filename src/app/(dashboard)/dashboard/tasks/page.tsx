import { getPersonalTasks } from "@/actions/user-data";

import { ListPersonalTasks } from "@/app/_components/app/personal/tasks/list";

import { Task } from "@/types";
import { PersonalTaskStatus } from "@prisma/client";

type Props = {
  searchParams: {
    query: string,
    orderBy: string,
    orderType: 'asc' | 'desc',
    status: PersonalTaskStatus
  }
}

const PersonalTasksPage = async ({ searchParams }: Props) => {

  const tasks = await getPersonalTasks(
    searchParams.query ?? '', 
    searchParams.orderBy ?? 'id', 
    searchParams.orderType ?? 'desc'
  ) as unknown as Task[]

  return ( 
    <ListPersonalTasks tasks={tasks} />
  );
}

export default PersonalTasksPage;
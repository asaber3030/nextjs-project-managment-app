import { diffForHuman, formatDate } from "@/lib/date";
import { badgeVariantForPersonal } from "@/lib/utils";

import { Task } from "@/types";

import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ChangePersonalTaskStatus } from "./actions/change";
import { DeletePersonalTask } from "./actions/delete";
import { UpdatePersonalTask } from "./actions/update";

type Props = { task: Task }

export const OnePersonalTask = ({ task }: Props) => {
  return ( 
    <div className='flex flex-col justify-between bg-secondary relative p-4 shadow-sm before:bg-blue-300 before:absolute before:w-full before:h-full before:-z-10 before:-right-1.5 before:-top-1.5 before:shadow-sm'>
     
      <div className='space-y-3'>
        <h3 className="text-lg font-medium">{task.title}</h3>
        <p className='text-sm leading-5'>{task.description }</p>

      </div>

      <div className='mt-4'>
        <div className='flex justify-between'>
          <p className='text-gray-500 flex items-center gap-2 text-xs'><Clock className='size-3' /> {diffForHuman(task.createdAt)}</p>
          <p className='text-gray-500 flex items-center gap-2 text-xs'><Clock className='size-3' /> {formatDate(task.finishAt)}</p>
        </div>

        <div className='flex items-center mt-2 justify-between'>
          <div className='flex items-center gap-2 justify-between'>
            <ChangePersonalTaskStatus task={task} />
            <DeletePersonalTask task={task} />
            <UpdatePersonalTask task={task} />
          </div>
          <Badge className='h-fit font-medium' variant={badgeVariantForPersonal(task.status, true)}>{task.status}</Badge>
        </div>
      </div>

    </div>
  );
}
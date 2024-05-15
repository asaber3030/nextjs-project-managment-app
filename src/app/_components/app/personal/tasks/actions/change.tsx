"use client";

import { usePersonalTask } from "@/hooks/usePersonal";
import { cn } from "@/lib/utils";

import { Task } from "@/types";
import { PersonalTaskStatus } from "@prisma/client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Props = { 
  task: Task
  label?: string,
  className?: string
}

export const ChangePersonalTaskStatus = ({ className, label = 'Change', task }: Props) => {

  const { changeStatusMutate, changeStatusPending } = usePersonalTask(task.id)

  const [newStatus, setNewStatus] = useState<PersonalTaskStatus>(task.status)
  const [modal, setModal] = useState<boolean>(false)

  const handleChange = () => {
    changeStatusMutate({
      taskId: task.id,
      status: newStatus
    })
    setModal(false)
  }

  return ( 
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger className={cn('p-0 text-sm hover:underline', className)}>{label}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Task Status - [Pending, Todo, Done]</DialogTitle>
        </DialogHeader>

        <Select defaultValue={newStatus} onValueChange={(value: PersonalTaskStatus) => setNewStatus(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={PersonalTaskStatus.Done}>{PersonalTaskStatus.Done}</SelectItem>
            <SelectItem value={PersonalTaskStatus.Pending}>{PersonalTaskStatus.Pending}</SelectItem>
            <SelectItem value={PersonalTaskStatus.Todo}>{PersonalTaskStatus.Todo}</SelectItem>
          </SelectContent>
        </Select>

        <DialogFooter>
          <Button variant='outline' onClick={() => setModal(false)}>Cancel</Button>
          <Button variant='destructive' onClick={handleChange}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
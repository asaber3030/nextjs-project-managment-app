"use client";

import { usePersonalTask } from "@/hooks/usePersonal";
import { cn } from "@/lib/utils";

import { Task } from "@/types";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Props = { 
  task: Task
  label?: string,
  className?: string
}

export const DeletePersonalTask = ({ className, label = 'Delete', task }: Props) => {

  const { deleteMutate } = usePersonalTask(task.id)

  const [modal, setModal] = useState<boolean>(false)

  const handleChange = () => {
    deleteMutate({
      taskId: task.id
    })
    setModal(false)
  }

  return ( 
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger className={cn('p-0 text-sm hover:underline', className)}>{label}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Task - #{task.id}</DialogTitle>
          <DialogDescription>Once you delete this task you won&apos;t be able to restore it again.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant='outline' onClick={() => setModal(false)}>Cancel</Button>
          <Button variant='destructive' onClick={handleChange}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
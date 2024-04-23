"use client";

import Link from "next/link";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { FolderPlus, Plus, Trash } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoadingButton } from "@/components/loading-button";
import { TeamHeaderSection } from "../../team-section-header";

import { Team } from "@/types/user";
import { TeamProject } from "@prisma/client";
import { CreateProjectSchema } from "@/schema";
import { createTeamProject, updateTeamProject } from "@/actions/team";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { QueryKeys } from "@/lib/query-keys";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button";
import { route } from "@/lib/route";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";

type Props = {project: TeamProject }

export const DeleteProjectView = ({ project }: Props) => {

  const { data } = useSession();
  const { push } = useRouter()
  const { invalidateQueries } = useQueryClient()

  const projectNameRef = useRef<HTMLInputElement>(null)

  const updateMutation = useMutation({
    mutationFn: async () => {},
    onSuccess: (data) => {
      
    }
  })

  const handleDelete = () => {
    if (projectNameRef.current?.value === project.name) {
      updateMutation.mutate()
      return;
    }
    toast.message("Invalid project name!")
  }

  return ( 
    <div>

      <TeamHeaderSection icon={Plus} label={`Update project - ${project.name}`} />

      <section>

        <Alert>
          <Trash className="h-4 w-4" stroke='red' />
          <AlertTitle className='text-red-500 font-semibold'>Deleting Project</AlertTitle>
          <AlertDescription>
            <ul className='mt-3 space-y-1 list-disc ml-5 text-gray-500'>
              <li>Once you delete this project you won't be able to restore it again.</li>
              <li>Deleting the project will cause to delete everthing related to this project</li>
              <li>Deleting a project will erase its data such as tasks, boards, and calendars.</li>
            </ul>
            <div className='mt-4'>
              <div className='flex gap-1'>
                <Link href={route.viewTeam(project.teamId)}><Button variant='outline' size='sm'>Cancel</Button></Link>
                <Dialog>
                  <DialogTrigger className='bg-red-500 px-4 rounded-md text-white hover:bg-red-700 transition-all'>Delete</DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently delete your project
                        and remove your data from our servers.
                      </DialogDescription>
                    </DialogHeader>
                    <Label>Please type <b>"{project.name}"</b></Label>
                    <Input ref={projectNameRef} placeholder={`Type "${project.name}" to delete the project!`} />
                    <DialogFooter>
                      <Button size='sm' variant='destructive' onClick={handleDelete}>Confirm</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </AlertDescription>
        </Alert>

      </section>

    </div>
  );
}
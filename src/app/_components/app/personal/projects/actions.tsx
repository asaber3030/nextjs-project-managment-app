import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks";
import { route } from "@/lib/route";
import { Project } from "@/types";
import { Edit2, Eye, Trash } from "lucide-react";

type Props = { project: Project }

export const PersonalProjectActions = ({ project }: Props) => {

  const current = useUser()

  if (current?.id !== project.ownerId) return null
  if (!project) return null

  return ( 
    <div className='flex gap-1 mt-4'>
      <Link href={route.updatePersonalProject(project.id)}><Button variant='outline'><Edit2 className='text-gray-500 size-4' /></Button></Link>
      <Link href={route.deletePersonalProject(project.id)}><Button variant='outline'><Trash className='text-gray-500 size-4' /></Button></Link>
    </div>
  );
}
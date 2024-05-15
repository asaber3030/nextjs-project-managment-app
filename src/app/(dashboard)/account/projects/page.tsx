import Link from "next/link";

import { getPersonalProjects } from "@/actions/user-data";

import { AccountHeaderMain } from "@/app/_components/account/title-section";
import { CreatePersonalTask } from "@/app/_components/app/personal/tasks/actions/create";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { diffForHuman } from "@/lib/date";
import { route } from "@/lib/route";
import { Edit2, Trash } from "lucide-react";

const MyPersonalProjectsPage = async () => {

  const projects = await getPersonalProjects()

  return (
    <div>
      <div className='flex justify-between mb-2'>
        <AccountHeaderMain title="My Projects" className='mb-1' />
        <Link href={route.createPersonalProject()}><Button size='sm' variant='outline'>Create Project</Button></Link>
      </div>

      <Table>
        <TableCaption>A list of my personal projects.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Github</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Last Update</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map(project => (
            <TableRow key={`idx-table-row-${project.id}`}>
              <TableCell className="font-medium">{project.id}</TableCell>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.github ? <a href={project.github} target='_blank' className="text-xs text-blue-600">Github</a> : 'No Repo'}</TableCell>
              <TableCell>{project.url ? <a href={project.url} target='_blank' className="text-xs text-blue-600">URL</a> : 'No Project URL'}</TableCell>
              <TableCell>{diffForHuman(project.updatedAt)}</TableCell>
              <TableCell>{diffForHuman(project.createdAt)}</TableCell>
              <TableCell className='flex gap-1'>
                <Link href={route.updatePersonalProject(project.id)}><Button variant='outline'><Edit2 className='size-4' /></Button></Link>
                <Link href={route.deletePersonalProject(project.id)}><Button variant='outline'><Trash className='size-4' /></Button></Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
 
export default MyPersonalProjectsPage;
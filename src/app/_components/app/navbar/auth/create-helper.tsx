import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Folder, Landmark, Plus, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export const CreateHelperNavbarDropdown = () => {
  
  const router = useRouter();

  return ( 
    <DropdownMenu>
      <DropdownMenuTrigger className='text-white p-0.5 py-0 px-2 hover:bg-secondaryMain transition-all rounded-md'>
        <Plus className='size-4' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[200px]'>
        <DropdownMenuItem onClick={() => router.push('/dashboard')} className='flex gap-4'><Landmark className='size-4' /> Organization</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/dashboard')} className='flex gap-4'><Users className='size-4' /> Team</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/dashboard')} className='flex gap-4'><Folder className='size-4' /> Project</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
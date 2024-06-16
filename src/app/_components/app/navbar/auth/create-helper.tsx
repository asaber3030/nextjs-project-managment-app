import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { route } from "@/lib/route";
import { Folder, Landmark, Plus, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { CreateTeamButton } from "../../teams/create-team-button";

export const CreateHelperNavbarDropdown = () => {
  
  const router = useRouter();

  return ( 
    <DropdownMenu>
      <DropdownMenuTrigger className='text-white p-0.5 py-0 px-2 hover:bg-secondaryMain transition-all rounded-md'>
        <Plus className='size-4' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[200px]'>
        <CreateTeamButton label="Create Team" className='bg-transparent w-full justify-start font-normal px-2 hover:bg-secondary text-sm gap-4' />
        <DropdownMenuItem onClick={() => router.push(route.createPersonalProject())} className='flex gap-4'><Folder className='size-4' /> Project</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
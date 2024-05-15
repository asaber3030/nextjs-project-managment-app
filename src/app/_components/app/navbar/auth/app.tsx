import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Cog } from "lucide-react";

export const AppLinksNavbarDropdown = () => {
  return ( 
    <DropdownMenu>
      <DropdownMenuTrigger className='text-white p-0.5 py-0 px-2 hover:bg-secondaryMain transition-all rounded-md'>
        <Cog className='size-4' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[200px]'>
        <DropdownMenuItem>Invitations</DropdownMenuItem>
        <DropdownMenuItem>Invitations</DropdownMenuItem>
        <DropdownMenuItem>Invitations</DropdownMenuItem>
        <DropdownMenuItem>Invitations</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
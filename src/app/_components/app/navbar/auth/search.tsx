import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search } from "lucide-react";
import { SearchApp } from "../../search-app";

export const SearchNavbarDropdown = () => {
  return ( 
    <DropdownMenu>
      <DropdownMenuTrigger className='text-white p-0.5 py-0 px-2 hover:bg-secondaryMain transition-all rounded-md'>
        <Search className='size-4' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[500px]'>
        <SearchApp />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
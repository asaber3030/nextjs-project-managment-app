import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SunMoon } from "lucide-react";
import { ThemeToggler } from "@/components/toggle-theme";

export const ThemeTogglerNavbarDropdown = () => {
  return ( 
    <DropdownMenu>
      <DropdownMenuTrigger className='text-white p-0.5 py-0 px-2 hover:bg-secondaryMain transition-all rounded-md'>
        <SunMoon className='size-4' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[350px] p-4'>
        <ThemeToggler />
      </DropdownMenuContent>
    </DropdownMenu>

  );
}
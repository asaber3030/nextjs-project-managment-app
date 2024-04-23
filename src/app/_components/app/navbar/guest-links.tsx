import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";

import Link from "next/link";

export const GuestLinks = () => {
  return ( 
    <div className='space-x-1'>
      <Link href='/login'><Button variant='secondaryMain'><LogIn className='size-4' /> Login</Button></Link>
      <Link href='/register'><Button variant='secondaryMain'><UserPlus className='size-4' /> Create an account</Button></Link>
    </div>
  );
}
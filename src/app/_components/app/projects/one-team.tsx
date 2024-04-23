import { Button } from "@/components/ui/button";
import { Cog } from "lucide-react";

type Props = {
 
}

export const OneTeam = ({}: Props) => {
  return ( 
    <div className='rounded-md shadow-sm border p-4 '>
      <section className="flex items-center justify-between">
        <h1 className='bg-gray text-xl'>Team name</h1>
        <Button size='sm' className='h-8 hover:bg-grayMain' variant='ghost'><Cog className='size-4' /></Button>
      </section>
    </div>
  );
}
import { arr } from "@/lib/utils";
import { OneTeam } from "./one-team";

type Props = {
 
}

export const TeamsListDashboard = ({  }: Props) => {
  return ( 
    <div className='grid grid-cols-4 gap-2'>
      {arr(4).map((_, idx) => (
        <OneTeam 
          key={`team-${idx}`}
        />
      ))}
    </div>
  );
}
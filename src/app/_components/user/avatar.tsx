import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
  photo: string | null,
  className?: string
}
export const UserAvatar = ({ photo, className }: Props) => {
  return ( 
    <Avatar className={cn(className)}>
      <AvatarImage src={photo ?? '/images/user-svg.svg'} />
      <AvatarFallback>...</AvatarFallback>
    </Avatar>  
  );
}
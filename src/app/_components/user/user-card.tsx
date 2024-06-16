import Link from "next/link";
import { UserHoverCard } from "./hover-card";
import { User } from "@/types";

type Props = {
  date?: Date
  user: User
}

export const UserNormalCard = ({ date, user }: Props) => {
  return ( 
    <div className="flex gap-2 items-center">
      <UserHoverCard date={date ?? user.createdAt} user={user} />
      <div>
        <Link className='text-sm text-gray-500' href={``}>@{user.username} - {user.jobTitle}</Link>
      </div>
    </div>
  );
}
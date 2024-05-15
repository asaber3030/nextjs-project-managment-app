import { UserHoverCard } from "@/app/_components/user/hover-card";
import { diffForHuman } from "@/lib/date";
import { route } from "@/lib/route";
import { TeamTaskReply, User } from "@/types";

type Props = {
  reply: TeamTaskReply
}

export const TaskReply = ({ reply }: Props) => {

  const { user } = reply

  if (!user) return null

  return ( 
    <div className='xl:flex gap-4 py-4'>
      <div className='size-10'>
        <UserHoverCard user={user as User} date={reply.createdAt} label="Reply sent" />
      </div>
      <div className='w-full'>
        <div className='mb-4'>
          <h1 className='text-sm flex justify-between'>{user.displayName ?? user.name}  {reply.url && <a href="" className='text-blue-600 text-xs'>Attached URL</a>}</h1>
          <p className='text-xs text-gray-400'>@{user.username}</p>
        </div>
        <div className='p-4 rounded-md shadow-md bg-white'>
          <h2 className='text-lg font-medium'>{reply.title}</h2>
          <p className='mb-4 text-xs text-gray-500'>{diffForHuman(reply.createdAt)}</p>
          <p className='text-sm'>{reply.description}</p>
        </div>
      </div>
    </div>
  );
}
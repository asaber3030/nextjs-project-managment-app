"use client";

import Link from "next/link";

import { useUser } from "@/hooks";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { BoardActions } from "./board-actions-list";
import { TeamProjectBoard } from "@/types";
import { route } from "@/lib/route";

type Props = { board: TeamProjectBoard }

export const OneBoard = ({ board }: Props) => {

  const user = useUser();

  return ( 
    <div 
      className={'rounded-sm shadow-sm p-4 flex h-fit flex-col justify-between'}
      style={{
        backgroundColor: board.backgroundColor,
        color: board.textColor
      }}>
      
      <h2 className='text-lg text-center font-medium'>{board.title}</h2>
      <p className='text-xs text-center mt-2 opacity-70'>{board.description}</p>
      
      <section className='text-center w-fit flex flex-col justify-center mt-4'>
        <Avatar className='mx-auto'>
          <AvatarImage src={board.owner.photo} />
          <AvatarFallback>{board.owner.name[0]}</AvatarFallback>
        </Avatar>
        <h3 className='font-semibold'>{board.owner.name}</h3>
      </section>
      
      {user?.id == board.ownerId && (
        <BoardActions board={board} />
      )}
    </div>
  );
}
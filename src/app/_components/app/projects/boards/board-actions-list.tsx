"use client";

import { UpdateBoardAction } from "./update-board";
import { DeleteBoardAction } from "./delete-board";
import { TeamProjectBoard } from "@/types";

type Props = { 
  board: TeamProjectBoard
}

export const BoardActions = ({ board }: Props) => {
  return ( 
    <div className='flex gap-0.5 mt-4'>
      <UpdateBoardAction backgroundColor={board.backgroundColor} textColor={board.textColor} board={board} />
      <DeleteBoardAction backgroundColor={board.backgroundColor} textColor={board.textColor} board={board} />
    </div>
  );
}
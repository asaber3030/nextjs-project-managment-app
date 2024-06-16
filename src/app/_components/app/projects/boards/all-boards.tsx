"use client";

import React from "react";

import { useQuery } from "@tanstack/react-query";

import { TeamProject, TeamProjectBoard } from "@/types";
import { getProjectBoards } from "@/actions/project";
import { QueryKeys } from "@/lib/query-keys";

import { EmptyData } from "@/components/empty-data";
import { BoardSkeleton } from "@/app/_components/skeleton/board-skeleton";
import { OneBoard } from "./board";

type Props = { project: TeamProject }

export const AllProjectBoards = ({ project }: Props) => {

  const queryBoards = useQuery({
    queryKey: QueryKeys.teamProjectBoards(project.teamId, project.id),
    queryFn: () => getProjectBoards(project.id),
  })

  const boards = queryBoards.data?.boards as TeamProjectBoard[]

  return (
    <section className='mt-4'>
      
      <h1 className='text-xl font-medium mb-2'>Project Boards</h1>

      {!queryBoards.isFetched && queryBoards.isLoading && (
        <BoardSkeleton repeat={3} />
      )}

      {queryBoards.isFetched && boards?.length == 0 && (
        <EmptyData label="No boards" />
      )}

      {boards?.length > 0 && queryBoards.isFetched && (
        <div className='grid lg:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-2'>
          {boards?.map(board => (
            <OneBoard 
              board={board as any} 
              key={`board-view-idx-${board.id}`} 
            />
          ))}
        </div>
      )}
    </section>
  );
}

AllProjectBoards.displayName = "AllProjectBoards";

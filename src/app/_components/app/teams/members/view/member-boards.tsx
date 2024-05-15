"use client";

import React, { FormEvent } from "react";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemberBoards } from "@/hooks/useMembers";

import { Title } from "@/components/title";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EmptyData } from "@/components/empty-data";
import { OneBoard } from "../../../projects/boards/board";

import { TeamProject, TeamProjectBoard } from "@/types";

import { route } from "@/lib/route";
import { EmptyState } from "@/components/empty-state";

type Props = {
  projects: TeamProject[],
  teamId: number,
  memberId: number
}

export const MemberBoards = ({ projects, teamId, memberId }: Props) => {

  const searchParams = useSearchParams()
  const projectParam = Number(searchParams.get('project')) ?? projects[0]?.id

  const [selectedProject, setSelectedProject] = useState<number>(projectParam)

  const router = useRouter()

  const { boards, boardsLoading, boardsRefetching, refetchBoards } = useMemberBoards(
    teamId, 
    memberId, 
    selectedProject,
  );

  const handleFilter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    refetchBoards()
  }
  
  const clearFilter = () => {
    router.push(route.viewTeamMember(teamId, memberId))
    refetchBoards()
  }

  useEffect(() => {
    refetchBoards()
  }, [selectedProject, refetchBoards])

  return ( 
    <div>

      {boardsLoading ? (
        <Title label="Boards" />
      ): (
        <React.Fragment>
          {boards?.length === 0 ? (
            <Title label="Boards" />
          ): (
            <Title label={`Boards`} actionsClassName='w-[30%]'>
              
              <form onSubmit={handleFilter} className='w-full items-start flex gap-1'>

                <Select defaultValue={String(projects[0]?.id)} onValueChange={(value: string) => setSelectedProject(Number(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Projects" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map(project => (
                      <SelectItem key={`item-select-project-${project.id}`} value={String(project.id)}>{project.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              
              </form>

            </Title>
          )}
        </React.Fragment>
      )}
      
      {boardsRefetching || boardsLoading ? (
        <section className='mt-2'>
          <LoadingSpinner />
        </section>
      ): (
        <React.Fragment>
          {boards?.length && boards?.length > 0 ? (
            <section className="grid xl:grid-cols-3 grid-cols-1 mt-2 gap-2">
              {boards?.map((board) => (
                <OneBoard
                  key={`board-view-${board.id}`} 
                  board={board as unknown as TeamProjectBoard}
                />
              ))}
            </section>
          ): (
            <EmptyState className="mt-2" title={`No boards`} />
          )}
        </React.Fragment>
      )}
    </div>
  );
}
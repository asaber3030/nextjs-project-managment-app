import { searchProjects, searchTasks, searchTeams } from "@/actions/search";

import { Title } from "@/components/title";
import { SearchApp } from "@/app/_components/app/search-app";
import { ListSearchedTeamTasks } from "@/app/_components/search/project-tasks";
import { ListSearchedTeamProjects } from "@/app/_components/search/team-projects";
import { ListSearchedTeams } from "@/app/_components/search/teams";

import { Team, TeamProject, TeamProjectTask } from "@/types";

type Props = {
  searchParams: { query?: string }
}

const SearchPage = async ({ searchParams }: Props) => {

  const teams = await searchTeams(searchParams.query)
  const teamProjects = await searchProjects(searchParams.query)
  const teamTasks = await searchTasks(searchParams.query)

  return (
    <div>
      
      <div className='flex justify-between items-center'>
        <h1 className="text-3xl font-bold mb-4 text-ellipsis overflow-hidden max-w-[50%]">Showing results for <b>&quot;{searchParams.query}&quot;</b></h1>
        <SearchApp value={searchParams.query} />
      </div>

      <div className='space-y-4'>

        <section>
          <Title label='Teams' disableIcon parentClassName="mb-2" />
          <ListSearchedTeams teams={teams as Team[]} />
        </section>

        <section>
          <Title label='Teams Projects' disableIcon parentClassName="mb-2" />
          <ListSearchedTeamProjects projects={teamProjects as TeamProject[]} />
        </section>

        <section>
          <Title label='Teams Tasks' disableIcon parentClassName="mb-2" />
          <ListSearchedTeamTasks tasks={teamTasks  as TeamProjectTask[]} />
        </section>

      </div>

    </div>
  );
}
 
export default SearchPage;
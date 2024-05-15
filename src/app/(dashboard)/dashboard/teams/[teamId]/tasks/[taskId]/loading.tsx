import { SearchBoardsByMembers } from "@/app/_components/app/projects/boards/search-team-boards";
import { BoardSkeleton } from "@/app/_components/skeleton/board-skeleton";
import { Title } from "@/components/title";

type Props = {
 
}
const LoadingBoards = ({}: Props) => {
  return ( 
    <div>
      <Title label="All Team Boards" parentClassName="mb-4" />
      <BoardSkeleton />
    </div>
  );
}

export default LoadingBoards;
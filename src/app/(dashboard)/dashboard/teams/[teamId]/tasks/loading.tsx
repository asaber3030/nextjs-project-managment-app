import { BoardSkeleton } from "@/app/_components/skeleton/board-skeleton";
import { Title } from "@/components/title";

const LoadingBoards = () => {
  return ( 
    <div>
      <Title label="All Team Boards" parentClassName="mb-4" />
      <BoardSkeleton />
    </div>
  );
}

export default LoadingBoards;
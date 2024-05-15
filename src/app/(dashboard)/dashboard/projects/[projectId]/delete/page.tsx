import { getPersonalProject } from "@/actions/user-data";
import { DeletePersonalProjectView } from "@/app/_components/app/personal/projects/views/delete";
import { UpdatePersonalProjectView } from "@/app/_components/app/personal/projects/views/update";
import { Project } from "@/types";
import { notFound } from "next/navigation";

const DeletePersonalProjectPage = async ({ params }: { params: { projectId: string } }) => {

  const project = await getPersonalProject(Number(params.projectId))

  if (!project) return notFound()

  return (
    <DeletePersonalProjectView project={project as Project} />
  );
}
 
export default DeletePersonalProjectPage;
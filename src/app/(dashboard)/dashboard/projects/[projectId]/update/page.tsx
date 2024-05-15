import { getPersonalProject } from "@/actions/user-data";
import { UpdatePersonalProjectView } from "@/app/_components/app/personal/projects/views/update";
import { Project } from "@/types";
import { notFound } from "next/navigation";

const UpdatePersonalsProjectPage = async ({ params }: { params: { projectId: string } }) => {

  const project = await getPersonalProject(Number(params.projectId))

  if (!project) return notFound()

  return (
    <UpdatePersonalProjectView project={project as Project} />
  );
}
 
export default UpdatePersonalsProjectPage;
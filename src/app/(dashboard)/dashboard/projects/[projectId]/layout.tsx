import React from "react";

import { getCurrent, getPersonalProject } from "@/actions/user-data";
import { notFound } from "next/navigation";

const ProjectIDLayout = async ({ params, children }: { children: React.ReactNode, params: { projectId: string } }) => {

  const [project, current] = await Promise.all([getPersonalProject(Number(params.projectId)), getCurrent()])

  if (!project || !current) return notFound()
  if (project.ownerId !== current.id) return notFound()

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
}
 
export default ProjectIDLayout;
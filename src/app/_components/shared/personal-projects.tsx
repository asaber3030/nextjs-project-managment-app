import { getPersonalProjectsByUsername } from "@/actions/user-data";
import { EmptyState } from "@/components/empty-state";
import { formatDate } from "@/lib/date";

export const SharedPersonalProjects = async ({ username }: { username: string }) => {
  
  const projects = await getPersonalProjectsByUsername(username)

  return ( 
    <div>
      {projects.length === 0 && (
        <EmptyState title="No personal projects." />
      )}
      <div className='grid xl:grid-cols-3 grid-cols-1 gap-2'>
        {projects.map(project => (
          <div key={`shared-project-${project.id}`} className='bg-secondary p-2 px-4 border rounded-md flex justify-between items-center'>
            <div>
              <h2>{project.name}</h2>
              <p className='text-xs text-gray-500'>Created in {formatDate(project.createdAt)}</p>
            </div>
            <div className='flex gap-2'>
              {project.github && (
                <a className='text-blue-600 text-xs hover:underline' href={project.github} target='_blank'>Github</a>
              )}
              {project.url && (
                <a className='text-blue-600 text-xs hover:underline' href={project.url} target='_blank'>Preview</a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
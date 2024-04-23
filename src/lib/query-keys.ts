export const QueryKeys = {
  userTeams: () => ['user', 'teams'],
  teamProjects: (teamId: number) => ['user', 'teams', teamId, 'projects'],
  team: (teamId: number) => ['user', 'teams', teamId],
}
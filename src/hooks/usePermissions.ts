import { useContext } from "react";

import { GlobalPermissionsContext } from "@/providers/global-permissions";
import { TeamPermissionsContext } from "@/providers/team-permission";
import { TeamProjectPermissionsContext } from "@/providers/project-permissions";

import { GlobalPermissionsType, TeamPermissionsType, TeamProjectPermissionsType } from "@/types";

export function useGP(): GlobalPermissionsType {
  const permission = useContext(GlobalPermissionsContext)
  return permission
}
export function useTP(): TeamPermissionsType {
  const permission = useContext(TeamPermissionsContext)
  return permission
}
export function useTPP(): TeamProjectPermissionsType {
  const permission = useContext(TeamProjectPermissionsContext)
  return permission
}
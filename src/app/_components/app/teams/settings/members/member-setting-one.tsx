"use client";

import { LoadingButton } from "@/components/loading-button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { usePermissionActions } from "@/hooks/useTeams";
import { PermissionsMutatorsArray } from "@/lib/permission";
import { Permission, TeamPermission } from "@/types";
import { TeamRoles } from "@prisma/client";
import { useState } from "react";

type Props = {
  permission: Permission,
  teamId: number
}

export const MemberOneSetting = ({ teamId, permission }: Props) => {

  const currentPermissionMutators = permission.teamPermissions.map(item => item.whoCanDo)
  const [whoCanDo, setWhoCanDo] = useState<TeamRoles[]>(currentPermissionMutators)
  const { updatePermissionMutate, updatePermissionsLoading } = usePermissionActions()

  return ( 
    <div>

      <div className="flex gap-2 justify-start items-center py-2">
        <span className="flex size-1 rounded-full bg-sky-500" />
        <h3 className='leading-none text-sm text-gray-600 font-normal'>{permission.displayName}</h3>
      </div>
      
      <div className='flex items-center justify-between'>
        
        <ToggleGroup value={whoCanDo} onValueChange={setWhoCanDo as any} type='multiple' className="justify-start">
          {PermissionsMutatorsArray.map((mutator, idx) => (
            <ToggleGroupItem
              value={mutator}
              key={`perm-members-idx-${idx}`} 
              className='text-xs justify-start p-2 leading-none py-0.5' 
            >
              {mutator}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <LoadingButton
          loading={updatePermissionsLoading}
          onClick={() => {
            updatePermissionMutate({
              teamId,
              permissionId: permission.id,
              teamPermissions: permission.teamPermissions,
              whoCanDo
            })
          }}
          variant='outline'>
          Save
        </LoadingButton>
      </div>
    </div>
);
}
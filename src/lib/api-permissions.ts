import db from "@/services/prisma"

export async function hasAccessTo(tag: string, name: string, forWhom: {
  teamId: number,
  userId: number
}) {
  const permission = await db.permission.findUnique({
    where: { tag, name }
  })
  const teamMember = await db.teamMember.findFirst({
    where: { teamId: forWhom.teamId, userId: forWhom.userId }
  })

  if (permission && teamMember) {
    const teamPermission = await db.teamPermission.findMany({  
      where: {
        permissionId: permission.id,
        teamId: forWhom.teamId
      },
    })

    const whoCan = teamPermission?.map((per) => per.whoCanDo)

    if (!teamPermission) return false;

    if (!whoCan.includes(teamMember.role)) return false;

    if (whoCan.includes(teamMember.role)) return true;
  }

  return false
}
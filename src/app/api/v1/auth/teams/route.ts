import db from "@/services/prisma";

import { NextRequest } from "next/server";
import { createPagination, extractUser, response, verifyJWT } from "@/lib/api-utils";
import { unauthorizedResponse } from "@/lib/api-responses";

export type Props = {
  searchParams: { page: string, take: string }
}

export async function GET(request: NextRequest) {
  const isVerified = verifyJWT(request)
  const session = extractUser(request)

  const searchParams = request.nextUrl.searchParams
  const page = searchParams.get('page')
  const limit = searchParams.get('limit')

  if (isVerified && session) {

    const { skip, take } = createPagination(page ? +page : 0, limit ? +limit : 10)

    const teams = await db.project.findMany({
      where: { ownerId: session.user.id },
      orderBy: { id: 'desc' },
      skip,
      take
    })
    
    return response('User Teams', 200, {
      teams,
      skip,
      take,
      page
    })
  } else {
    return unauthorizedResponse()
  }
}
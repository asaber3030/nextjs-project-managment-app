import response from "@/lib/response";
import { authOptions } from "@/services/auth";

import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = getServerSession(authOptions)
  return response(200, 'User', session)
}
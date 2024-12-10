import db from "@/services/prisma"
import axios from "axios"

import { z } from "zod"
import { apiURL } from "@/lib/constants"

import { RegisterSchema } from "@/schema/user"

export async function registerAction(values: z.infer<typeof RegisterSchema>) {
  return axios
    .post(`${apiURL}/user/register`, values)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err.response.data
    })
}

export async function findUserByEmail(email: string) {
  return await db.user.findUnique({
    where: { email },
    include: { plan: true },
  })
}

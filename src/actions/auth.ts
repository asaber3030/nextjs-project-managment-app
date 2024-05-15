import { RegisterSchema, UserDetailsSchema } from "@/schema/user";
import { z } from "zod";

import axios from 'axios'
import { apiURL } from "@/lib/constants";
import { getCurrent } from "./user-data";
import db from "@/services/prisma";

export async function registerAction(values: z.infer<typeof RegisterSchema>) {
  return axios.post(`${apiURL}/user/register`, values).then((res) => {
    return res.data
  }).catch((err) => {
    return err.response.data
  })
}


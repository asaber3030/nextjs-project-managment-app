import { LoginSchema, RegisterSchema } from "@/schema/user";
import { z } from "zod";

import axios from 'axios'
import { apiURL } from "@/lib/constants";

export async function registerAction(values: z.infer<typeof RegisterSchema>) {
  return axios.post(`${apiURL}/user/register`, values).then((res) => {
    return res.data
  }).catch((err) => {
    return err.response.data
  })
}

import { response } from "./api-utils"

export function unauthorizedResponse(
  message: string = "Unauthorized.",
  status: number = 401,
  data?: any
) {
  return response(message, status, data)
}

export function notFoundResponse(message: string = "Not Found", status: number = 404, data?: any) {
  return response(message, status, data)
}

export function accessDeniedResponse(
  message: string = "Access denied to this action.",
  status: number = 401,
  data?: any
) {
  return response(message, status, data)
}

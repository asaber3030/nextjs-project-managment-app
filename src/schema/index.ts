import { z } from 'zod'

export const CreateTeamSchema = z.object({
  name: z.string().min(4, { message: "Team name must be at least 4 characters" }).max(25, { message: "Team name cannot be more than 25 characters" }),
  about: z.string().max(255, { message: "About cannot be more than 255 characters" }).optional(),
  emails: z.array(z.string()).optional()
})

export const CreateProjectSchema = z.object({
  name: z.string().min(4, { message: "Project name must be at least 4 characters" }).max(25, { message: "Project name cannot be more than 25 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }).max(255, { message: "Description cannot be more than 255 characters" }),
  github: z.string().optional(),
  url: z.string().optional(),
  notes: z.string().max(255, { message: "Notes cannot be more than 255 characters" }).optional(),
})

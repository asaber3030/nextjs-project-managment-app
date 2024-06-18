import { PersonalTaskStatus, Status } from "@prisma/client";
import { z } from "zod";

export const CreateTeamSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Team name must be at least 4 characters" })
    .max(25, { message: "Team name cannot be more than 25 characters" }),
  about: z
    .string()
    .max(255, { message: "About cannot be more than 255 characters" })
    .optional(),
  emails: z.array(z.string()).optional(),
});

export const UpdateTeamSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Team name must be at least 4 characters" })
    .max(25, { message: "Team name cannot be more than 25 characters" }),
  about: z
    .string()
    .max(255, { message: "About cannot be more than 255 characters" })
    .optional(),
});

export const CreateProjectSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Project name must be at least 4 characters" })
    .max(25, { message: "Project name cannot be more than 25 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(255, { message: "Description cannot be more than 255 characters" }),
  github: z.string().optional(),
  url: z.string().optional(),
  notes: z
    .string()
    .max(255, { message: "Notes cannot be more than 255 characters" })
    .optional(),
});

export const UpdateProjectTaskSchema = z.object({
  title: z
    .string()
    .min(4, { message: "Task title must be at least 4 characters" })
    .max(100, {
      message: "Task title name cannot be more than 100 characters",
    }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(255, { message: "Description cannot be more than 255 characters" }),
  url: z.string().optional(),
  notes: z
    .string()
    .max(255, { message: "Notes cannot be more than 255 characters" })
    .optional(),
  finishAt: z.any().optional(),
  status: z.enum([Status.Accepted, Status.Pending, Status.Refused]),
});

export const CreateProjectTaskSchema = z.object({
  title: z
    .string()
    .min(4, { message: "Task title must be at least 4 characters" })
    .max(100, {
      message: "Task title name cannot be more than 100 characters",
    }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(255, { message: "Description cannot be more than 255 characters" }),
  url: z.string().optional(),
  notes: z
    .string()
    .max(255, { message: "Notes cannot be more than 255 characters" })
    .optional(),
  finishAt: z.any().optional(),
  status: z.enum([Status.Accepted, Status.Pending, Status.Refused]),
  userId: z.array(z.number()),
});

export const UpdateProjectBoardSchema = z.object({
  title: z
    .string()
    .min(4, { message: "Task title must be at least 4 characters" })
    .max(100, {
      message: "Task title name cannot be more than 100 characters",
    }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(255, { message: "Description cannot be more than 255 characters" }),
  backgroundColor: z
    .string()
    .min(7, { message: "Please Provide a hexa color" }),
  textColor: z.string().min(7, { message: "Please Provide a hexa color" }),
});

export const CreateProjectBoardSchema = z.object({
  title: z
    .string()
    .min(4, { message: "Task title must be at least 4 characters" })
    .max(100, {
      message: "Task title name cannot be more than 100 characters",
    }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(255, { message: "Description cannot be more than 255 characters" }),
  backgroundColor: z
    .string()
    .min(7, { message: "Please Provide a hexa color" }),
  textColor: z.string().min(7, { message: "Please Provide a hexa color" }),
});

export const CreatePersonalProjectSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Project name must be at least 4 characters" })
    .max(25, { message: "Project name cannot be more than 25 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(255, { message: "Description cannot be more than 255 characters" }),
  github: z.string().optional(),
  url: z.string().optional(),
  notes: z
    .string()
    .max(255, { message: "Notes cannot be more than 255 characters" })
    .optional(),
});

export const PersonalProjectSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Project name must be at least 4 characters" })
    .max(25, { message: "Project name cannot be more than 25 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(255, { message: "Description cannot be more than 255 characters" }),
  github: z.string().optional(),
  url: z.string().optional(),
  notes: z
    .string()
    .max(255, { message: "Notes cannot be more than 255 characters" })
    .optional(),
});

export const PersonalTaskSchema = z.object({
  title: z
    .string()
    .min(4, { message: "Project name must be at least 4 characters" })
    .max(25, { message: "Project name cannot be more than 25 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(255, { message: "Description cannot be more than 255 characters" }),
  url: z.string().optional(),
  notes: z
    .string()
    .max(255, { message: "Notes cannot be more than 255 characters" })
    .optional(),
  status: z.enum([
    PersonalTaskStatus.Done,
    PersonalTaskStatus.Todo,
    PersonalTaskStatus.Pending,
  ]),
  finishAt: z.date().optional(),
});

export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Current Password is required." }),
    newPassword: z
      .string()
      .min(8, {
        message: "Please provide a strong password min 8 characters.",
      }),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Please provide a strong password min 8 characters.",
      }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const ChangeDirectCodeSchema = z.object({
  directCode: z
    .string()
    .min(8, { message: "Direct code must be at least 8 characters." }),
});

export const CreateTaskReply = z.object({
  title: z
    .string()
    .min(4, { message: "Title must be at least 4 characters" })
    .max(100, { message: "Title cannot be more than 100 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(255, { message: "Description cannot be more than 255 characters" }),
  url: z.string().optional(),
});

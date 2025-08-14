import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(1, "Description is required."),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(65535).optional(),
  description: z.string().min(1, "Description is required.").optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required.")
    .max(255)
    .optional()
    .nullable(),
  status: z.enum(["OPEN", "CLOSED", "IN_PROGRESS"]).optional(),
});

export const commentSchema = z.object({
  content: z.string().min(1, "Content is required."),
  userId: z.string().min(1, "userId is required.").max(255),
  issueId: z.string().min(1, "IssueId is required.").max(255),
});

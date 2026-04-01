import { z } from "zod";
import { validateImageFile } from "./common";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const eventCoverImageSchema = z.union([
  validateImageFile({ MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES }),
  z.url("Must be a valid URL"),
]);

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  role: z.string().min(1, "Role is required"),
  date: z.union([z.string(), z.date()]),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required"),
  coverImage: eventCoverImageSchema,
});

export type EventInput = z.infer<typeof eventSchema>;

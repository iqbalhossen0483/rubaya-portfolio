import { z } from "zod";
import { validateImageFile } from "./common";

export const highlightedPositionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
});

const MAX_FILE_SIZE = 500 * 1024; // 500KB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/svg+xml",
];

// Icon can be either an existing URL string OR a new File upload
const iconSchema = z.union([
  validateImageFile({ MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES }),
  z.url("Must be a valid URL"),
]);

export const activitySchema = z.object({
  label: z.string().min(1, "Label is required"),
  icon: iconSchema,
});

export const aboutSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  philosophy: z.string().min(1, "Philosophy is required"),
  highlightedPositions: z.array(highlightedPositionSchema),
  activities: z.array(activitySchema),
});

export type AboutFormValues = z.infer<typeof aboutSchema>;

import { z } from "zod";

const MAX_FILE_SIZE = 500 * 1024; // 500KB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const activitySchemaClient = z.object({
  label: z.string().min(1, "Label is required"),
  icon: z
    .any()
    .refine((files) => files?.length === 1, "Icon is required.")
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    )
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 500KB.`,
    ),
});

export const highlightedPositionSchemaClient = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
});

export const aboutSchemaClient = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  philosophy: z.string().min(1, "Philosophy is required"),
  highlightedPositions: z.array(highlightedPositionSchemaClient),
  activities: z.array(activitySchemaClient),
});

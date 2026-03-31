import { z } from "zod";

export const highlightedPositionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
});

const MAX_FILE_SIZE = 500 * 1024; // 500KB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// Icon can be either an existing URL string OR a new File upload
const iconSchema = z.union([
  z.url("Must be a valid URL"), // existing icon URL
  z
    .instanceof(File)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .jpeg, .png and .webp formats are supported.",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Max file size is 500KB.",
    }),
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

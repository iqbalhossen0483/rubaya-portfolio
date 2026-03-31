import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const heroSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  yearsOfExperience: z.string().optional().nullable(),
  countries: z.string().optional().nullable(),
  award: z.string().optional().nullable(),
  profile: z
    .any()
    .refine(
      (files) =>
        files?.length == 1
          ? ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type)
          : true,
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    )
    .refine(
      (files) =>
        files?.length == 1 ? files?.[0]?.size <= MAX_FILE_SIZE : true,
      `Max file size is 2MB.`,
    )
    .optional()
    .nullable(),
});

export const aboutSchema = z.object({
  content: z.string().min(1, "Content is required"),
  resumeUrl: z.url("Must be a valid URL").optional().nullable(),
});

export type HeroFormValues = z.infer<typeof heroSchema>;
export type AboutFormValues = z.infer<typeof aboutSchema>;

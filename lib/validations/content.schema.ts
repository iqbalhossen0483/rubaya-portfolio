import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const fileSchema = z
  .any()
  .transform((value) => {
    if (
      typeof window !== "undefined" &&
      (value instanceof FileList || Array.isArray(value))
    ) {
      return value[0] ?? value;
    }
    return value;
  })
  .refine(
    (value) =>
      typeof value === "string" ||
      value instanceof File ||
      value === null ||
      value === undefined,
    {
      message: "Invalid file input",
    },
  )
  .refine((value) => {
    if (typeof value === "string") return true;
    if (!(value instanceof File)) return true;

    return ACCEPTED_IMAGE_TYPES.includes(value.type);
  }, "Only .jpg, .jpeg and .png formats are supported.")
  .refine((value) => {
    if (!(value instanceof File)) return true;

    return value.size <= MAX_FILE_SIZE;
  }, "Max file size is 2MB.");

const profileSchema = z.union([
  fileSchema,
  z.url("Please provide a valid URL"),
]);

export const heroSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  description: z.string().min(1, "Description is required"),
  yearsOfExperience: z.string().min(1, "Years of experience is required"),
  countries: z.string().min(1, "Countries is required"),
  award: z.string().min(1, "Award is required"),
  profile: profileSchema,
});

export type HeroFormValues = z.infer<typeof heroSchema>;

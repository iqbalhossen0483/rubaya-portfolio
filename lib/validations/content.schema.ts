import { z } from "zod";
import { validateImageFile } from "./common";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const profileSchema = z.union([
  validateImageFile({ MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES }),
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

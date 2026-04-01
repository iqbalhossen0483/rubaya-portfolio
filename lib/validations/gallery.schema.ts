import { z } from "zod";
import { validateImageFile } from "./common";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const galleryImageSchema = z.union([
  validateImageFile({ MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES }),
  z.url("Must be a valid URL"),
]);

export const gallerySchema = z.object({
  caption: z.string().min(1, "Caption is required"),
  image: galleryImageSchema,
});

export type GalleryInput = z.infer<typeof gallerySchema>;

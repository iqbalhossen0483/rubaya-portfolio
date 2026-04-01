import { z } from "zod";
import { validateImageFile } from "./common";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/svg+xml",
];

const awardImageSchema = z.union([
  validateImageFile({ MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES }),
  z.url("Must be a valid URL"),
]);

export const awardSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  time_to_receipt: z.string().min(1, "Time to receipt is required"),
  image: awardImageSchema,
});

export type AwardInput = z.infer<typeof awardSchema>;

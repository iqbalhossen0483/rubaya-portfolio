import { z } from "zod";

type Params = {
  MAX_FILE_SIZE: number;
  ACCEPTED_IMAGE_TYPES: string[];
};

export function validateImageFile({
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
}: Params) {
  return z
    .any()
    .transform((value) => {
      if (!value) return false;
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
        message: "Please provide a valid file.",
      },
    )
    .refine(
      (value) => {
        if (typeof value === "string") return true;
        if (!(value instanceof File)) return true;

        return ACCEPTED_IMAGE_TYPES.includes(value.type);
      },
      `Only ${ACCEPTED_IMAGE_TYPES.join(", ")} formats are supported.`,
    )
    .refine(
      (value) => {
        if (!(value instanceof File)) return true;

        return value.size <= MAX_FILE_SIZE;
      },
      `Max file size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.`,
    );
}

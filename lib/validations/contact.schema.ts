import { z } from "zod";

export const contactSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  location: z.string().min(1, "Location is required"),
  linkedin_url: z
    .string()
    .url("Please provide a valid URL for LinkedIn")
    .or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

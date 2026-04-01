import { z } from "zod";

export const generalSettingsSchema = z.object({
  site_brand_name: z.string().min(1, "Site brand name is required"),
  copyright_text: z.string().min(1, "Copyright text is required"),
  section_description: z
    .object({
      contact_section_description: z.string().optional(),
      impact_section_description: z.string().optional(),
      event_section_description: z.string().optional(),
    })
    .optional(),
});

export type GeneralSettingsInput = z.infer<typeof generalSettingsSchema>;

export const profileSettingsSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ProfileSettingsInput = z.infer<typeof profileSettingsSchema>;

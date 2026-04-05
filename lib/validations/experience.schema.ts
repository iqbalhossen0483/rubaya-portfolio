import { z } from "zod";

export const experienceSchema = z
  .object({
    company: z.string().min(1, "Company is required"),
    role: z.string().min(1, "Role is required"),
    startDate: z.string().or(z.date()),
    endDate: z.string().or(z.date()).nullable().optional(),
    isCurrent: z.boolean(),
    description: z.string().optional(),
    order: z.number().int(),
  })
  .refine(
    (data) => {
      if (data.isCurrent) return true;
      return !!data.endDate;
    },
    {
      message: "End date is required if not currently working here",
      path: ["endDate"],
    },
  );

export type ExperienceFormValues = z.infer<typeof experienceSchema>;

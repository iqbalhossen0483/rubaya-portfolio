import { AppError, withErrorHandler } from "@/lib/api-error";
import prisma from "@/lib/prisma";
import { aboutSchema } from "@/lib/validations/about.schema";
import { NextResponse } from "next/server";
import { z } from "zod";

import { uploadToCloudinary } from "@/lib/cloudinary";

function parseIndexedFormData<T extends Record<string, unknown>>(
  values: Record<string, FormDataEntryValue>,
  prefix: string,
  fields: (keyof T & string)[],
): Partial<T>[] {
  const result: Partial<T>[] = [];

  for (const key of Object.keys(values)) {
    if (!key.startsWith(prefix)) continue;

    const fieldPattern = fields.map((f) => f).join("|");
    const match = key.match(
      new RegExp(`${prefix}\\[(\\d+)\\]\\.(${fieldPattern})`),
    );
    if (!match) continue;

    const index = parseInt(match[1], 10);
    const field = match[2] as keyof T;

    if (!result[index]) result[index] = {};
    result[index][field] = values[key] as T[keyof T];
  }

  return result;
}

async function resolveIconUrl(icon: File | string): Promise<string> {
  if (icon instanceof File) {
    return uploadToCloudinary(icon);
  }
  return icon;
}

// ─── Route Handler ──────────────────────────────────────────────────────────
export const GET = withErrorHandler(async () => {
  const about = await prisma.about.findFirst({
    include: {
      highlightedPositions: true,
      activities: true,
    },
  });
  return NextResponse.json({ success: true, data: about });
});

export const PUT = withErrorHandler(async (req: Request) => {
  const formData = await req.formData();
  const values = Object.fromEntries(formData.entries()) as Record<
    string,
    FormDataEntryValue
  >;

  // Parse nested formData arrays
  const activities = parseIndexedFormData<{
    label: string;
    icon: File | string;
  }>(values, "activities", ["label", "icon"]);

  const highlightedPositions = parseIndexedFormData<{
    title: string;
    company: string;
  }>(values, "highlightedPositions", ["title", "company"]);

  // Validate
  const validation = aboutSchema.safeParse({
    ...values,
    activities,
    highlightedPositions,
  });

  if (!validation.success) {
    throw new AppError(
      "Invalid body parameters",
      400,
      z.treeifyError(validation.error),
    );
  }

  const { title, description, philosophy } = validation.data;

  // Pre-resolve all icon URLs before DB operations (avoids partial failures)
  const resolvedActivities = await Promise.all(
    validation.data.activities.map(async (a) => ({
      label: a.label,
      icon: await resolveIconUrl(a.icon as File | string),
    })),
  );

  const resolvedHighlightedPositions = validation.data.highlightedPositions.map(
    (p) => ({
      title: p.title,
      company: p.company,
    }),
  );

  // Upsert into DB
  const about = await prisma.about.upsert({
    where: { id: 1 },
    update: {
      title,
      description,
      philosophy,
      highlightedPositions: {
        deleteMany: {},
        create: resolvedHighlightedPositions,
      },
      activities: {
        deleteMany: {},
        create: resolvedActivities,
      },
    },
    create: {
      id: 1,
      title,
      description,
      philosophy,
      highlightedPositions: {
        create: resolvedHighlightedPositions,
      },
      activities: {
        create: resolvedActivities,
      },
    },
  });

  return NextResponse.json({ success: true, data: about });
});

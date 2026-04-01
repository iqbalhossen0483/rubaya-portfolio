import { withErrorHandler } from "@/lib/api-error";
import prisma from "@/lib/prisma";
import { generalSettingsSchema } from "@/lib/validations/settings.schema";
import { NextResponse } from "next/server";

export const GET = withErrorHandler(async () => {
  const settings = await prisma.setting.findUnique({ where: { id: 1 } });
  return NextResponse.json({ data: settings });
});

export const POST = withErrorHandler(async (req: Request) => {
  const body = await req.json();
  const data = generalSettingsSchema.parse(body);

  const settings = await prisma.setting.upsert({
    where: { id: 1 },
    update: {
      ...data,
      section_titles: {
        engagement: "Engagement",
        impact: "Impact",
        get_in_touch: "Get in Touch",
      },
    },
    create: {
      ...data,
      section_titles: {
        engagement: "Engagement",
        impact: "Impact",
        get_in_touch: "Get in Touch",
      },
    },
  });

  return NextResponse.json({
    data: settings,
    message: "Settings updated successfully",
  });
});

import { AppError, withErrorHandler } from "@/lib/api-error";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { experienceSchema } from "@/lib/validations/experience.schema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = withErrorHandler(async () => {
  const experiences = await prisma.experience.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(experiences);
});

export const POST = withErrorHandler(async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new AppError("Unauthorized", 401);
  }

  const body = await req.json();

  // Convert string dates to Date objects if needed
  if (body.startDate && typeof body.startDate === "string") {
    body.startDate = new Date(body.startDate);
  }
  if (body.endDate && typeof body.endDate === "string") {
    body.endDate = new Date(body.endDate);
  }

  const validatedData = experienceSchema.parse(body);

  const experience = await prisma.experience.create({
    data: {
      ...validatedData,
      startDate: new Date(validatedData.startDate),
      endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
    },
  });

  return NextResponse.json(experience, { status: 201 });
});

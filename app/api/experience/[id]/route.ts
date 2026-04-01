import { AppError, withErrorHandler } from "@/lib/api-error";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { experienceSchema } from "@/lib/validations/experience.schema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = withErrorHandler(
  async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const experience = await prisma.experience.findUnique({
      where: { id: parseInt(id) },
    });

    if (!experience) {
      throw new AppError("Experience not found", 404);
    }

    return NextResponse.json(experience);
  },
);

export const PUT = withErrorHandler(
  async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new AppError("Unauthorized", 401);
    }

    const body = await req.json();

    if (body.startDate && typeof body.startDate === "string") {
      body.startDate = new Date(body.startDate);
    }
    if (body.endDate && typeof body.endDate === "string") {
      body.endDate = new Date(body.endDate);
    }

    const validatedData = experienceSchema.parse(body);

    const { id } = await params;
    const experience = await prisma.experience.update({
      where: { id: parseInt(id) },
      data: {
        ...validatedData,
        startDate: new Date(validatedData.startDate),
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
      },
    });

    return NextResponse.json(experience);
  },
);

export const DELETE = withErrorHandler(
  async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new AppError("Unauthorized", 401);
    }

    const { id } = await params;
    await prisma.experience.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Experience deleted successfully" });
  },
);

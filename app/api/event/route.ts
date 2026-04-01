import { AppError, withErrorHandler } from "@/lib/api-error";
import { authOptions } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { eventSchema } from "@/lib/validations/event.schema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export const GET = withErrorHandler(async () => {
  const events = await prisma.event.findMany({
    orderBy: { date: "desc" },
  });
  return NextResponse.json(events);
});

export const POST = withErrorHandler(async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new AppError("Unauthorized", 401);
  }

  const formData = await req.formData();
  const values = Object.fromEntries(formData.entries());

  const { title, role, date, location, description, coverImage } = values as {
    [key: string]: string | File;
  };

  const result = eventSchema.safeParse({
    title,
    role,
    date,
    location,
    description,
    coverImage,
  });

  if (!result.success) {
    throw new AppError("Invalid input", 400, z.treeifyError(result.error));
  }

  let coverImageUrl = "";

  if (coverImage && coverImage instanceof File) {
    try {
      coverImageUrl = await uploadToCloudinary(coverImage);
    } catch (error) {
      console.error("Image upload failed:", error);
      throw new AppError("Image upload failed", 500);
    }
  } else if (typeof coverImage === "string") {
    coverImageUrl = coverImage;
  }

  const event = await prisma.event.create({
    data: {
      title: title as string,
      role: role as string,
      date: new Date(date as string),
      location: location as string,
      description: description as string,
      coverImage: coverImageUrl,
    },
  });

  return NextResponse.json(event, { status: 201 });
});

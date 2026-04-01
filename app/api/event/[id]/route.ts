import { AppError, withErrorHandler } from "@/lib/api-error";
import { authOptions } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { eventSchema } from "@/lib/validations/event.schema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export const PUT = withErrorHandler(
  async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new AppError("Unauthorized", 401);
    }
    const { id } = await params;

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

    let coverImageUrl: string | undefined = undefined;

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

    const dataToUpdate: any = {
      title,
      role,
      date: new Date(date as string),
      location,
      description,
    };

    if (coverImageUrl) {
      dataToUpdate.coverImage = coverImageUrl;
    }

    const event = await prisma.event.update({
      where: { id: Number(id) },
      data: dataToUpdate,
    });

    return NextResponse.json(event);
  },
);

export const DELETE = withErrorHandler(
  async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new AppError("Unauthorized", 401);
    }
    const { id } = await params;

    await prisma.event.delete({
      where: { id: Number(id) },
    });

    return new NextResponse(null, { status: 204 });
  },
);

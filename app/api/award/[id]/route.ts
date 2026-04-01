import { AppError, withErrorHandler } from "@/lib/api-error";
import { authOptions } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { awardSchema } from "@/lib/validations/award.schema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const PUT = withErrorHandler(
  async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new AppError("Unauthorized", 401);
    }
    const { id } = await params;
    const awardId = parseInt(id);

    const formData = await req.formData();
    const values = Object.fromEntries(formData.entries());

    const { title, description, time_to_receipt, image } = values as {
      [key: string]: string | File;
    };

    const result = awardSchema.safeParse({
      title,
      description,
      time_to_receipt,
      image,
    });

    if (!result.success) {
      throw new AppError("Invalid input", 400, result.error.flatten());
    }

    let imageUrl = typeof image === "string" ? image : "";

    if (image && image instanceof File) {
      try {
        imageUrl = await uploadToCloudinary(image);
      } catch (error) {
        console.error("Image upload failed:", error);
        throw new AppError("Image upload failed", 500);
      }
    }

    const updatedAward = await prisma.award.update({
      where: { id: awardId },
      data: {
        title: title as string,
        description: description as string,
        time_to_receipt: time_to_receipt as string,
        image: imageUrl,
      },
    });

    return NextResponse.json(updatedAward);
  },
);

export const DELETE = withErrorHandler(
  async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new AppError("Unauthorized", 401);
    }
    const { id } = await params;

    await prisma.award.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Award item deleted" });
  },
);

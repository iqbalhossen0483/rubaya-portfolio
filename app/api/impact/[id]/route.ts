import { AppError, withErrorHandler } from "@/lib/api-error";
import { authOptions } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { impactSchema } from "@/lib/validations/impact.schema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const PUT = withErrorHandler(
  async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new AppError("Unauthorized", 401);
    }
    const { id } = await params;
    const impactId = parseInt(id);

    const formData = await req.formData();
    const values = Object.fromEntries(formData.entries());

    const { title, description, image } = values as {
      [key: string]: string | File;
    };

    const result = impactSchema.safeParse({
      title,
      description,
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

    const updatedImpact = await prisma.impact.update({
      where: { id: impactId },
      data: {
        title: title as string,
        description: description as string,
        image: imageUrl,
      },
    });

    return NextResponse.json(updatedImpact);
  },
);

export const DELETE = withErrorHandler(
  async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new AppError("Unauthorized", 401);
    }
    const { id } = await params;

    await prisma.impact.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Impact item deleted" });
  },
);

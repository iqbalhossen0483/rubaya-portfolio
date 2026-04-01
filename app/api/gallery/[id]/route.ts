import { AppError, withErrorHandler } from "@/lib/api-error";
import { authOptions } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { gallerySchema } from "@/lib/validations/gallery.schema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const PUT = withErrorHandler(
  async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new AppError("Unauthorized", 401);
    }
    const { id } = await params;
    const galleryId = parseInt(id);

    const formData = await req.formData();
    const values = Object.fromEntries(formData.entries());

    const { caption, image } = values as {
      [key: string]: string | File;
    };

    const result = gallerySchema.safeParse({
      caption,
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

    const updatedGallery = await prisma.gallery.update({
      where: { id: galleryId },
      data: {
        caption: caption as string,
        image: imageUrl,
      },
    });

    return NextResponse.json(updatedGallery);
  },
);

export const DELETE = withErrorHandler(
  async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new AppError("Unauthorized", 401);
    }
    const { id } = await params;

    await prisma.gallery.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Gallery item deleted" });
  },
);

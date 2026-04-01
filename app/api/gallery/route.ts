import { AppError, withErrorHandler } from "@/lib/api-error";
import { authOptions } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { gallerySchema } from "@/lib/validations/gallery.schema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export const GET = withErrorHandler(async () => {
  const galleries = await prisma.gallery.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(galleries);
});

export const POST = withErrorHandler(async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new AppError("Unauthorized", 401);
  }

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
    throw new AppError("Invalid input", 400, z.treeifyError(result.error));
  }

  let imageUrl = "";

  if (image && image instanceof File) {
    try {
      imageUrl = await uploadToCloudinary(image);
    } catch (error) {
      console.error("Image upload failed:", error);
      throw new AppError("Image upload failed", 500);
    }
  } else if (typeof image === "string") {
    imageUrl = image;
  }

  const gallery = await prisma.gallery.create({
    data: {
      caption: caption as string,
      image: imageUrl,
    },
  });

  return NextResponse.json(gallery, { status: 201 });
});

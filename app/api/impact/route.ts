import { AppError, withErrorHandler } from "@/lib/api-error";
import { authOptions } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { impactSchema } from "@/lib/validations/impact.schema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = withErrorHandler(async () => {
  const impacts = await prisma.impact.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(impacts);
});

export const POST = withErrorHandler(async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new AppError("Unauthorized", 401);
  }

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

  const impact = await prisma.impact.create({
    data: {
      title: title as string,
      description: description as string,
      image: imageUrl,
    },
  });

  return NextResponse.json(impact, { status: 201 });
});

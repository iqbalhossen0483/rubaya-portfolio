import { AppError, withErrorHandler } from "@/lib/api-error";
import { authOptions } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { heroSchema } from "@/lib/validations/content.schema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export const GET = withErrorHandler(async () => {
  const hero = await prisma.hero.findFirst();
  return NextResponse.json({ success: true, data: hero });
});

export const PUT = withErrorHandler(async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new AppError("Unauthorized", 401);
  }

  const formData = await req.formData();
  const values = Object.fromEntries(formData.entries());

  const {
    title,
    subtitle,
    description,
    yearsOfExperience,
    countries,
    award,
    profile,
  } = values as { [key: string]: string | File };

  const result = heroSchema.safeParse({
    title,
    subtitle,
    description,
    yearsOfExperience,
    countries,
    award,
    profile,
  });

  if (!result.success) {
    throw new AppError("Invalid input", 400, z.treeifyError(result.error));
  }
  let profileUrl: string | undefined = undefined;
  if (profile && profile instanceof File) {
    try {
      profileUrl = await uploadToCloudinary(profile);
    } catch (error) {
      console.error("Image upload failed:", error);
      throw new AppError("Image upload failed", 500);
    }
  }

  const dataToUpdate: any = {
    title,
    subtitle,
    description,
    yearsOfExperience,
    countries,
    award,
  };
  if (profileUrl) {
    dataToUpdate.profile = profileUrl;
  } else if (typeof profile === "string") {
    dataToUpdate.profile = profile; // keep existing URL if no new file
  }

  // We assume ID 1 is always the primary hero
  const hero = await prisma.hero.upsert({
    where: { id: 1 },
    update: dataToUpdate,
    create: {
      id: 1,
      ...dataToUpdate,
    },
  });

  return NextResponse.json({ success: true, data: hero });
});

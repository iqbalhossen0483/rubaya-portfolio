import { AppError, withErrorHandler } from "@/lib/api-error";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { contactSchema } from "@/lib/validations/contact.schema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export const GET = withErrorHandler(async () => {
  const contact = await prisma.contact.findUnique({
    where: { id: 1 },
  });
  return NextResponse.json({ success: true, data: contact });
});

export const PUT = withErrorHandler(async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new AppError("Unauthorized", 401);
  }

  const formData = await req.formData();
  const values = Object.fromEntries(formData.entries());

  const { email, phone, location, linkedin_url } = values as {
    [key: string]: string;
  };

  const result = contactSchema.safeParse({
    email,
    phone,
    location,
    linkedin_url,
  });

  if (!result.success) {
    throw new AppError("Invalid input", 400, z.treeifyError(result.error));
  }

  const updatedContact = await prisma.contact.upsert({
    where: { id: 1 },
    update: {
      email,
      phone,
      location,
      linkedin_url,
    },
    create: {
      id: 1,
      email,
      phone,
      location,
      linkedin_url,
    },
  });

  return NextResponse.json({ success: true, data: updatedContact });
});

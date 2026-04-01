import { withErrorHandler } from "@/lib/api-error";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { profileSettingsSchema } from "@/lib/validations/settings.schema";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = withErrorHandler(async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const data = profileSettingsSchema.parse(body);

  let hashedPassword;
  if (data.password) {
    hashedPassword = await bcrypt.hash(data.password, 10);
  }

  await prisma.adminUser.update({
    where: { id: Number(session.user.id) },
    data: {
      name: data.name,
      ...(hashedPassword && { passwordHash: hashedPassword }),
    },
  });

  return NextResponse.json({
    message: "Profile updated successfully",
  });
});

import { withErrorHandler } from "@/lib/api-error";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = withErrorHandler(async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.adminUser.findUnique({
    where: { id: Number(session.user.id) },
    select: {
      id: true,
      name: true,
      username: true,
    },
  });

  return NextResponse.json({ data: user });
});

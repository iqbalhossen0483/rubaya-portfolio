import { AppError, withErrorHandler } from "@/lib/api-error";
import prisma from "@/lib/prisma";
import { loginSchema } from "@/lib/validations/auth.schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { z } from "zod";

export const POST = withErrorHandler(async (req: Request) => {
  const body = await req.json();

  const result = loginSchema.safeParse(body);
  if (!result.success) {
    throw new AppError("Invalid input", 400, z.treeifyError(result.error));
  }

  const { username, password } = result.data;

  const user = await prisma.adminUser.findUnique({
    where: { username },
  });

  if (!user) {
    throw new AppError("Invalid username or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new AppError("Invalid username or password", 401);
  }

  const secret = process.env.NEXTAUTH_SECRET || "defaultsecret";

  // Create JWT with user info
  const token = jwt.sign(
    { id: user.id, username: user.username, name: user.name },
    secret,
    {
      expiresIn: "7d",
    },
  );

  return NextResponse.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
    },
    token,
  });
});

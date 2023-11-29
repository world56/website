import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

import { ENUM_COMMON } from "@/enum/common";

import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const admin = await prisma.user.findFirst({
    where: { type: ENUM_COMMON.USER_TYPE.ADMIN },
  });
  if (admin) {
    return NextResponse.json("User is already registered", { status: 409 });
  }
  await prisma.user.create({
    data: {
      ...data,
      type: ENUM_COMMON.USER_TYPE.ADMIN,
    },
  });
  return NextResponse.json(true);
}

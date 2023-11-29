import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

import { ENUM_COMMON } from "@/enum/common";

import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const admin = await prisma.user.findFirst({
    where: { type: ENUM_COMMON.USER_TYPE.ADMIN },
  });
  return NextResponse.json(Boolean(admin));
}

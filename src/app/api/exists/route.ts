import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

import { ENUM_COMMON } from "@/enum/common";

import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const admin = await prisma.user.findFirst({
    select: { id: true },
    where: { type: ENUM_COMMON.USER_TYPE.ADMIN },
  });
  return NextResponse.json(Boolean(admin), {
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "X-Custom-Header": request.nextUrl.searchParams.get("date") as string,
    },
  });
}

import { prisma } from "@/lib/db";
import { insertLog } from "@/app/api";
import { getClientIP } from "@/lib/format";
import { NextResponse } from "next/server";

import { ENUM_COMMON } from "@/enum/common";

import type { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  const data = await request.json();
  const admin = await prisma.user.findFirst({
    select: { password: true, id: true },
  });
  const ip = getClientIP(request);
  if (admin && data.password === admin?.password) {
    await prisma.user.update({
      where: { id: admin.id },
      data: { password: data.newPassword },
    });
    insertLog({
      ...ip,
      key: process.env.SECRET!,
      type: ENUM_COMMON.LOG.PASSWORD,
    });
    return NextResponse.json(true);
  } else {
    insertLog({
      ...ip,
      description: "400",
      key: process.env.SECRET!,
      type: ENUM_COMMON.LOG.PASSWORD,
    });
    return NextResponse.json(false, { status: 400 });
  }
}

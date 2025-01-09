import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

import { ENUM_COMMON } from "@/enum/common";

import type { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = Number(searchParams.get("id"));
  const res = await prisma.log.findUnique({
    where: { id },
    select: { type: true },
  });
  if (res?.type !== ENUM_COMMON.LOG.ACCESS) {
    return NextResponse.json("Not deletable", { status: 400 });
  }
  await prisma.log.delete({ where: { id } });
  return NextResponse.json(true);
}

import { format } from "date-fns";
import { isVoid } from "@/lib/utils";
import { NextResponse } from "next/server";
import { prisma, cacheable } from "@/lib/db";

import { ENUM_COMMON } from "@/enum/common";

import type { NextRequest } from "next/server";

export async function GET() {
  let [count, today] = await Promise.all([
    cacheable.get(`visit_count`),
    cacheable.get(`visit_${format(new Date(), "yyyy-MM-dd")}`),
  ]);
  if (isVoid(count)) {
    count = await prisma.log.count();
    await cacheable.set(`visit_count`, count);
  }
  return NextResponse.json({ today, count });
}

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

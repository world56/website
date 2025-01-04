import { DBlocal, prisma } from "@/lib/db";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const endTime = searchParams.get("endTime");
  const startTime = searchParams.get("startTime");
  const take = Number(searchParams.get("pageSize"));
  const skip = (Number(searchParams.get("current")) - 1) * take;
  const where = {
    createTime: startTime
      ? { gte: new Date(startTime!), lte: new Date(endTime!) }
      : undefined,
  };
  const [total, list] = await Promise.all([
    prisma.resource.count({ where }),
    prisma.resource.findMany({
      take,
      skip,
      where,
      orderBy: { createTime: "desc" },
    }),
  ]);
  return NextResponse.json({ total, list });
}

export async function DELETE(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path")!;
  await prisma.resource.delete({ where: { path } });
  return DBlocal.remove(path);
}

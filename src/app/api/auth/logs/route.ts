import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const type = searchParams.get("type");
  const endTime = searchParams.get("endTime");
  const startTime = searchParams.get("startTime");
  const take = Number(searchParams.get("pageSize"));
  const skip = (Number(searchParams.get("current")) - 1) * take;
  const where = {
    type: type ? Number(type) : undefined,
    createTime: startTime
      ? { gte: new Date(startTime!), lte: new Date(endTime!) }
      : undefined,
  };
  const [total, list] = await Promise.all([
    prisma.log.count({ where }),
    prisma.log.findMany({ take, skip, where, orderBy: { createTime: "desc" } }),
  ]);
  return NextResponse.json({ total, list });
}

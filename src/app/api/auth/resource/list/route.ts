import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const type = searchParams.get("type");
  const size = searchParams.get("size") as "asc" | "desc";
  const take = Number(searchParams.get("pageSize"));
  const skip = (Number(searchParams.get("current")) - 1) * take;
  const where = { type: type === null ? undefined : Number(type) };
  const [total, list] = await Promise.all([
    prisma.resource.count({ where }),
    prisma.resource.findMany({
      take,
      skip,
      where,
      orderBy: size ? { size } : { createTime: "desc" },
    }),
  ]);
  return NextResponse.json({ total, list });
}

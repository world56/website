import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

import { ENUM_COMMON } from "@/enum/common";

import type { NextRequest } from "next/server";

const POST_TYPE = Object.values(ENUM_COMMON.POST_TYPE);

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const type = searchParams.get("type")! as ENUM_COMMON.POST_TYPE;
  if (!POST_TYPE.includes(type)) {
    return NextResponse.json("Parameter exception", { status: 400 });
  }
  const take = Number(searchParams.get("pageSize")) || 1;
  const skip = (Number(searchParams.get("current")) - 1) * take;
  const where = { type, status: ENUM_COMMON.STATUS.ENABLE };
  const [total, list] = await Promise.all([
    prisma.post.count({ where }),
    prisma.post.findMany({
      take,
      skip,
      where,
      orderBy: { createTime: "desc" },
      select: { id: true, icon: true, title: true, description: true },
    }),
  ]);
  return NextResponse.json({ total, list });
}

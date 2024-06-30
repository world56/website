import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";
import { _pageRevalidate } from "@/app/api";

import { ENUM_COMMON } from "@/enum/common";

import type { NextRequest } from "next/server";

const POST_TYPE = {
  [ENUM_COMMON.POST_TYPE.NOTES]: "/main/post/notes/",
  [ENUM_COMMON.POST_TYPE.ACHIEVEMENTS]: "/main/post/achievements/",
};

async function clearCache(type: number | string, id: string) {
  const path = `${POST_TYPE[type as keyof typeof POST_TYPE]}${id}`;
  return await _pageRevalidate({ path });
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const type = Number(searchParams.get("type"));
  const status = searchParams.get("status");
  const title = searchParams.get("title") || "";
  const take = Number(searchParams.get("pageSize"));
  const skip = (Number(searchParams.get("current")) - 1) * take;
  const where = {
    type,
    title: { contains: title },
    status: status ? Number(status) : undefined,
  };
  const [total, list] = await Promise.all([
    prisma.post.count({ where }),
    prisma.post.findMany({
      take,
      skip,
      where,
      select: {
        id: true,
        type: true,
        icon: true,
        title: true,
        status: true,
        createTime: true,
        description: true,
      },
      orderBy: { createTime: "desc" },
    }),
  ]);
  return NextResponse.json({ total, list });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const res = await prisma.post.create({ data });
  await clearCache(res.type, res.id);
  return NextResponse.json(true);
}

export async function PUT(request: NextRequest) {
  const { id, ...data } = await request.json();
  await prisma.post.update({ where: { id }, data });
  await clearCache(data.type, id);
  return NextResponse.json(true);
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id")!;
  const type = request.nextUrl.searchParams.get("type")!;
  await prisma.post.delete({ where: { id } });
  await clearCache(type, id);
  return NextResponse.json(true);
}

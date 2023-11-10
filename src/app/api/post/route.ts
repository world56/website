import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const type = Number(searchParams.get("type"));
  const title = searchParams.get("title") || "";
  const take = Number(searchParams.get("pageSize"));
  const skip = (Number(searchParams.get("current")) - 1) * take;
  const where = { type, title: { contains: title } };
  const [total, list] = await Promise.all([
    prisma.post.count({ where }),
    prisma.post.findMany({
      take,
      skip,
      where,
      orderBy: { createTime: "desc" },
      select: {
        id: true,
        type: true,
        icon: true,
        title: true,
        status: true,
        createTime: true,
        description: true,
      },
    }),
  ]);
  return NextResponse.json({ total, list });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  await prisma.post.create({ data });
  return NextResponse.json(true);
}

export async function PUT(request: NextRequest) {
  const { id, ...data } = await request.json();
  await prisma.post.update({
    where: { id },
    data,
  });
  return NextResponse.json(true);
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id")!;
  await prisma.post.delete({ where: { id } });
  return NextResponse.json(true);
}

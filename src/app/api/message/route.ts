import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

const READ_STATUS_PARAM = { true: true, false: false };

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");
  const read = searchParams.get("read") as keyof typeof READ_STATUS_PARAM;
  const take = Number(searchParams.get("pageSize"));
  const skip = (Number(searchParams.get("current")) - 1) * take;
  const where = {
    read: read ? READ_STATUS_PARAM[read] : undefined,
    createTime: startTime
      ? {
          gte: new Date(startTime!),
          lte: new Date(endTime!),
        }
      : undefined,
  };
  const [total, list] = await Promise.all([
    prisma.msg.count({ where }),
    prisma.msg.findMany({
      take,
      skip,
      where,
      orderBy: { createTime: "desc" },
    }),
  ]);
  return NextResponse.json({ total, list });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  await prisma.msg.create({ data });
  return NextResponse.json(true);
}

export async function PUT(request: NextRequest) {
  const { id } = await request.json();
  await prisma.msg.update({
    where: { id },
    data: { read: true },
  });
  return NextResponse.json(true);
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id")!;
  await prisma.msg.delete({ where: { id } });
  return NextResponse.json(true);
}

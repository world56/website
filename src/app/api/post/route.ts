import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const take = Number(searchParams.get("pageSize"));
  const skip = (Number(searchParams.get("currentPage")) - 1) * take;
  const [count, list] = await Promise.all([
    prisma.post.count({}),
    prisma.post.findMany({
      take,
      skip,
      orderBy: { updateTime: "desc" },
      select: { id: true, title: true, type: true, updateTime: true },
    }),
  ]);
  return NextResponse.json({ count, list });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  await prisma.post.create({ data });
  return NextResponse.json(true);
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id")!;
  await prisma.post.delete({ where: { id } });
  return NextResponse.json(true);
}

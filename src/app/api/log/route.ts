import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { key, ...data } = await request.json();
  if (key !== process.env.SECRET) {
    return NextResponse.json(false, { status: 403 });
  }
  data.type = Number(data.type);
  data.description = data.description || "200";
  await prisma.log.create({ data });
  return NextResponse.json(true);
}

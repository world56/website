import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  await prisma.msg.create({ data });
  return NextResponse.json(true);
}

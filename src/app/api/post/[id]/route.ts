import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

interface TypeParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, params: TypeParams) {
  const { id } = params.params;
  const data = await prisma.post.findUnique({ where: { id } });
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest, params: TypeParams) {
  const { id } = params.params;
  const { status } = await request.json();
  await prisma.post.update({
    where: { id },
    data: { status },
  });
  return NextResponse.json(true);
}

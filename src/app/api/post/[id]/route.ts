import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

import type { Post } from "@prisma/client";
import type { NextRequest } from "next/server";

interface TypeParams {
  params: Pick<Post, "id">;
}

export async function GET(request: NextRequest, params: TypeParams) {
  const id = Number(params.params.id);
  const data = await prisma.post.findUnique({ where: { id } });
  return NextResponse.json(data);
}

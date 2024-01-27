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
  return await _pageRevalidate({ path, type: "page" });
}

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
  const { type } = await prisma.post.update({
    where: { id },
    data: { status },
  });
  await clearCache(type, id);
  return NextResponse.json(true);
}

import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";
import { _pageRevalidate } from "@/app/api";

import { API_POST_TYPE_PARAM } from "@/app/api";

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
  const { status, type } = await request.json();
  await prisma.post.update({
    where: { id },
    data: { status },
  });
  await _pageRevalidate({
    path: `${
      API_POST_TYPE_PARAM[type as keyof typeof API_POST_TYPE_PARAM]
    }${id}`,
  });
  return NextResponse.json(true);
}

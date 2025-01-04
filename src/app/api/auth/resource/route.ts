import { DBlocal, prisma } from "@/lib/db";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
  const id = Number(request.nextUrl.searchParams.get("id"))!;
  const { path } = await prisma.resource.delete({
    where: { id },
    select: { path: true },
  });
  DBlocal.remove(path);
  return NextResponse.json(true);
}

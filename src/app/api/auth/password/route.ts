import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  const data = await request.json();
  const admin = await prisma.user.findFirst({
    select: { password: true, id: true },
  });
  if (admin && data.password === admin?.password) {
    await prisma.user.update({
      where: { id: admin.id },
      data: { password: data.newPassword },
    });
    return NextResponse.json(true);
  } else {
    return NextResponse.json(false, { status: 412 });
  }
}

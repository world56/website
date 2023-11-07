import * as jose from "jose";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

import { ENUM_COMMON } from "@/enum/common";

import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const admin = await prisma.user.findFirst({
    where: { ...data, type: ENUM_COMMON.USER_TYPE.ADMIN },
  });
  if (admin) {
    const token = await new jose.SignJWT({
      id: admin.id,
      account: admin.account,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(new TextEncoder().encode(process.env.SECRET));
    return NextResponse.json(true, {
      headers: {
        "Set-Cookie": `Authorization=${token}; SameSite=Lax; Secure=false; HttpOnly; Max-Age=86400; Path=/`,
      },
    });
  }
  return NextResponse.json("User not registered", { status: 412 });
}

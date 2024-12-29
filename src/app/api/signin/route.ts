import * as jose from "jose";
import { prisma } from "@/lib/db";
import { getClientIP } from "@/lib/format";
import { NextResponse } from "next/server";

import { ENUM_COMMON } from "@/enum/common";

import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const ip = getClientIP(req);
  const data = await req.json();
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
    await prisma.log.create({
      data: { ...ip, type: ENUM_COMMON.LOG.LOGIN, description: "200" },
    });
    return NextResponse.json(true, {
      headers: {
        "Set-Cookie": `Authorization=${token}; SameSite=Lax; HttpOnly; Max-Age=86400; Path=/`,
      },
    });
  }
  await prisma.log.create({
    data: { ...ip, type: ENUM_COMMON.LOG.LOGIN, description: "412" },
  });
  return NextResponse.json("User authentication failed", { status: 412 });
}

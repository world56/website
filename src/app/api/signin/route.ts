import * as jose from "jose";
import { insertLog } from "@/app/api";
import { getClientIP } from "@/lib/format";
import { NextResponse } from "next/server";
import { prisma, cacheable } from "@/lib/db";

import { ENUM_COMMON } from "@/enum/common";

import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { ipv4, ipv6 } = getClientIP(req);
  const bol = await cacheable.incr(`signin_${ipv4 || ipv6}`, 3);
  if (!bol) {
    return NextResponse.json("Too many requests.", {
      status: 429,
      headers: { "Retry-After": "600" },
    });
  }
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
    insertLog({
      ipv4,
      ipv6,
      key: process.env.SECRET!,
      type: ENUM_COMMON.LOG.LOGIN,
    });
    return NextResponse.json(true, {
      headers: {
        "Set-Cookie": `Authorization=${token}; SameSite=Lax; HttpOnly; Max-Age=86400; Path=/`,
      },
    });
  }
  insertLog({
    ipv4,
    ipv6,
    description: "401",
    key: process.env.SECRET!,
    type: ENUM_COMMON.LOG.LOGIN,
  });
  return NextResponse.json("User authentication failed", { status: 401 });
}

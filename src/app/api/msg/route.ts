import { getClientIP } from "@/lib/format";
import { NextResponse } from "next/server";
import { prisma, cacheable } from "@/lib/db";

import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { ipv4, ipv6 } = getClientIP(request);
  const bol = await cacheable.incr(`msg_${ipv4 || ipv6}`, 3);
  if (!bol) {
    return NextResponse.json("Too many requests.", {
      status: 429,
      headers: { "Retry-After": "600" },
    });
  }
  const data = await request.json();
  await prisma.msg.create({ data });
  return NextResponse.json(true);
}

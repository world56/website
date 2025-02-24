import { format } from "date-fns";
import { isVoid } from "@/lib/utils";
import { NextResponse } from "next/server";
import { prisma, cacheable } from "@/lib/db";

import { ENUM_COMMON } from "@/enum/common";

import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { key, ...data } = await request.json();
  if (key !== process.env.SECRET) {
    return NextResponse.json(false, { status: 403 });
  }
  data.type = Number(data.type);
  data.description = data.description || "200";
  if (data.type === ENUM_COMMON.LOG.ACCESS) {
    cacheable.incr({
      ttl: "24h",
      key: `visit_${format(new Date(), "yyyy-MM-dd")}`,
    });
    const count = await cacheable.get("visit_count");
    if (!isVoid(count)) {
      cacheable.incr({ key: `visit_count` });
    }
  }
  await prisma.log.create({ data });
  return NextResponse.json(true);
}

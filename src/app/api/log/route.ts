import { getMonth } from "date-fns";
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
    const count = await cacheable.get("visit_count");
    if (!isVoid(count)) {
      const date = new Date();
      const dateDay = date.getDate();
      const dateMonth = getMonth(date);
      cacheable.incr({ key: `visit_count` });
      cacheable.incr({ key: `visit_${dateDay}`, ttl: "24h" });
      cacheable.incr({ key: `visit_${dateMonth}`, ttl: "32d" });
    }
  }
  await prisma.log.create({ data });
  return NextResponse.json(true);
}

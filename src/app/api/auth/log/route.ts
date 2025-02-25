import { isVoid } from "@/lib/utils";
import { NextResponse } from "next/server";
import { prisma, cacheable } from "@/lib/db";
import { format, getMonth, startOfMonth, endOfDay, startOfDay } from "date-fns";

import { ENUM_COMMON } from "@/enum/common";

import type { NextRequest } from "next/server";

export async function GET() {
  const date = new Date();
  const dateDay = date.getDate();
  const dateMonth = getMonth(date);
  let [count, today, month] = await Promise.all([
    cacheable.get(`visit_count`),
    cacheable.get(`visit_${dateDay}`),
    cacheable.get(`visit_${dateMonth}`),
  ]);
  if (isVoid(count)) {
    const startDay = new Date(format(endOfDay(date), "yyyy-MM-dd'T'HH:mm:ss"));
    [count, today, month] = await Promise.all([
      prisma.log.count({ where: { type: ENUM_COMMON.LOG.ACCESS } }),
      prisma.log.count({
        where: {
          type: ENUM_COMMON.LOG.ACCESS,
          createTime: {
            lte: startDay,
            gte: new Date(format(startOfDay(date), "yyyy-MM-dd'T'HH:mm:ss")),
          },
        },
      }),
      prisma.log.count({
        where: {
          type: ENUM_COMMON.LOG.ACCESS,
          createTime: {
            lte: startDay,
            gte: new Date(format(startOfMonth(date), "yyyy-MM-dd'T'HH:mm:ss")),
          },
        },
      }),
    ]);
    cacheable.set(`visit_count`, count);
    cacheable.set(`visit_${dateDay}`, today, "24m");
    cacheable.set(`visit_${dateMonth}`, month, "32d");
  }
  return NextResponse.json({ today, month, count });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = Number(searchParams.get("id"));
  const res = await prisma.log.findUnique({
    where: { id },
    select: { type: true, createTime: true },
  });
  if (res?.type !== ENUM_COMMON.LOG.ACCESS) {
    return NextResponse.json("Not deletable", { status: 400 });
  }
  const date = new Date(res.createTime);
  await Promise.all([
    cacheable.decr("visit_count"),
    cacheable.decr(`visit_${date.getDate()}`),
    cacheable.decr(`visit_${getMonth(date)}`),
  ]);
  await prisma.log.delete({ where: { id } });
  return NextResponse.json(true);
}

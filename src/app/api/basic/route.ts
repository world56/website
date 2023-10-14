import { DBlocal, prisma } from "@/lib/db";
import { filterCUD } from "@/utils/filter";
import { NextResponse } from "next/server";

import { ENUM_COMMON } from "@/enum/common";

import type { TypeCommon } from "@/interface/common";

export async function GET(request: Request) {
  const data = DBlocal.get();
  const [items, skills] = await Promise.all([
    prisma.tag.findMany({
      where: { type: ENUM_COMMON.TAG.PERSONAL_PANEL },
      orderBy: { index: "asc" },
    }),
    prisma.tag.findMany({
      where: { type: ENUM_COMMON.TAG.PERSONAL_SKILL },
      orderBy: { index: "asc" },
    }),
  ]);
  return NextResponse.json({ ...data, items, skills });
}

export async function POST(request: Request) {
  const [{ items, skills, ...data }, db] = await Promise.all([
    request.json() as Promise<TypeCommon.BasisDTO>,
    prisma.tag.findMany({
      where: {
        type: {
          in: [ENUM_COMMON.TAG.PERSONAL_PANEL, ENUM_COMMON.TAG.PERSONAL_SKILL],
        },
      },
    }),
  ]);
  const tagCUD = filterCUD([...items, ...skills], db);
  await prisma.$transaction([
    prisma.tag.createMany({ data: tagCUD.INSERT }),
    prisma.tag.deleteMany({ where: { id: { in: tagCUD.DELETE } } }),
    ...tagCUD.UPDATE.map((v) =>
      prisma.tag.update({ data: v, where: { id: v.id } }),
    ),
  ]);
  DBlocal.set(data);
  return NextResponse.json({ status: 200 });
}

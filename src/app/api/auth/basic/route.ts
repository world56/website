import { pageRevalidate } from "../..";
import { filterCUD } from "@/lib/filter";
import { NextResponse } from "next/server";
import { DBlocal, prisma } from "@/lib/db";

import { ENUM_COMMON } from "@/enum/common";

import type { Tag } from "@prisma/client";
import type { TypeCommon } from "@/interface/common";

export async function GET(request: Request) {
  const data = DBlocal.get();
  const [items, skills] = await Promise.all([
    prisma.tag.findMany({
      where: { type: ENUM_COMMON.TAG.PANEL },
      orderBy: { index: "asc" },
    }),
    prisma.tag.findMany({
      where: { type: ENUM_COMMON.TAG.SKILL },
      orderBy: { index: "asc" },
    }),
  ]);
  return NextResponse.json({ ...data, items, skills });
}

export async function POST(request: Request) {
  const [{ items, skills, ...data }, db] = await Promise.all([
    request.json() as Promise<TypeCommon.BasisDTO<Tag>>,
    prisma.tag.findMany({
      where: {
        type: {
          in: [ENUM_COMMON.TAG.PANEL, ENUM_COMMON.TAG.SKILL],
        },
      },
    }),
  ]);

  if (Array.isArray(items) && Array.isArray(skills)) {
    const tagCUD = filterCUD(
      [
        ...items.map((v, index) => ({
          ...v,
          index,
          type: ENUM_COMMON.TAG.PANEL,
        })),
        ...skills.map((v, index) => ({
          ...v,
          index,
          type: ENUM_COMMON.TAG.SKILL,
        })),
      ],
      db,
    );
    await prisma.$transaction([
      prisma.tag.createMany({ data: tagCUD.INSERT }),
      prisma.tag.deleteMany({ where: { id: { in: tagCUD.DELETE } } }),
      ...tagCUD.UPDATE.map((v) =>
        prisma.tag.update({ data: v, where: { id: v.id } }),
      ),
    ]);
  }
  DBlocal.set(data);
  await pageRevalidate({ path: "/", type: "layout", key: process.env.SECRET! });
  return NextResponse.json({ status: 200 });
}

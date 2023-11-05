import { join } from "path";
import * as uuid from "uuid";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

import type { TypeCommon } from "@/interface/common";

const STATIC_PATH = join(__dirname, "../../../../../resource");

export async function POST(request: Request) {
  const res: Array<TypeCommon.File> = [];
  const formData = await request.formData();
  const files = formData.getAll("files") as File[]
  await Promise.all(
    files.map(async (file: File) => {
      const format = file.name.split(".").at(-1);
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${uuid.v1()}.${format}`;
      await writeFile(`${STATIC_PATH}/${fileName}`, buffer);
      res.push({ type: 0, url: `/api/resource/${fileName}` });
    }),
  );
  return NextResponse.json(res);
}

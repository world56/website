
import sharp from "sharp";
import { join } from "path";
import * as uuid from "uuid";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

import type { TypeCommon } from "@/interface/common";

const STATIC_PATH = join(__dirname, "../../../../../resource");

export async function POST(request: Request) {
  const res: Array<TypeCommon.File> = [];
  const formData = await request.formData();
  const files = formData.getAll("files") as File[];
  await Promise.all(
    files.map(async (file: File) => {
      let format = file.name.split(".").at(-1)?.toLocaleLowerCase();
      const IS_IMAGE = ["jpg", "jpeg", "png"].includes(format!);
      let buffer = Buffer.from(await file.arrayBuffer());
      if (IS_IMAGE) {
        buffer = await sharp(buffer).webp().toBuffer();
        format = "webp";
      }
      const fileName = `${uuid.v1()}.${format}`;
      await writeFile(`${STATIC_PATH}/${fileName}`, buffer);
      res.push({ type: 0, url: `/api/resource/${fileName}` });
    }),
  );
  return NextResponse.json(res);
}



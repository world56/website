import sharp from "sharp";
import * as uuid from "uuid";
import { stat } from "fs/promises";
import { writeFile } from "fs/promises";
import { DBlocal, prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { getFileType } from "@/lib/filter";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  let suffix = file.name.split(".").at(-1)?.toLocaleLowerCase();
  if (!suffix) {
    return NextResponse.json("Missing file extension", { status: 400 });
  }
  let buffer = Buffer.from(await file.arrayBuffer());
  if (["jpg", "jpeg", "png"].includes(suffix)) {
    buffer = await sharp(buffer).webp().toBuffer();
    suffix = "webp";
  }
  const { name } = file;
  const path = `${uuid.v1()}.${suffix}`;
  const filePath = `${DBlocal.FOLDER_PATH}/${path}`;
  await writeFile(filePath, new Uint8Array(buffer));
  const { size } = await stat(filePath);
  const type = getFileType(name);
  await prisma.resource.create({ data: { name, path, size, type } });
  return NextResponse.json({ name, path, size, type });
}

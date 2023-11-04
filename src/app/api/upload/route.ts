import { join } from "path";
import * as uuid from "uuid";
import { writeFile } from "fs/promises";

const STATIC_PATH = join(__dirname, "../../../../../resource");

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const format = file.name.split(".").at(-1);
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName= `${uuid.v1()}.${format}`;
  await writeFile(`${STATIC_PATH}/${fileName}`, buffer);
  return new Response(`/api/resource/${fileName}`, { status: 200 });
}

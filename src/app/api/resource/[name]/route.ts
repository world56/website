import mime from "mime";
import { resolve } from "path";
import { promisify } from "util";
import { readFile, stat } from "fs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

const asyncStat = promisify(stat);
const asyncReadFile = promisify(readFile);

interface TypeParams {
  params: {
    name: string;
  };
}

export async function GET(request: NextRequest, params: TypeParams) {
  const { name } = params.params;
  try {
    const filePath = resolve(__dirname, "../../../../../../resource", name);
    const file = await asyncReadFile(filePath);
    const contentType = mime.getType(filePath) || "application/octet-stream";
    const stat = await asyncStat(filePath);
    const fileSize = stat.size;
    const headers = {
      "Content-Type": contentType,
      "Accept-Ranges": "bytes",
      "Content-Length": fileSize.toString(),
      "Cache-Control": "public, max-age=3600",
      "Content-Range": `bytes 0-${fileSize - 1}/${fileSize}`,
    };
    return new NextResponse(file, {
      status: 200,
      headers,
    });
  } catch (error) {
    return new NextResponse("No resources found", {
      status: 404,
      headers: { "Content-Type": "text/plain" },
    });
  }
}

import mime from "mime";
import { readFile } from "fs";
import { resolve } from "path";
import { promisify } from "util";
import { NextRequest, NextResponse } from "next/server";

const asyncReadFile = promisify(readFile);

interface TypeParams {
  params: {
    name: string;
  };
}

export async function GET(request: NextRequest, params: TypeParams) {
  const { name } = params.params;
  const filePath = resolve(__dirname, "../../../../../../resource", name);
  try {
    const file = await asyncReadFile(filePath);
    const contentType = mime.getType(filePath) || "application/octet-stream";
    return new NextResponse(file, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    return new NextResponse("No resources found", {
      status: 404,
      headers: { "Content-Type": "text/plain" },
    });
  }
}

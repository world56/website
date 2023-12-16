import * as jose from "jose";
import { NextResponse } from "next/server";

import { NextRequest } from "next/server";

export const config = {
  matcher: [
    "/console/:path*",
    "/api/post/:path*",
    "/api/basic/:path*",
    "/api/message/:path*",
  ],
};

export async function middleware(request: NextRequest) {
  const { url, method, cookies } = request;
  const IS_CONSOLE = url.includes("/console");
  try {
    if (method === "GET" && !url.includes("/api/message") && !IS_CONSOLE) {
      return NextResponse.next();
    }
    const { payload } = await jose.jwtVerify<Promise<Record<"id", string>>>(
      cookies.get("Authorization")?.value!,
      new TextEncoder().encode(process.env.SECRET),
    );
    const { id } = await payload;
    if (!id) {
      return NextResponse.json("Identity exception", { status: 401 });
    }
  } catch (error) {
    console.log("@-middleware-error", error);
    return IS_CONSOLE
      ? NextResponse.redirect(new URL("/", request.url), { status: 302 })
      : NextResponse.json("Identity exception", {
          status: 401,
        });
  }
}

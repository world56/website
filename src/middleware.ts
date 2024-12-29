import * as jose from "jose";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    "/console/:path*",
    "/api/post/:path*",
    "/api/basic/:path*",
    "/api/message/:path*",
    "/api/auth/log/:path*",
    "/api/auth/password/:path*",
  ],
};

export async function middleware(request: NextRequest) {
  const { url, method, cookies } = request;
  const IS_CONSOLE = url.includes("/console");

  try {
    if (
      method === "GET" &&
      !url.includes("/api/message") &&
      !url.includes("/api/auth/log") &&
      !IS_CONSOLE
    ) {
      return NextResponse.next();
    }
    await jose.jwtVerify(
      cookies.get("Authorization")?.value!,
      new TextEncoder().encode(process.env.SECRET),
    );
  } catch (error) {
    console.log("@-middleware-error", error);
    return IS_CONSOLE
      ? NextResponse.redirect(new URL("/", request.url), { status: 302 })
      : NextResponse.json("Identity exception", { status: 401 });
  }
}

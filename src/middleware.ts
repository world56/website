import { jwtVerify } from "jose";
import { getClientIP } from "@/lib/format";
import { NextResponse } from "next/server";

import { BASE_URL } from "./lib/request";
import { ENUM_COMMON } from "./enum/common";

import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/console/:path*", "/api/auth/:path*", "/lib/welcome"],
};

export async function middleware(request: NextRequest) {
  const { cookies } = request;
  const { pathname } = request.nextUrl;
  if (request.nextUrl.pathname === "/lib/welcome") {
    // @see https://nextjs.org/docs/app/api-reference/edge
    fetch(`${BASE_URL}/api/log`, {
      method: "POST",
      body: JSON.stringify({
        ...getClientIP(request),
        key: process.env.SECRET!,
        type: ENUM_COMMON.LOG.ACCESS,
      }),
    });
    return;
  }
  try {
    await jwtVerify(
      cookies.get("Authorization")?.value!,
      new TextEncoder().encode(process.env.SECRET),
    );
  } catch (error) {
    console.log("@-middleware-error", pathname, error);
    return pathname.includes("/console")
      ? NextResponse.redirect(new URL("/", request.url), { status: 302 })
      : NextResponse.json("Identity exception", { status: 401 });
  }
}

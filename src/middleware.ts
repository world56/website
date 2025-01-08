import { jwtVerify } from "jose";
import { insertLog } from "./app/api";
import { getClientIP } from "@/lib/format";
import { NextResponse } from "next/server";

import { ENUM_COMMON } from "./enum/common";

import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/console/:path*", "/api/auth/:path*", "/lib/welcome"],
};

export async function middleware(request: NextRequest) {
  const { cookies } = request;
  const { pathname } = request.nextUrl;
  if (request.nextUrl.pathname === "/lib/welcome") {
    insertLog({
      ip: getClientIP(request),
      key: process.env.SECRET!,
      type: ENUM_COMMON.LOG.ACCESS,
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

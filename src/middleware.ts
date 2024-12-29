import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/console/:path*", "/api/auth/:path*"],
};

export async function middleware(request: NextRequest) {
  const { url, cookies } = request;
  try {
    await jwtVerify(
      cookies.get("Authorization")?.value!,
      new TextEncoder().encode(process.env.SECRET),
    );
  } catch (error) {
    console.log("@-middleware-error", url, error);
    return url.includes("/console")
      ? NextResponse.redirect(new URL("/", request.url), { status: 302 })
      : NextResponse.json("Identity exception", { status: 401 });
  }
}

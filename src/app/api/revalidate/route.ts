import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import type { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const { path, type, key } = await request.json();
    if (key !== process.env.SECRET) {
      return NextResponse.json(false, { status: 401 });
    }
    path && revalidatePath(path, type);
    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      cache: "no-store",
    });
  } catch (error) {
    return NextResponse.json({
      revalidated: false,
      now: Date.now(),
      cache: "no-store",
    });
  }
}

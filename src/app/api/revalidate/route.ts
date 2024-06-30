import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { path, type } = await request.json();
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

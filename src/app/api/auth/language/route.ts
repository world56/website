import { DBlocal } from "@/lib/db";
import { NextResponse } from "next/server";
import { checkLanguage } from "@/lib/language";

export async function GET() {
  return NextResponse.json(DBlocal.language());
}

export async function PUT(request: Request) {
  const { language } = await request.json();
  if (checkLanguage(language)) {
    DBlocal.set({ language });
    return NextResponse.json(true);
  } else {
    return NextResponse.json(false, { status: 400 });
  }
}

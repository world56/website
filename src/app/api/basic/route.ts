import { DBlocal } from "@/lib/db";
import { headers } from "next/headers";

export async function GET(request: Request) {
  const headersList = headers();
  const referer = headersList.get("referer");
  return new Response("Hello, GET", {
    status: 200,
  });
}

export async function POST(request: Request) {
  const data = await request.json();
  DBlocal.set(data);
  return new Response("123", { status: 200 });
}

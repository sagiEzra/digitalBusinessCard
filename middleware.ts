import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Only rewrite the root URL (/) for mad-kor.co.il
  if (req.headers.get("host") === "mad-kor.co.il" && url.pathname === "/") {
    return NextResponse.rewrite(new URL("/madkor", req.url));
  }

  return NextResponse.next();
}

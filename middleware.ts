import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const host = req.headers.get("host");

    // If the request is from mad-kor.co.il, rewrite it to /madkor
    if (host === "mad-kor.co.il") {
        url.pathname = `/madkor${url.pathname}`;
        return NextResponse.rewrite(url);
    }

    // Allow other domains to proceed normally
    return NextResponse.next();
}

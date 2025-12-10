import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(req: NextRequest, _ev: NextFetchEvent) {
    const token = req.cookies.get("token")?.value;

    if (req.nextUrl.pathname === "/" && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/"],
};

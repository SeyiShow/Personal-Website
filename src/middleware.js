import { NextResponse } from "next/server";
import * as jose from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
        const token = request.cookies.get("admin_token")?.value;

        if (!token) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }

        try {
            const secret = new TextEncoder().encode(JWT_SECRET);
            await jose.jwtVerify(token, secret);
            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};

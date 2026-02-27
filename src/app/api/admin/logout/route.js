import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST() {
    const cookie = serialize("admin_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: -1,
        path: "/",
    });

    return NextResponse.json(
        { message: "Logout successful" },
        {
            status: 200,
            headers: { "Set-Cookie": cookie },
        }
    );
}

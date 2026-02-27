import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

export async function POST(request) {
    try {
        const body = await request.json();
        const { password } = body;

        if (password === ADMIN_PASSWORD) {
            const token = jwt.sign({ authenticated: true }, JWT_SECRET, {
                expiresIn: "1d",
            });

            const cookie = serialize("admin_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24, // 1 day
                path: "/",
            });

            return NextResponse.json(
                { message: "Login successful" },
                {
                    status: 200,
                    headers: { "Set-Cookie": cookie },
                }
            );
        }

        return NextResponse.json(
            { error: "Invalid password" },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

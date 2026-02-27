import { NextResponse } from "next/server";
import { getCollection } from "@/lib/db";

// GET all testimonials
export async function GET() {
    try {
        const collection = await getCollection("testimonials");
        const items = await collection.find({}).sort({ createdAt: -1 }).toArray();

        const serialized = items.map((item) => ({
            ...item,
            _id: item._id.toString(),
        }));

        return NextResponse.json(serialized);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch testimonials" },
            { status: 500 }
        );
    }
}

// POST create a new testimonial
export async function POST(request) {
    try {
        const body = await request.json();
        const { name, role, quote, avatar, rating } = body;

        if (!name || !quote) {
            return NextResponse.json(
                { error: "Name and quote are required" },
                { status: 400 }
            );
        }

        const collection = await getCollection("testimonials");
        const result = await collection.insertOne({
            name,
            role: role || "",
            quote,
            avatar: avatar || "",
            rating: rating || 5,
            createdAt: new Date(),
        });

        return NextResponse.json(
            { _id: result.insertedId.toString(), message: "Testimonial created" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create testimonial" },
            { status: 500 }
        );
    }
}

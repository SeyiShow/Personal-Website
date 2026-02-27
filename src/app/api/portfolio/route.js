import { NextResponse } from "next/server";
import { getCollection } from "@/lib/db";

// GET all portfolio items
export async function GET() {
    try {
        const collection = await getCollection("portfolio");
        const items = await collection.find({}).sort({ order: 1 }).toArray();

        // Convert _id to string for JSON serialization
        const serialized = items.map((item) => ({
            ...item,
            _id: item._id.toString(),
        }));

        return NextResponse.json(serialized);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch portfolio items" },
            { status: 500 }
        );
    }
}

// POST create a new portfolio item
export async function POST(request) {
    try {
        const body = await request.json();
        const { title, description, image, category, link, order } = body;

        if (!title || !image) {
            return NextResponse.json(
                { error: "Title and image are required" },
                { status: 400 }
            );
        }

        const collection = await getCollection("portfolio");
        const result = await collection.insertOne({
            title,
            description: description || "",
            image,
            category: category || "Branding",
            link: link || "#",
            order: order || 0,
            createdAt: new Date(),
        });

        return NextResponse.json(
            { _id: result.insertedId.toString(), message: "Portfolio item created" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create portfolio item" },
            { status: 500 }
        );
    }
}

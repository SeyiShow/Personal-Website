import { NextResponse } from "next/server";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

// GET all partners
export async function GET() {
    try {
        const collection = await getCollection("partners");
        const items = await collection.find({}).sort({ order: 1 }).toArray();

        const serialized = items.map((item) => ({
            ...item,
            _id: item._id.toString(),
        }));

        return NextResponse.json(serialized);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch partners" },
            { status: 500 }
        );
    }
}

// POST create a new partner
export async function POST(request) {
    try {
        const body = await request.json();
        const { name, logo, order } = body;

        if (!name || !logo) {
            return NextResponse.json(
                { error: "Name and logo are required" },
                { status: 400 }
            );
        }

        const collection = await getCollection("partners");
        const result = await collection.insertOne({
            name,
            logo,
            order: order || 0,
            createdAt: new Date(),
        });

        return NextResponse.json(
            { _id: result.insertedId.toString(), message: "Partner created" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create partner" },
            { status: 500 }
        );
    }
}

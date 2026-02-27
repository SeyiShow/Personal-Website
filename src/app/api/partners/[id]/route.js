import { NextResponse } from "next/server";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

// GET single partner
export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const collection = await getCollection("partners");
        const item = await collection.findOne({ _id: new ObjectId(id) });

        if (!item) {
            return NextResponse.json({ error: "Partner not found" }, { status: 404 });
        }

        return NextResponse.json({
            ...item,
            _id: item._id.toString(),
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch partner" }, { status: 500 });
    }
}

// PUT update partner
export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { name, logo, order } = body;

        const collection = await getCollection("partners");
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    name,
                    logo,
                    order: order || 0,
                    updatedAt: new Date(),
                },
            }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: "Partner not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Partner updated" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update partner" }, { status: 500 });
    }
}

// DELETE partner
export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        const collection = await getCollection("partners");
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "Partner not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Partner deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete partner" }, { status: 500 });
    }
}

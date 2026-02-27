import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/db";

// GET a single testimonial
export async function GET(request, { params }) {
    try {
        const { id } = await params;
        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }
        const collection = await getCollection("testimonials");
        const item = await collection.findOne({ _id: new ObjectId(id) });
        if (!item) {
            return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
        }
        return NextResponse.json({ ...item, _id: item._id.toString() });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch item" }, { status: 500 });
    }
}

// PUT update a testimonial
export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const { _id, ...updateData } = body;

        const collection = await getCollection("testimonials");
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { ...updateData, updatedAt: new Date() } }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { error: "Testimonial not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Testimonial updated" });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update testimonial" },
            { status: 500 }
        );
    }
}

// DELETE a testimonial
export async function DELETE(request, { params }) {
    try {
        const { id } = await params;

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const collection = await getCollection("testimonials");
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { error: "Testimonial not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Testimonial deleted" });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete testimonial" },
            { status: 500 }
        );
    }
}

import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDir = join(process.cwd(), "public", "images", "uploads");
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch { }

        const extension = file.name.split(".").pop();
        const filename = `${uuidv4()}.${extension}`;
        const path = join(uploadDir, filename);

        await writeFile(path, buffer);
        const imageUrl = `/images/uploads/${filename}`;

        return NextResponse.json({ imageUrl });
    } catch (error) {
        return NextResponse.json({ error: "Upload failed: " + error.message }, { status: 500 });
    }
}

import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert File -> Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "todo-app" }, (error, uploadResult) => {
          if (error) reject(error);
          else resolve(uploadResult);
        })
        .end(buffer);
    });

    return NextResponse.json(result);
  } catch (error) {
    
    return NextResponse.json({ error }, { status: 500 });
  }
}

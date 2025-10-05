import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const { public_id } = await req.json();

    if (!public_id) {
      return NextResponse.json({ error: "No public_id provided" }, { status: 400 });
    }

    const result = await cloudinary.uploader.destroy(public_id);

    return NextResponse.json(result);
  } catch (error) {
    
    return NextResponse.json({ error }, { status: 500 });
  }
}
  
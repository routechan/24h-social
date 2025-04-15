import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
   
    const postId = parseInt(params.id, 10)

    const post = await prisma.post.findUnique({
      where: { id: postId},
      include: {user:true,likes:true,replies:true}
      });

    
    
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

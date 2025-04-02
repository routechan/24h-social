import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();
export async function GET(req: Request, { params }: { params: { id: string } }) {
    const userId = params.id; 
  try {
  

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        profile: { select: { avatarUrl: true, bio: true } },
        posts: {
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            content:true,
            createdAt: true,
            likes: { select: { id: true } },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
console.log(user)
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

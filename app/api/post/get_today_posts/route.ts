import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma =new PrismaClient();
export async function GET(){
try{
        // 24時間前の日時を取得
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    const posts = await prisma.post.findMany({
        where: {
          createdAt: {
            gte: twentyFourHoursAgo, 
          },
        },
        orderBy: { createdAt: "desc" }, 
        include:{user:true}
      });

      return NextResponse.json(posts,{status:200})
}catch(err){
    console.error("投稿取得エラー:", err);
    return NextResponse.json({ error: "投稿を取得できませんでした" }, { status: 500 });
}
}
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma =new PrismaClient();
export async function GET(){
try{
 

    const posts = await prisma.post.findMany({
       take:50,
        orderBy: { createdAt: "desc" }, 
        select:{
          id:true,
          content:true,
          createdAt:true,
          user:{select:{id:true,name:true,}},
          likes:true,
          replies:{orderBy:{createdAt:"desc"}},}
      });

      return NextResponse.json(posts,{status:200})
}catch(err){
    console.error("投稿取得エラー:", err);
    return NextResponse.json({ error: "投稿を取得できませんでした" }, { status: 500 });
}
}
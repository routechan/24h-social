import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma =new PrismaClient()
export async function GET(req:NextRequest, { params }: { params: { id: string } }){
   


try{
    const postId = parseInt(params.id, 10);
    const replies = await prisma.reply.findMany({
        where:{postId},
        include:{
            user:true,
            
        },
        orderBy:{createdAt:"desc"}
    },

)
if(!replies){
    return NextResponse.json({ error: "User not found" }, { status: 404 });
}
return NextResponse.json(replies, { status: 200 });

}catch{
  return  NextResponse.json({error:"Internal Server Error"})
}
}
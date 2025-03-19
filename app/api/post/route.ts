import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma =new PrismaClient();
export async function POST(req:Request){
    const {message,userId} =await req.json()
    
    try{
const postResponse = await prisma.post.create({
    data:{
      content:message,
      userId
    }
})
return NextResponse.json(postResponse,{status:201})
    }catch(err){
        return NextResponse.json(err,{status:500})
    }
}
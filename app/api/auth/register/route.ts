import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// 新規登録用API
const prisma = new PrismaClient()
export async function POST(req:Request){
    const {name,email,password} = await req.json();
    const hashedPassword = await bcrypt.hash(password,10)
try {
   const user = await prisma.user.create({
        data:{
           name,
           email,
           password:hashedPassword
        }
    })
return NextResponse.json(user,{status:201})
}catch(err){
    return NextResponse.json(err,{status:500})
}
}
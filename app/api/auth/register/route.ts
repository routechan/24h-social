import { PrismaClient } from "@prisma/client/extension";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()
export async function POST(req:Request){
    const {name,email,password} = await req.json();
    // const hashedPassword = await bcrypt(password)

   const user = await prisma.user.create({
        data:{
           name,
           email,
           password
        }
    })
return NextResponse.json(user,{status:201})
}
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req:Request,{params}:{params:{id:string}}){
    try{
        const userId =params?.id
        const follows = await prisma.follow.findMany({
            where:{followingId:userId},
            include: {
                followed:{
                    include:{
                        profile:{
                            select:{
                                bio:true,
                               
                            }
                        }
                    }
                } 
    }
    })
        if(!follows){
            return NextResponse.json({error:"フォローが見つかりませんでした"},{status:404})
        }
        console.log(follows)
        return NextResponse.json(follows,{status:200})
    }catch(err){
        console.error("Server Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req:Request,{params}:{params:{id:string}}){
try{
    const userId =params?.id
    const followers = await prisma.follow.findMany({
        where:{followedId:userId},
        include: {
            following:{
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
    if(!followers){
        return NextResponse.json({error:"フォローが見つかりませんでした"},{status:404})
    }
    return NextResponse.json(followers,{status:200})

}catch(err){
    console.error("Server Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}
}
"use server"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// リプライを追加
export async function addReply(message:string,postId:number,userId:string){
    try{
        const response = await prisma.reply.create({
            data:{
                content:message,
                postId,
                userId
            },
            include: {
                user: true
            }
        }
        )
            return response
        
            }catch(err){
                console.error(err)
                return {error:"リプライに失敗"}
            }
}
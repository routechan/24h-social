"use server"
import { PrismaClient } from "@prisma/client";

// Prisma クライアントのインスタンスを作成
const prisma = new PrismaClient();

// いいねを追加
export async function addLike(userId:string,postId:number) {
  try {
    
    const response = await prisma.like.create({
        data:{
         userId,
         postId
        }
    })
   
    return response
  }catch(err){
   console.error(err)
    return {error:"いいねに失敗"}
  }
}


// いいねを削除
export async function deleteLike(userId:string,postId:number) {
  try {
    const response = await prisma.like.delete({
        where: {
          userId_postId: { 
            userId,
            postId
          }
        }
      })
    return response
  }catch(err){
    console.error(err)
    return {error:"いいね削除に失敗"}
  }
}
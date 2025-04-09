"use server"

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Prisma クライアントのインスタンスを作成
const prisma = new PrismaClient();

//ユーザーをフォロー
export async function followUser(followingId:string,followedId:number) {
    try {
      
      const response = await prisma.follow.create({
          data:{
           followingId,
           followedId
          }
      })
    await revalidatePath(`/user/${followedId}`)
      return response
    }catch(err){
     console.error(err)
      return {error:"フォローに失敗"}
    }
  }

  export async function removeUser(followingId:string,followedId:number) {
    try{
      const response = await prisma.follow.deleteMany({
        where: {
          followingId,
          followedId,
        },
      });
     await revalidatePath(`/user/${followedId}`)
   
return response
    }
    catch(err){
      console.error(err)
      return {error:"フォロー解除に失敗"}
    }
  }

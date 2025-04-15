"use client"
import WritePostButton from "@/app/components/ui/WritePostButton"
import TimelinePostForm from "./TimelinePostForm"
import TimelinePosts from "./TimelinePosts"
import { useState } from "react"

const Timeline = () => {
  const [isWriting,setIsWriting] = useState<boolean>(false);

  // ポストフォームを開く
  const onOpen = () =>{
    setIsWriting(true)
  }

  // ポストフォームを閉じる
  const onClose =()=>{ setIsWriting(false)}
  
  return (
    <div className="max-w-xl h-dvh mx-auto overflow-hidden  md:px-20  ">
        <div className="mt-2 ">
          <div className="flex justify-between items-center px-4">
            <h2 className="text-blue-400 text-3xl font-bold">Postlike</h2> 
          <WritePostButton onOpen={onOpen}/>
          </div>
        <TimelinePostForm isWriting={isWriting} onClose={onClose}/>
            <TimelinePosts/>
            </div>
    </div>
   
  )
}

export default Timeline
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const Comment = ({comment}) => {
    console.log(comment)
  return (
    <motion.div
                  key={comment.id}
                  initial={{ scale: 0.8, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 25
                  }}
                  className="flex flex-col gap-3"
                >
                    <div className="flex items-center gap-4">
                        <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                    <span className="font-medium">ユーザーネーム</span>
                    </div>
                  <div className="flex-1 bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                    
                      <span className="text-xs text-gray-500">5分前</span>
                    </div>
                    <p className="mt-1 text-gray-700">{comment.content}</p>
                  </div>
                </motion.div>
  )
}

export default Comment